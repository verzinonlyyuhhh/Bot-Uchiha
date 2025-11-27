# 🚀 Guia de Implantação - Bot Uchiha

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Docker (opcional)
- Conta em um serviço de hosting

## 🐳 Deploy com Docker

### Localmente

```bash
docker-compose up -d
```

### Heroku

```bash
heroku create seu-bot-uchiha
git push heroku main
```

## 🚂 Railway

1. Conecte seu repositório GitHub
2. Railway detectará automaticamente a aplicação Node.js
3. Configure variáveis de ambiente necessárias
4. Deploy automático ativado!

## 🎨 Render

1. Vá para [render.com](https://render.com)
2. Clique em "New +"
3. Selecione "Web Service"
4. Conecte seu GitHub
5. Configure:
   - Build Command: `npm install`
   - Start Command: `node index.js`

## 📦 Package.json (scripts necessários)

Adicione ao seu package.json:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "lint": "eslint ."
  }
}
```

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env`:

```
WHATSAPP_API_KEY=sua_chave_aqui
NODE_ENV=production
```

## ✅ Checklist de Deploy

- [ ] Variáveis de ambiente configuradas
- [ ] Testes passando
- [ ] Dockerfile testado localmente
- [ ] GitHub Actions configurado
- [ ] Serviço de hosting escolhido e configurado
