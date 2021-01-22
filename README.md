# comoestoulendo-refactor

API do projeto "Como Estou Lendo?", responsável por autenticar usuários, registrar suas leituras e acompanhar o usuário nessas leituras, podendo armazenar a última página lida, última vez que houve uma atualização no registro de leitura, quantidade de dias que o usuário está com essa leitura e a quantidade média de páginas lidas por dia.

<h1 id="acesso">Acesso ao projeto</h1>
<p>Apesar de não estar hospedado, é possível acessar o projeto localmente. Para isso:</p>
<ol>
<li>Clone o Repositório
<pre>git clone https://github.com/carolvalenca/comoestoulendo-refactor.git</pre>
</li>
<li>Instale o <a href="https://nodejs.org/en/">Node.js</a> e o <a href="https://www.npmjs.com/">npm</a></li>
<li>Entre na pasta do projeto e instale as dependências
<pre>npm install</pre>
</li>
<li>Crie um arquivo .env e preencha com as informações necessárias para conexão com seu banco de dados <a href="https://www.postgresql.org">PostgreSQL</a> local tal como no arquivo .env.example
<li>Como o .env preenchido, inicie o servidor
<pre>npm start</pre>
</li>
<li>No navegador, acesse a porta em que o processo foi iniciado junto com a rota de acesso desejada
<pre>http://localhost:8080/signin</pre>
</li>

</ol>
