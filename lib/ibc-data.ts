const ibcData = {
  questions: [
    {
      id: "1",
      question: "O que melhor define o papel de um servidor?",
      answers: [
        "Um computador na rede local que permite a execuação de tarefas complexas",
        "Um software utilizado para diminuir a latência de requisições",
        "Um computador remoto ou local, que recebe e processa requisições de um cliente",
        "Um servidor é um tipo de hardware utilizado para criar sites",
      ],
    },
    {
      id: "2",
      question: "Quais são as duas partes envolvidas ",
      answers: [
        "Explorar novas rotas",
        "Ser piloto",
        "Conversar com os passageiros",
        "Planejar a viagem",
      ],
    },
    {
      id: "3",
      question:
        "Entre os protocolos utilizados para um cliente se comunicar com um servidor, qual deles é utilizado para acesso remoto criptografado?",
      answers: ["HTTP", "HTTPS", "TLS", "SSH"],
    },
    {
      id: "4",
      question: "Qual é a melhor definição de latência?",
      answers: [
        "Latência é o tempo entre a requisição ser feita pelo cliente e chegar até o servidor.",
        "Latência é o tempo gasto entre o fim do processamento de uma requisição até a resposta chegar ao cliente.",
        "Latência é o tempo calculado entre o momento em que o cliente envia uma requisição + processamento pelo servidor + tempo para resposta voltar ao cliente.",
        "Latência é a quantidade de processamento necessária para processar determinada requisição.",
      ],
    },
    {
      id: "5",
      question:
        "Escalabilidade é uma das métricas utilizadas para avaliar o desempenho de um servidor, e está relacionado a...",
      answers: [
        "O hardware do servidor, ou seja, o número de processadores, memória, discos e outros recursos.",
        "A memória RAM disponível, visto que, quanto maior a quantidade de memória primário disponível, mais requisições podem ser processadas simultaneamente.",
        "Ao software e o hardware, pois, mesmo que o hardware seja capaz de lidar com um grande número de requisições, otimizações de software ainda são cruciais para garantir a eficiência.",
        "O software, porque um servidor com hardware menos pontente, pode ainda ser escalável se o software for desenvolvido de forma eficiente.",
      ],
    },
    {
      id: "6",
      question: "O troughput é...",
      answers: [
        "A quantidade de requisições que um servidor processa em um determinado período de tempo.",
        "A quantidade de requisições que um servidor processa.",
        "A quantidade de requisições que não são respondidas pelo servidor em determinado período de tempo.",
        "A quantidade de requisições feitas pelo cliente ao servidor.",
      ],
    },
    {
      id: "7",
      question: "donwtime",
      answers: [
        "Gerar a ideia global",
        "Fazer com que aconteça",
        "Fazer com que as pessoas gostem",
        "Fazer com que funcione",
      ],
    },
    {
      id: "8",
      question: "Um balanceador de carga (load balancer) é...",
      answers: [
        "Um software que fica situado entre o cliente e o servidor, e distribui as requisições entre diferentes instâncias de servidores por meio de diversos algoritmos.",
        "É um hardware especial que diminui a latência de requisições, aumentando o poder de processamento do servidor por meio de uma memória virtual.",
        "É uma técnica utilizada para aumentar a perfomance de sistemas de computação em nuvem, onde requisições são distribuídas entre os núcleos do processador.",
        "São algoritimos com o objetivo de aumentar a eficiência de um sistema em nuvem, entre os mais utilizados estão round robin, weigthed, least connection.",
      ],
    },
    {
      id: "9",
      question: "A diferença entre um serviço Serveless x Serverfull é...",
      answers: [
        "Um serviço serveless é aquele que não precisa de um servidor para funcionar.",
        "A diferença se dá na capacidade de processamento, onde serviços serverful possuem maior poder de processamento do que serveless.",
        "Os dois se diferenciam na proposta, serviços serverless prometem computação em nuvem sem a necessidade de todo o procedimento de configuração, manuntenção e gerenciamento de servidores.",
        "A modalidade serverful se diferencia da serverless, somente pelo nível de escalabilidade, o serviço serverful pode ser escalável, enquanto o serviço serverless não pode.",
      ],
    },
    {
      id: "10",
      question: "Eu gosto de chegar...",
      answers: ["Em outro lugar", "Na frente", "Junto", "Na hora"],
    },
    {
      id: "11",
      question: "Um ótimo dia para mim é quando...",
      answers: [
        "Desfruto de coisas novas e estimulantes",
        "Consigo fazer muitas coisas",
        "Me divirto com meus amigos",
        "Tudo segue conforme planejado",
      ],
    },
    {
      id: "12",
      question: "Eu vejo a morte como...",
      answers: [
        "Uma grande aventura misteriosa",
        "Algo que sempre chega muito cedo",
        "Oportunidade para rever os falecidos",
        "Um modo de receber recompensas",
      ],
    },
    {
      id: "13",
      question: "Minha filosofia de vida é...",
      answers: [
        "Para ganhar, é necessário inventar novas regras",
        "Há ganhadores e perdedores, e eu acredito ser um ganhador",
        "Para eu ganhar, ninguém precisa perder",
        "Para ganhar é preciso seguir as regras",
      ],
    },
    {
      id: "14",
      question: "Eu sempre gostei de...",
      answers: [
        "Explorar",
        "Focalizar a meta",
        "Realizar uma abordagem natural",
        "Evitar surpresas",
      ],
    },
    {
      id: "15",
      question: "Eu gosto de mudanças se...",
      answers: [
        "Me der mais liberdade e variedade",
        "Me der uma vantagem competitiva",
        "For divertido e puder ser compartilhado",
        "Melhorar ou me der mais controle",
      ],
    },
    {
      id: "16",
      question: "Não existe nada de errado em...",
      answers: [
        "Mudar de ideia",
        "Se colocar na frente",
        "Colocar os outros na frente",
        "Ser consistente",
      ],
    },
    {
      id: "17",
      question: "Eu gosto de buscar conselhos de...",
      answers: [
        "Lugares, os mais estranhos",
        "Pessoas bem-sucedidas",
        "Anciões e conselheiros",
        "Autoridades no assunto",
      ],
    },
    {
      id: "18",
      question: "Meu lema é...",
      answers: [
        "Fazer o que precisa ser feito",
        "Simplesmente fazer",
        "Fazer junto com o grupo",
        "Fazer bem feito",
      ],
    },
    {
      id: "19",
      question: "Eu gosto de...",
      answers: [
        "Complexidade, mesmo se confuso",
        "Coisas claras e simples",
        "Calor humano e animação",
        "Ordem e sistematização",
      ],
    },
    {
      id: "20",
      question: "Tempo para mim é...",
      answers: [
        "Irrelevante",
        "Algo que detesto desperdiçar",
        "Um grande ciclo",
        "Uma flecha que leva ao inevitável",
      ],
    },
    {
      id: "21",
      question: "Se eu fosse bilionário...",
      answers: [
        "Faria o que desse na cabeça",
        "Exibiria bastante com algumas pessoas",
        "Faria doações para muitas entidades",
        "Criaria uma poupança avantajada",
      ],
    },
    {
      id: "22",
      question: "Eu acredito que...",
      answers: [
        "Bastam um navio e uma estrela para navegar",
        "O destino é mais importante que a jornada",
        "A jornada é mais importante que o destino",
        "Um centavo economizado é um centavo ganho",
      ],
    },
    {
      id: "23",
      question: "Eu acredito também que...",
      answers: [
        "Um sorriso ou uma careta é o mesmo para quem é cego",
        "Aquele que hesita está perdido",
        "O que vai, volta",
        "De grão em grão a galinha enche o papo",
      ],
    },
    {
      id: "24",
      question: "Eu acredito ainda que...",
      answers: [
        "A autoridade deve ser desafiada",
        "Ganhar é fundamental",
        "O coletivo é mais importante do que o individual",
        "É melhor prudência do que arrependimento",
      ],
    },
    {
      id: "25",
      question: "Eu penso que...",
      answers: [
        "Não é fácil ficar encurralado",
        "Se você não tem condições de competir, não compita",
        "Duas cabeças pensam melhor que do que uma",
        "É preferível olhar, antes de pular",
      ],
    },
  ],
  results: {
    aguia: {
      // lema: "Fazer Diferente",
      comportamentos: [
        "Criativo",
        "Intuitivo",
        "Foco no Futuro",
        "Distraído",
        "Curioso",
        "Informal/Casual",
        "Flexível",
      ],
      pontos_fortes: [
        "Provoca mudanças radicais",
        "Antecipar o futuro",
        "Criatividade",
      ],
      pontos_de_melhoria: [
        "Falta de atenção para o aqui e agora",
        "Impaciência e rebeldia",
        "Defender o novo pelo novo",
      ],
      motivacoes: [
        "Liberdade de expressão",
        "Ausência de controles rígidos",
        "Ambiente de trabalho descentralizado",
        "Liberdade para fazer exceções",
        "Oportunidade para delegar tarefas e detalhes",
      ],
      description:
        "O perfil Águia representa liderança inspiradora, visão estratégica e execução eficiente de planos. No mundo do trabalho, o perfil Águia é ideal para posições de liderança e gestão.",
    },
    gato: {
      // lema: "Fazer Junto",
      comportamentos: [
        "Sensível",
        "Relacionamentos",
        "Time",
        "Tradicionalistas",
        "Contribuição",
        "Busca harmonia",
        "Delega autoridade",
      ],
      pontos_fortes: [
        "Manter comunicação harmoniosa",
        "Desenvolver e manter a cultura empresarial",
        "Comunicação aberta",
      ],
      pontos_de_melhoria: [
        "Esconder conflitos",
        "Felicidade acima dos resultados",
        "Manipulação através dos sentimentos",
      ],
      motivacoes: [
        "Segurança",
        "Aceitação social",
        "Construir o consenso",
        "Reconhecimento da equipe",
        "Supervisão compreensiva",
        "Ambiente harmônico",
        "Trabalho em grupo",
      ],
      description:
        "O perfil Gato representa precisão, confiabilidade e uma abordagem detalhista no trabalho. No mundo do trabalho, o perfil Gato é ideal para funções que exigem observação, análise e atenção aos detalhes.",
    },
    lobo: {
      // lema: "Fazer Certo",
      comportamentos: [
        "Detalhista",
        "Organizado",
        "Estrategista",
        "Busca do conhecimento",
        "Pontual",
        "Conservador",
        "Previsível",
      ],
      pontos_fortes: [
        "Passado, Presente e Futuro",
        "Consistência, conformidade e qualidade",
        "Lealdade e segurança",
        "Regras e responsabilidades",
      ],
      pontos_de_melhoria: [
        "Dificuldades de se adaptar às mudanças",
        "Pode impedir o progresso",
        "Detalhista, estruturado e demasiadamente sistematizado",
      ],
      motivacoes: [
        "Certeza, compreensão exata de quais são as regras",
        "Conhecimento específico do trabalho",
        "Ausência de riscos e erros",
        "Ver o produto acabado - começo, meio e fim",
      ],
      description:
        "O perfil Lobo representa cooperação, empatia e habilidade para manter relacionamentos eficazes dentro da equipe. No mundo do trabalho, o perfil Lobo valoriza trabalho em equipe, lealdade e colaboração.",
    },
    tubarao: {
      // lema: "Fazer Rápido",
      comportamentos: [
        "Senso de urgência",
        "Ação",
        "Iniciativa",
        "Impulsivo",
        "Prático",
        "Vencer desafios",
        "Aqui e agora",
        "Auto suficiente",
        "Não gosta de delegar poder",
      ],
      pontos_fortes: [
        "Fazer que ocorra",
        "Parar com a burocracia",
        "Motivação",
      ],
      pontos_de_melhoria: [
        "Socialmente um desastre",
        "Faz do modo mais fácil",
        "Relacionamento complicado",
      ],
      motivacoes: [
        "Liberdade para agir individualmente",
        "Controle das próprias atividades",
        "Resolver os problemas do seu jeito",
        "Competição individual",
        "Variedade de atividades",
        "Não ter que repetir tarefas",
      ],
      description:
        "O perfil Tubarão representa agressividade, competitividade e determinação para liderar e superar obstáculos. No mundo do trabalho, o perfil Tubarão é ideal para posições que exigem competitividade e foco em resultados.",
    },
  },
};

export default ibcData;
