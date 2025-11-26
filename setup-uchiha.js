const fs = require('fs');
const path = require('path');

// Uchiha Theme Configuration
const UCHIHA_THEME = {
    primaryColor: '#DC143C',
    secondaryColor: '#000000',
    accentColor: '#FFD700',
    botName: '🔴 Uchiha Bot 🔴',
    prefix: '!'
};

// Command Categories Mapping
const COMMAND_CATEGORIES = {
    fun: {
        folder: 'commands/fun',
        keywords: ['piada', 'meme', 'desafio', 'adivinhe', 'historia', 'curiosidade', 'forca', 'trivia', 'enquete', '8ball', 'cara', 'coroa', 'roletarussa', 'minigame', 'desafiar'],
        description: '🎮 Comandos de Diversão'
    },
    games: {
        folder: 'commands/games',
        keywords: ['game', 'quiz', 'rolardado', 'moeda', 'sorteio', 'roletarussa', 'forca', 'truth', 'minigame'],
        description: '🎲 Comandos de Jogos'
    },
    utility: {
        folder: 'commands/utility',
        keywords: ['clima', 'tempo', 'traduza', 'traduci', 'ocr', 'calcular', 'cifra', 'gpt', 'resumir', 'tts', 'download', 'youtube', 'ytmp3', 'letra', 'gpt'],
        description: '🛠️ Comandos Utilitários'
    },
    moderation: {
        folder: 'commands/moderation',
        keywords: ['kick', 'mute', 'unmute', 'promover', 'rebaixar', 'ban', 'warn', 'filtro', 'lembrete', 'anunciar'],
        description: '🛡️ Comandos de Moderação'
    },
    economy: {
        folder: 'commands/economy',
        keywords: ['moeda', 'coin', 'deposit', 'sacar', 'saldo', 'loja', 'shop', 'premium', 'vip', 'xp', 'rank', 'contador'],
        description: '💰 Comandos de Economia'
    },
    information: {
        folder: 'commands/information',
        keywords: ['info', 'dados', 'user', 'profile', 'status', 'ping', 'stats', 'rank', 'xp'],
        description: 'ℹ️ Comandos de Informação'
    },
    media: {
        folder: 'commands/media',
        keywords: ['sticker', 'gif', 'avatar', 'download', 'imagem', 'foto', 'video', 'media'],
        description: '🖼️ Comandos de Mídia'
    },
    admin: {
        folder: 'commands/admin',
        keywords: ['clear', 'limpar', 'anunciar', 'config', 'dono', 'owner'],
        description: '⚙️ Comandos Admin'
    },
    anti: {
        folder: 'commands/anti',
        keywords: ['anti', 'spam', 'flood', 'link', 'fake', 'bot', 'porn', 'offensive', 'audio', 'cheat', 'trava'],
        description: '🚫 Sistemas Anti-Abuso'
    }
};

// Duplicate Files to Remove
const DUPLICATES_TO_REMOVE = [
    // 8ball duplicates
    '8ball2.js',
    // abracar duplicates
    'abracar-geral.js',
    'abracar2.js',
    // anticheat duplicates
    'anticheat.js (2)',
    'anti-cheat.js',
    // antiflood duplicates
    'antiflood (1).js',
    'anti-trava.js',
    // avatar duplicates
    'avatar2.js',
    // cara-coroa duplicates
    'cara-coroa2.js',
    // clima duplicates
    'clima2.js',
    // desafiar duplicates
    'desafiar2.js',
    // fact duplicates
    'fact2.js',
    // piadas duplicates
    'piadas2.js',
    'piadaimagens',
    // sticker duplicates
    'stickerGif',
    'stickergif (1)',
    'sticker-animado.js',
    // truth duplicates
    'truth2.js',
    // welcome duplicates
    'welcome (1).js',
    // Link duplicates
    'link-gp2.js',
    // Economy duplicates
    'moedabot.js',
    // Utility duplicates
    'calcular.js', // has duplicate functions
    'citacao.js', // duplicate of conselhos.js
    // Auto-responder variations
    'repetir-msgs.js',
    'auto-responder.js'
];

class UchihaBot {
    constructor() {
        this.rootDir = __dirname;
        this.report = {
            organized: [],
            removed: [],
            failed: [],
            summary: {}
        };
    }

    /**
     * Initialize folder structure
     */
    initializeFolders() {
        console.log('🔴 Inicializando estrutura de pastas Uchiha Bot...\n');
        
        Object.values(COMMAND_CATEGORIES).forEach(category => {
            const folderPath = path.join(this.rootDir, category.folder);
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
                console.log(`✅ Pasta criada: ${category.folder}`);
            }
        });

        // Create utils folder
        const utilsPath = path.join(this.rootDir, 'utils');
        if (!fs.existsSync(utilsPath)) {
            fs.mkdirSync(utilsPath, { recursive: true });
            console.log(`✅ Pasta criada: utils`);
        }

        console.log('\n');
    }

    /**
     * Remove duplicate files
     */
    removeDuplicates() {
        console.log('🗑️ Removendo arquivos duplicados...\n');
        
        DUPLICATES_TO_REMOVE.forEach(file => {
            const filePath = path.join(this.rootDir, file);
            if (fs.existsSync(filePath)) {
                try {
                    fs.unlinkSync(filePath);
                    this.report.removed.push(file);
                    console.log(`❌ Removido: ${file}`);
                } catch (error) {
                    this.report.failed.push({ file, error: error.message });
                    console.log(`⚠️ Erro ao remover ${file}: ${error.message}`);
                }
            }
        });

        console.log('\n');
    }

    /**
     * Categorize and organize commands
     */
    organizeCommands() {
        console.log('📁 Organizando comandos por categorias...\n');

        const files = fs.readdirSync(this.rootDir)
            .filter(file => file.endsWith('.js') && !file.includes('organize') && !file.includes('setup'));

        files.forEach(file => {
            const fileName = path.basename(file, '.js').toLowerCase();
            
            for (const [categoryKey, category] of Object.entries(COMMAND_CATEGORIES)) {
                const keywords = category.keywords;
                
                if (keywords.some(keyword => fileName.includes(keyword))) {
                    const destFolder = path.join(this.rootDir, category.folder);
                    const destPath = path.join(destFolder, file);
                    const sourcePath = path.join(this.rootDir, file);

                    try {
                        if (!fs.existsSync(destPath)) {
                            fs.renameSync(sourcePath, destPath);
                            this.report.organized.push({
                                file: file,
                                category: categoryKey,
                                folder: category.folder
                            });
                            console.log(`✅ ${file} → ${category.folder}`);
                        }
                    } catch (error) {
                        this.report.failed.push({ file, error: error.message });
                        console.log(`⚠️ Erro ao mover ${file}: ${error.message}`);
                    }

                    return;
                }
            }
        });

        console.log('\n');
    }

    /**
     * Apply Uchiha theme to commands
     */
    applyTheme() {
        console.log('🔴 Aplicando tema Uchiha aos comandos...\n');

        const themeHeader = `
/**
 * 🔴 ${UCHIHA_THEME.botName} 🔴
 * Tema: Uchiha
 * Desenvolvido com ❤️
 * 
 * Comandos organizados e otimizados para melhor experiência
 */
`;

        const applyThemeToFile = (filePath) => {
            try {
                let content = fs.readFileSync(filePath, 'utf8');
                
                // Remove old headers if they exist
                content = content.replace(/^\/\*\*[\s\S]*?\*\/\n?/, '');
                
                // Add new header
                content = themeHeader + '\n' + content;
                
                fs.writeFileSync(filePath, content, 'utf8');
                return true;
            } catch (error) {
                return false;
            }
        };

        // Apply theme to all organized files
        Object.values(COMMAND_CATEGORIES).forEach(category => {
            const folderPath = path.join(this.rootDir, category.folder);
            
            if (fs.existsSync(folderPath)) {
                const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.js'));
                
                files.forEach(file => {
                    const filePath = path.join(folderPath, file);
                    if (applyThemeToFile(filePath)) {
                        console.log(`🎨 Tema aplicado: ${file}`);
                    }
                });
            }
        });

        console.log('\n');
    }

    /**
     * Generate organization report
     */
    generateReport() {
        console.log('📊 Gerando relatório...\n');

        this.report.summary = {
            totalOrganizados: this.report.organized.length,
            totalRemovidos: this.report.removed.length,
            totalErros: this.report.failed.length,
            categorias: {}
        };

        // Count by category
        this.report.organized.forEach(cmd => {
            if (!this.report.summary.categorias[cmd.category]) {
                this.report.summary.categorias[cmd.category] = 0;
            }
            this.report.summary.categorias[cmd.category]++;
        });

        // Create report file
        const reportPath = path.join(this.rootDir, 'ORGANIZATION_REPORT.json');
        fs.writeFileSync(reportPath, JSON.stringify(this.report, null, 2), 'utf8');

        console.log(`✅ Relatório salvo em: ORGANIZATION_REPORT.json`);
        console.log(`\n📈 RESUMO:`);
        console.log(`   ✅ Comandos Organizados: ${this.report.summary.totalOrganizados}`);
        console.log(`   ❌ Arquivos Removidos: ${this.report.summary.totalRemovidos}`);
        console.log(`   ⚠️ Erros: ${this.report.summary.totalErros}`);
        console.log(`\n📂 Por Categoria:`);
        
        Object.entries(this.report.summary.categorias).forEach(([cat, count]) => {
            const category = COMMAND_CATEGORIES[cat];
            console.log(`   ${category.description}: ${count} comandos`);
        });
    }

    /**
     * Run complete organization
     */
    run() {
        console.log('\n╔════════════════════════════════════════╗');
        console.log('║  🔴 UCHIHA BOT - ORGANIZATION SYSTEM 🔴║');
        console.log('╚════════════════════════════════════════╝\n');

        this.initializeFolders();
        this.removeDuplicates();
        this.organizeCommands();
        this.applyTheme();
        this.generateReport();

        console.log('\n╔════════════════════════════════════════╗');
        console.log('║  ✅ ORGANIZAÇÃO CONCLUÍDA COM SUCESSO! ║');
        console.log('╚════════════════════════════════════════╝\n');
    }
}

// Run the organization
if (require.main === module) {
    const bot = new UchihaBot();
    bot.run();
}

module.exports = UchihaBot;