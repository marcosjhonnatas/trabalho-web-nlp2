# Trabalho NLP2
Projeto WEB pertinente à matéria de NLP2.

# Alunos
  Gustavo Bonfim de Jesus
  
  Marcos Jhônatas Pereira de Sousa
  
  André Luiz Lopes
  
# Tecnologias
NodeJs;

ReactJs;

Axios;

IBM Watson.

# Justificativa

Conforme solicitado como trabalho final da disciplina, desenvolvemos um projeto web que é capaz de realizar as conversões de texto para voz e de voz para texto. Para tal,
implementamos uma interface WEB que possui componentes visuais o qual visam permitir essa interação. O campo de texto habilitado possibilita ao usuário digitar textos e 
ao acionar o botão "Ouvir", o sistema retorna em voz o texto inserido. 
Do mesmo modo, ao acionar o botão "Falar", o sistema permite ao usuário gravar um áudio, e ao clicar novamente, retorna em texto as palavras ditas pelo usuário.

### Pré-requisitos

Nodejs v12.0.0: https://nodejs.org;

Conta na IBM para geração da chave de comunicação com a api do ibm-watson: https://www.ibm.com/br-pt/watson;


### Como executar
 1 - Clone o projeto utilizando o comando "git clone https://github.com/marcosjhonnatas/trabalho-web-nlp2.git";
 
 2 - Navegue até o arquivo "trabalho-nlp2-api/services/speech-to-text.service.js" e insira sua chave de api do ibm watson na linha 7 (apikey: 'sua chave');
 
 3 - Navegue até o arquivo "trabalho-web-nlp2/trabalho-nlp2-api/services/text-to-speech.service.js" e insira sua chave de api do ibm watson na linha 13 (apikey: 'sua chave');
 
 4 - Para executar a api, navegue até o diretório "trabalho-nlp2-api/" e execute o comando "node server.js";
 
 5 - Para startar o front-end, navegue até o diretório "trabalho-nlp2/src/" e execute o comando "npm start".
