export const jokes = [
  '😂 Por que o livro de matemática se suicidou? Porque tinha muitos problemas!',
  '😂 O que um arquivo faz na praia? Ele tira um print!',
  '😂 Como se chama um boomerang que não volta? Uma varinha!',
  '😂 Por que o JavaScript foi à terapia? Porque tinha muitos callbacks!',
  '😂 O que o Python disse ao Java? "Você é muito verboso!"',
  '😂 Por que o desenvolvedor foi preso? Porque cometeu um crime em Python!',
  '😂 Como você chama um código que não funciona? Uma feature!',
  '😂 Qual é o animal favorito dos programadores? O Python!',
];

export function getRandomJoke() {
  return jokes[Math.floor(Math.random() * jokes.length)];
}
