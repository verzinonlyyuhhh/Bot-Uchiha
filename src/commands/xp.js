import { db } from '../config/database.js';

export async function commandXP(sock, message) {
  const userId = message.key.participant || message.key.remoteJid;
  const remoteJid = message.key.remoteJid;
  const { xp, level } = db.getXP(userId);
  await sock.sendMessage(remoteJid, {
    text: `📈 Nível: ${level}\n⭐ XP: ${xp}`,
  });
}

export async function commandRanking(sock, message) {
  const remoteJid = message.key.remoteJid;
  const topUsers = db.getTopUsers(10);
  let response = '🏆 TOP XP:\n\n';
  topUsers.forEach((user, i) => {
    response += `${i + 1}. Nível ${user.level}\n`;
  });
  await sock.sendMessage(remoteJid, { text: response });
}

export async function commandRankingBalance(sock, message) {
  const remoteJid = message.key.remoteJid;
  const topRich = db.getTopBalance(10);
  let response = '💰 TOP RICOS:\n\n';
  topRich.forEach((user, i) => {
    response += `${i + 1}. ${user.balance} moedas\n`;
  });
  await sock.sendMessage(remoteJid, { text: response });
}
