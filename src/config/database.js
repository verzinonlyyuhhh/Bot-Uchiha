// Simulação de banco de dados em memória (você pode integrar MongoDB/Firebase depois)
class Database {
    constructor() {
        this.users = new Map();
        this.loadDefaults();
    }

    loadDefaults() {
        // Dados de exemplo
    }

    // USUÁRIOS
    getOrCreateUser(userId) {
        if (!this.users.has(userId)) {
            this.users.set(userId, {
                id: userId,
                name: 'Usuário',
                balance: 1000,
                xp: 0,
                level: 1,
                lastMessage: Date.now(),
                joinedAt: Date.now()
            });
        }
        return this.users.get(userId);
    }

    getUser(userId) {
        return this.users.get(userId);
    }

    updateUser(userId, data) {
        const user = this.getOrCreateUser(userId);
        Object.assign(user, data);
        this.users.set(userId, user);
        return user;
    }

    // ECONOMIA
    getBalance(userId) {
        const user = this.getOrCreateUser(userId);
        return user.balance;
    }

    addBalance(userId, amount) {
        const user = this.getOrCreateUser(userId);
        user.balance += amount;
        this.users.set(userId, user);
        return user.balance;
    }

    removeBalance(userId, amount) {
        const user = this.getOrCreateUser(userId);
        if (user.balance < amount) return false;
        user.balance -= amount;
        this.users.set(userId, user);
        return true;
    }

    // XP E NÍVEIS
    getXP(userId) {
        const user = this.getOrCreateUser(userId);
        return { xp: user.xp, level: user.level };
    }

    addXP(userId, amount) {
        const user = this.getOrCreateUser(userId);
        user.xp += amount;
        const xpParaNivelProximo = user.level * 100;
        if (user.xp >= xpParaNivelProximo) {
            user.level += 1;
            user.xp = 0;
        }
        this.users.set(userId, user);
        return { xp: user.xp, level: user.level, leveledUp: user.xp === 0 };
    }

    // RANKING
    getTopUsers(limit = 10) {
        return Array.from(this.users.values())
            .sort((a, b) => b.xp - a.xp || b.level - a.level)
            .slice(0, limit);
    }

    getTopBalance(limit = 10) {
        return Array.from(this.users.values())
            .sort((a, b) => b.balance - a.balance)
            .slice(0, limit);
    }
}

export const db = new Database();
