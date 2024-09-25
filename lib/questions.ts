const questions = [
  {
    id: "1",
    question: "Qual a definição de computação em nuvem?",
    answers: [
      "Um tipo de computação que funciona apenas em dispositivos móveis.",
      "A utilização de servidores locais para armazenar dados de forma offline.",
      "É a utilização de recursos de computação por meio da internet, sem a necessidade de ter uma infraestrutura de servidores fisicamente.",
      "Uma tecnologia que requer conexão direta entre todos os dispositivos em uma rede.",
    ],
    correctAnswer: 2,
  },
  {
    id: "2",
    question:
      "Qual métrica é comumente usada para medir o tempo de resposta de um sistema na nuvem?",
    answers: ["Throughput", "Latência", "Elasticidade", "Escalabilidade"],
    correctAnswer: 1,
  },
  {
    id: "3",
    question:
      "Qual conceito se refere a habilidade de um sistema se adaptar a maiores demandas?",
    answers: [
      "Escalabilidade",
      "Elasticidade",
      "Latência",
      "Capacidade de armazenamento",
    ],
    correctAnswer: 0,
  },
  {
    id: "4",
    question:
      "Qual dos seguintes fatores impacta diretamente o desempenho de um sistema em nuvem?",
    answers: [
      "A localização geográfica dos servidores",
      "O número de usuários conectados à internet globalmente",
      "A marca dos processadores dos dispositivos clientes",
      "A versão do sistema operacional do servidor",
    ],
    correctAnswer: 0,
  },
  {
    id: "5",
    question:
      "Qual dos fatores não impacta no desempenho de sistemas em nuvem?",
    answers: [
      "O tipo de monitor utilizado para visualizar as informações",
      "A velocidade da conexão com a internet do usuário",
      "A eficiência do sistema de balanceamento de carga",
      "A quantidade de servidores disponíveis em um data center",
    ],
    correctAnswer: 0,
  },
  {
    id: "6",
    question:
      "O que significa o termo Throughput em sistemas de computação em nuvem?",
    answers: [
      "O tempo necessário para processar uma única requisição",
      "A quantidade de servidores disponíveis",
      "A eficiência da virtualização",
      "A quantidade de dados processados por unidade de tempo",
    ],
    correctAnswer: 3,
  },
  {
    id: "7",
    question:
      "Qual é o principal benefício da utilização de balanceadores de carga em um ambiente de computação em nuvem?",
    answers: [
      "Aumentar a segurança do sistema",
      "Garantir a distribuição eficiente de requisições entre servidores",
      "Reduzir o consumo de energia dos servidores",
      "Facilitar a escalabilidade vertical",
    ],
    correctAnswer: 1,
  },
  {
    id: "8",
    question:
      "Qual é a métrica que serve para medir o tempo que um servidor está ativo?",
    answers: ["Escalabilidade", "Uptime", "Throughput", "Latência"],
    correctAnswer: 1,
  },
  {
    id: "9",
    question:
      "Qual o propósito de protocolos de rede na relação entre cliente e servidor?",
    answers: [
      "Permitir a comunicação criptografada entre o cliente e o servidor.",
      "Facilitar a autenticação de usuários na rede.",
      "Estabelecer um contrato do formato de requisições e respostas, dessa forma possibilitando uma conexão.",
      "Garantir que os dados enviados sejam comprimidos antes de serem transferidos.",
    ],
    correctAnswer: 2,
  },
  {
    id: "10",
    question:
      "Sobre protocolos, qual é utilizado para criptografar a conexão e permitir o controle remoto de servidores?",
    answers: ["HTTP", "TCP", "IP", "SSH"],
    correctAnswer: 3,
  },
  {
    id: "11",
    question:
      "Qual o algoritmo de balanceamento de carga que distribui as requisições sem parâmetro, somente de forma sequencial?",
    answers: [
      "Round Robin",
      "Weighted Round Robin",
      "Tempo de resposta ponderado",
      "Menos conexões",
    ],
    correctAnswer: 0,
  },
  {
    id: "12",
    question: "O que é uma VPS?",
    answers: [
      "Variable Processing Speed",
      "Virtualization Powered by Servers",
      "Virtual Private Server",
      "Volume of Synchronized Processes",
    ],
    correctAnswer: 2,
  },
];

export default questions;
