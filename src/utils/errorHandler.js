// src/utils/errorHandler.js

// Sistema abrangente de tratamento de erros

// Middleware de erro

const errorMiddleware = (err, req, res, next) => {
  console.error('Erro: ', err); // Log do erro detalhado
  res.status(err.status || 500);
  res.json({
    message: err.message || 'Ocorreu um erro inesperado',
    error: err,
  });
};

// Função para tentar executar uma operação com tratamento de erro
const tryCatch = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Exemplo de uso de middleware e função tryCatch
const app = require('express')();

// Rota de exemplo
app.get(
  '/example',
  tryCatch(async (req, res) => {
    // Código que pode causar erro
    const result = await someAsyncFunction();
    res.json(result);
  }),
);

// Middleware de tratamento de erros
app.use(errorMiddleware);

// Recuperação automática
process.on('uncaughtException', (err) => {
  console.error('Erro não capturado: ', err);
  // Implementar recuperação automática
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Rejeição não tratada: ', reason);
  // Implementar recuperação automática
});

module.exports = { errorMiddleware, tryCatch };
