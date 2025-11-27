import { commandSaldo, commandTransferir, commandDiario } from './economy.js';
import { commandXP, commandRanking, commandRankingBalance } from './xp.js';
import { commandPiada, commandDado, commandMoeda } from './fun.js';
import { commandInfo, commandAjuda } from './info.js';
import { db } from '../config/database.js';
import { getCommandFromText } from '../utils/helpers.js';

const commands = {
  saldo: commandSaldo,
  transferir: commandTransferir,
  diario: commandDiario,
  xp: commandXP,
  ranking: commandRanking,
  'top-ricos': commandRankingBalance,
  piada: commandPiada,
  dado: commandDado,
  moeda: commandMoeda,
  info: commandInfo,
  ajuda: commandAjuda,
  ping: async (sock, message) => {
    await sock.sendMessage(message.key.remoteJid, { text: '🏓 Pong!' });
  },
};

export async function handleCommand(sock, message) {
  const messageText =
    message.message?.conversation ||
    message.message?.extendedTextMessage?.text ||
    '';
  const remoteJid = message.key.remoteJid;
  const userId = message.key.participant || remoteJid;

  const cmd = getCommandFromText(messageText);
  if (!cmd) return false;

  db.addXP(userId, 5);

  const handler = commands[cmd.command];
  if (handler) {
    try {
      await handler(sock, message, cmd.args);
      return true;
    } catch (error) {
      console.error(`Erro ao executar comando ${cmd.command}:`, error);
      await sock.sendMessage(remoteJid, { text: '❌ Erro!' });
      return true;
    }
  }

  return false;
}
