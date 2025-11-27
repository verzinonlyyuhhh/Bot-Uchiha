import { db } from '../config/database.js';

export async function commandSaldo(sock, message) {
  const userId = message.key.participant || message.key.remoteJid;
  const remoteJid = message.key.remoteJid;
  const balance = db.getBalance(userId);
  const response = `💰 Seu saldo: ${balance}`;
  await sock.sendMessage(remoteJid, { text: response });
}

export async function commandTransferir(sock, message, args) {
  const userId = message.key.participant || message.key.remoteJid;
  const remoteJid = message.key.remoteJid;
  if (args.length < 2) {
    await sock.sendMessage(remoteJid, { text: '❌ Use: !transferir valor' });
    return;
  }
  const amount = parseInt(args[0]);
  const success = db.removeBalance(userId, amount);
  if (success) {
    db.addBalance(args[1], amount);
    await sock.sendMessage(remoteJid, { text: `✅ ${amount} transferidos!` });
  } else {
    await sock.sendMessage(remoteJid, { text: '❌ Saldo insuficiente!' });
  }
}

export async function commandDiario(sock, message) {
  const userId = message.key.participant || message.key.remoteJid;
  const remoteJid = message.key.remoteJid;
  db.addBalance(userId, 500);
  await sock.sendMessage(remoteJid, { text: '✅ 500 moedas recebidas!' });
}
