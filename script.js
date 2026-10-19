// ==========================================
// 1. LISTA DE NOMES E FUNÇÃO ALEATÓRIA
// ==========================================
const nomes = ["Fernanda", "Giuliana", "Maria Eduarda", "Marcelo", "Amanda", "Gustavo", "Gabriel"];

function aleatorio(lista) { 
    const posicao = Math.floor(Math.random() * lista.length);
    return lista[posicao];
}

const nome = aleatorio(nomes);

// ==========================================
// 2. ARRAY DE PERGUNTAS E AFIRMAÇÕES
// ==========================================
const perguntas = [
    {
        enunciado: "Você decidiu entrar no mundo dos games. Qual atividade mais desperta sua curiosidade?",
        alternativas: [
            {
                texto: "Criar códigos e fazer sistemas do jogo funcionarem.",
                afirmacao: [
                    "Você demonstra interesse por programação e pela parte técnica do desenvolvimento de jogos.",
                    "Sua afinidade com lógica atrai você para a arquitetura de software e mecânicas complexas."
                ]
            },
            {
                texto: "Criar personagens, cenários e visuais incríveis.",
                afirmacao: [
                    "Você tem um forte interesse por arte e design de jogos.",
                    "Sua criatividade se destaca no desenvolvimento do estilo visual e na composição do universo."
                ]
            }
        ]
    },
    {
        enunciado: "Imagine que você está criando seu próprio jogo. Qual seria sua maior preocupação?",
        alternativas: [
            {
                texto: "Fazer o jogo divertido, equilibrado e cheio de boas mecânicas.",
                afirmacao: [
                    "Você possui características de um Game Designer, preocupado com a experiência e as mecânicas do jogador.",
                    "Seu foco é garantir que as regras e o ritmo de jogo proporcionem o máximo de engajamento."
                ]
            },
            {
                texto: "Criar uma história emocionante, com personagens marcantes.",
                afirmacao: [
                    "Você demonstra talento para narrativa e criação de histórias dentro dos jogos.",
                    "Sua atenção está voltada para a construção de diálogos, arcos dramáticos e imersão narrativa."
                ]
            }
        ]
    },
    {
        enunciado: "Seu jogo está quase pronto, mas existem vários problemas para resolver. O que você faria?",
        alternativas: [
            {
                texto: "Testaria o jogo várias vezes para encontrar e corrigir os bugs.",
                afirmacao: [
                    "Você demonstra atenção aos detalhes e interesse por testes e qualidade de software.",
                    "Seu senso crítico busca garantir uma experiência sólida e livre de falhas para o jogador."
                ]
            },
            {
                texto: "Organizaria a equipe para definir prioridades e garantir que o projeto seja concluído.",
                afirmacao: [
                    "Você demonstra habilidades de liderança e organização, características importantes na produção de jogos.",
                    "Sua capacidade de gestão ajuda a manter os prazos alinhados e o time focado no objetivo final."
                ]
            }
        ]
    },
    {
        enunciado: "Uma grande empresa de games te oferece uma oportunidade. Qual projeto você escolheria?",
        alternativas: [
            {
                texto: "Desenvolver a inteligência artificial dos inimigos e os sistemas de combate.",
                afirmacao: [
                    "Seu perfil combina com programação e desenvolvimento de sistemas complexos para jogos.",
                    "Você se motiva ao criar desafios inteligentes e comportamentos dinâmicos para o gameplay."
                ]
            },
            {
                texto: "Criar a identidade visual, os personagens e os ambientes do jogo.",
                afirmacao: [
                    "Seu perfil combina com arte, modelagem e direção visual para jogos.",
                    "Você tem facilidade em dar vida a novos mundos através de texturas, modelagens e iluminação."
                ]
            }
        ]
    },
    {
        enunciado: "Depois de alguns anos trabalhando na indústria, qual seria seu maior objetivo?",
        alternativas: [
            {
                texto: "Criar meu próprio estúdio e desenvolver um jogo que tenha minha identidade.",
                afirmacao: [
                    "Você possui espírito empreendedor e parece ter perfil para liderar seu próprio estúdio de desenvolvimento.",
                    "Sua visão autoral e independência guiam seus passos na busca por inovação no mercado."
                ]
            },
            {
                texto: "Participar de grandes projetos e ajudar a criar experiências inesquecíveis para os jogadores.",
                afirmacao: [
                    "Você valoriza o trabalho em equipe e parece ter perfil para atuar em grandes produções da indústria.",
                    "Seu entusiasmo está em colaborar com equipes multidisciplinares em títulos de grande alcance."
                ]
            }
        ]
    }
];

// ==========================================
// 3. SELEÇÃO DE ELEMENTOS DO DOM E VARIÁVEIS
// ==========================================
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const textoResultado = document.querySelector(".texto-resultado");
const barraProgresso = document.querySelector(".barra-progresso-preenchimento");

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

// ==========================================
// 4. FUNÇÕES DE CONTROLE DO QUIZ
// ==========================================
function atualizaBarraProgresso() {
    const porcentagem = (atual / perguntas.length) * 100;
    if (barraProgresso) {
        barraProgresso.style.width = `${porcentagem}%`;
    }
}

function mostraPergunta() {
    atualizaBarraProgresso();

    if (atual >= perguntas.length) {
        exibeResultado();
        return;
    }

    perguntaAtual = perguntas[atual];

    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";

    caixaPerguntas.classList.remove("animar-entrada");
    caixaAlternativas.classList.remove("animar-entrada");

    void caixaPerguntas.offsetWidth; // Força o reflow para reiniciar a animação

    caixaPerguntas.classList.add("animar-entrada");
    caixaAlternativas.classList.add("animar-entrada");

    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativa = document.createElement("button");
        botaoAlternativa.textContent = alternativa.texto;

        botaoAlternativa.addEventListener("click", () => {
            respostaSelecionada(alternativa);
        });

        caixaAlternativas.appendChild(botaoAlternativa);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacao = aleatorio(opcaoSelecionada.afirmacao);
    historiaFinal += afirmacao + " ";
    atual++;
    mostraPergunta();
}

function exibeResultado() {
    if (barraProgresso) {
        barraProgresso.style.width = "100%";
    }

    caixaPerguntas.textContent = `Sua história (${nome}):`;
    caixaAlternativas.textContent = "";
    textoResultado.textContent = historiaFinal;

    caixaPerguntas.classList.remove("animar-entrada");
    textoResultado.classList.remove("animar-entrada");

    void caixaPerguntas.offsetWidth;

    caixaPerguntas.classList.add("animar-entrada");
    textoResultado.classList.add("animar-entrada");

    const botaoReiniciar = document.createElement("button");
    botaoReiniciar.textContent = "Jogar Novamente";
    botaoReiniciar.addEventListener("click", reiniciarQuiz);

    caixaAlternativas.appendChild(botaoReiniciar);
}

function reiniciarQuiz() {
    atual = 0;
    historiaFinal = "";
    textoResultado.textContent = "";
    mostraPergunta();
}

function substituiNome() {
    for (const pergunta of perguntas) {
        pergunta.enunciado = pergunta.enunciado.replace(/você/g, nome);
    }
}

// ==========================================
// 5. INICIALIZAÇÃO
// ==========================================
substituiNome();
mostraPergunta();