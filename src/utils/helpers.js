const PREFIX = '!';

export function getCommandFromText(text) {
  if (!text.startsWith(PREFIX)) return null;
  const parts = text.slice(PREFIX.length).split(' ');
  return {
    command: parts[0].toLowerCase(),
    args: parts.slice(1),
  };
}

export function formatBalance(amount) {
  return `💰 ${amount.toLocaleString('pt-BR')}`;
}

export function formatXP(xp, level) {
  return `📈 XP: ${xp} | 📊 Nível: ${level}`;
}
