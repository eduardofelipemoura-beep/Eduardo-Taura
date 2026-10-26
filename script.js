// ==========================================
// 1. DADOS (Nomes e Perguntas)
// ==========================================
const nomes = ["Jessica", "Nayara", "Eduarda", "Luciano", "Maria", "Davi", "André"];

function aleatorio(lista) { 
    const posicao = Math.floor(Math.random() * lista.length);
    return lista[posicao];
}

const nome = aleatorio(nomes);
const perguntas = [
    {
        enunciado: "Você recebeu seu primeiro projeto de jogo. Por onde prefere começar o desenvolvimento?",
        alternativas: [
            {
                texto: "Programando a física do personagem e a movimentação pela fase.",
                afirmacao: [
                    "Você prefere construir a base funcional e garantir que os controles respondam com precisão.",
                    "Sua abordagem lógica prioriza a estabilidade técnica antes de pensar na aparência."
                ]
            },
            {
                texto: "Desenhando os rascunhos da interface e definindo a paleta de cores do mundo.",
                afirmacao: [
                    "Você foca na imersão estética para estabelecer o clima visual do projeto desde o início.",
                    "Sua sensibilidade artística ajuda a transformar ideias brutas em conceitos visuais atraentes."
                ]
            }
        ]
    },
    {
        enunciado: "Seu jogo precisa de um diferencial para se destacar nas lojas virtuais. Qual recurso você adiciona?",
        alternativas: [
            {
                texto: "Um sistema inovador de combate baseado em física e combinações de habilidades.",
                afirmacao: [
                    "Você busca inovar nas dinâmicas de jogo para desafiar o raciocínio dos jogadores.",
                    "Seu foco está em criar sistemas de mecânicas profundas e altamente rejogáveis."
                ]
            },
            {
                texto: "Uma trilha sonora marcante e diálogos interativos que mudam conforme as escolhas.",
                afirmacao: [
                    "Você aposta no impacto emocional e na conexão narrativa para prender a atenção do público.",
                    "Sua visão prioriza a experiência atmosférica e a construção de personagens inesquecíveis."
                ]
            }
        ]
    },
    {
        enunciado: "Durante um teste com jogadores, muitos reclamaram que uma fase está difícil demais. O que você faz?",
        alternativas: [
            {
                texto: "Ajusto as variáveis de dano e velocidade via código até encontrar a curva ideal.",
                afirmacao: [
                    "Você resolve problemas de balanceamento usando dados práticos e ajustes técnicos precisos.",
                    "Sua capacidade analítica permite recalibrar a experiência sem perder o desafio original."
                ]
            },
            {
                texto: "Reorganizo o mapa e coloco pistas visuais sutis para guiar o jogador intuitivamente.",
                afirmacao: [
                    "Você prefere resolver gargalos de jogabilidade através da arquitetura e do design de ambiente.",
                    "Seu olhar atento à usabilidade torna a jornada fluida sem a necessidade de tutoriais pesados."
                ]
            }
        ]
    },
    {
        enunciado: "Em uma feira de tecnologia, você precisa apresentar uma demonstração do seu jogo em 5 minutos. No que foca?",
        alternativas: [
            {
                texto: "Exibir o desempenho do motor gráfico rodando liso a 60 FPS com efeitos de iluminação.",
                afirmacao: [
                    "Você se orgulha da otimização técnica e da performance limpa do seu software.",
                    "Sua busca por excelência garante que o projeto rode de forma estável em diversas plataformas."
                ]
            },
            {
                texto: "Mostrar o estilo de arte único e um momento marcante da história.",
                afirmacao: [
                    "Você entende o valor de uma apresentação forte para encantar o público de imediato.",
                    "Sua habilidade em sintetizar a identidade do jogo chama a atenção de investidores e jogadores."
                ]
            }
        ]
    },
    {
        enunciado: "Pensando no futuro do seu projeto, como você planeja a evolução dele após o lançamento?",
        alternativas: [
            {
                texto: "Criando ferramentas e suporte para a comunidade criar mods e novas fases.",
                afirmacao: [
                    "Você valoriza a descentralização e quer dar poder à comunidade para expandir o jogo.",
                    "Sua visão de arquitetura aberta garante vida longa e constante renovação ao projeto."
                ]
            },
            {
                texto: "Lançando expansões de história e novos capítulos com eventos sazonais.",
                afirmacao: [
                    "Você prioriza a manutenção da narrativa e o engajamento contínuo do público.",
                    "Seu planejamento foca em manter o interesse dos jogadores vivo por meio de novidades frequentes."
                ]
            }
        ]
    }
];

// ==========================================
// 2. LÓGICA DO QUIZ
// ==========================================
let atual = 0;
let perguntaAtual;
let historiaFinal = "";

document.addEventListener("DOMContentLoaded", () => {
    const telaInicial = document.querySelector(".tela-inicial");
    const iniciarBtn = document.querySelector(".iniciar-btn");
    const barraProgressoContainer = document.querySelector(".barra-progresso-container");
    const barraProgresso = document.querySelector(".barra-progresso-preenchimento");
    const caixaPerguntas = document.querySelector(".caixa-perguntas");
    const caixaAlternativas = document.querySelector(".caixa-alternativas");
    const caixaResultado = document.querySelector(".caixa-resultado");
    const textoResultado = document.querySelector(".texto-resultado");
    const novamenteBtn = document.querySelector(".novamente-btn");

    if (iniciarBtn) {
        iniciarBtn.addEventListener("click", iniciarJogo);
    }

    if (novamenteBtn) {
        novamenteBtn.addEventListener("click", reiniciarQuiz);
    }

    function iniciarJogo() {
        telaInicial.style.display = "none";
        barraProgressoContainer.style.display = "block";
        caixaPerguntas.style.display = "block";
        caixaAlternativas.style.display = "flex";
        caixaResultado.style.display = "none";

        atual = 0;
        historiaFinal = "";
        substituiNome();
        mostraPergunta();
    }

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
        caixaAlternativas.innerHTML = "";

        caixaPerguntas.classList.remove("animar-entrada");
        caixaAlternativas.classList.remove("animar-entrada");
        void caixaPerguntas.offsetWidth;
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
        barraProgressoContainer.style.display = "none";
        caixaPerguntas.style.display = "none";
        caixaAlternativas.style.display = "none";
        caixaResultado.style.display = "block";

        textoResultado.textContent = `Resultado para ${nome}: ${historiaFinal}`;
    }

    function reiniciarQuiz() {
        iniciarJogo();
    }

    function substituiNome() {
        for (const pergunta of perguntas) {
            pergunta.enunciado = pergunta.enunciado.replace(/você/gi, nome);
        }
    }
});