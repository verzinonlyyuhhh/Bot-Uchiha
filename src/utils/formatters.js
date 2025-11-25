// 🔱 Uchiha Formatters - Utilitários de formatação

export const formatters = {
  formatCurrency(amount) {
    return `💰 ${amount.toLocaleString('pt-BR')}`;
  },

  formatXP(xp) {
    return `📈 ${xp.toLocaleString('pt-BR')} XP`;
  },

  formatDate(date) {
    return new Date(date).toLocaleString('pt-BR');
  },

  formatUserMention(userId) {
    return `@${userId.split('@')[0]}`;
  },

  formatCommand(cmd) {
    return cmd.toLowerCase().trim().replace(/^!/, '');
  },
};

export default formatters;