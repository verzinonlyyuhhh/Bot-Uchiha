export async function commandInfo(sock, message) {
  const remoteJid = message.key.remoteJid;
  await sock.sendMessage(remoteJid, {
    text: '🤖 Bot Uchiha v1.0\nDev: Rúben Silver',
  });
}

export async function commandAjuda(sock, message) {
  const remoteJid = message.key.remoteJid;
  const response = `📖 COMANDOS:\n!saldo\n!xp\n!piada\n!dado\n!moeda\n!info\n!ajuda`;
  await sock.sendMessage(remoteJid, { text: response });
}
