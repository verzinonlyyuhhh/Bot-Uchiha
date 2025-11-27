// 🔱 Uchiha Message Handler - Gerenciamento de mensagens centralizado

import { handleCommand } from '../commands/index.js';
import { handleSimpleResponse } from './simpleResponseHandler.js';
import { db } from '../config/database.js';
import { UchihaLogger } from '../utils/logger.js';

export async function setupMessageHandler(sock) {
  sock.ev.on('messages.upsert', async ({ messages }) => {
    if (!messages || !messages.length) return;

    const m = messages[0];
    if (!m.key) return;

    // Ignora status e mensagens do próprio bot
    if (m.key.remoteJid === 'status@broadcast' || m.key.fromMe) return;

    // Extrai dados da mensagem
    const messageText =
      m.message?.conversation || m.message?.extendedTextMessage?.text || '';
    const remoteJid = m.key.remoteJid;
    const userId = m.key.participant || remoteJid;

    // Garante que o usuário existe no banco de dados
    db.getOrCreateUser(userId);

    UchihaLogger.log(
      `📨 [${new Date().toLocaleTimeString('pt-BR')}] Mensagem: ${messageText}`,
    );

    // Trata comandos
    const commandHandled = await handleCommand(sock, m);
    if (commandHandled) return;

    // Trata respostas simples
    const simpleResponseHandled = await handleSimpleResponse(
      sock,
      remoteJid,
      messageText,
    );
    if (simpleResponseHandled) return;
  });
}

export default { setupMessageHandler };
