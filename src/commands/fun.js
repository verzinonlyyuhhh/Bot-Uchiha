export async function commandPiada(sock, message) {
  const remoteJid = message.key.remoteJid;
  const piadas = ['😂 Piada 1!', '😂 Piada 2!', '😂 Piada 3!'];
  await sock.sendMessage(remoteJid, {
    text: piadas[Math.floor(Math.random() * piadas.length)],
  });
}

export async function commandDado(sock, message) {
  const remoteJid = message.key.remoteJid;
  const resultado = Math.floor(Math.random() * 6) + 1;
  await sock.sendMessage(remoteJid, { text: `🎲 ${resultado}` });
}

export async function commandMoeda(sock, message) {
  const remoteJid = message.key.remoteJid;
  const resultado = Math.random() > 0.5 ? 'Cara' : 'Coroa';
  await sock.sendMessage(remoteJid, { text: `🪙 ${resultado}` });
}
