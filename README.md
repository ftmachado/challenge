# Tech Challenge API NodeJS

Este projeto faz parte do desafio de construir uma API GET em NodeJS.

## O Projeto

Esta API recebe como entrada um conjunto de ingredientes (máximo 3) por parâmetro GET.

A partir destes ingredientes consulta as APIs públicas RecipePuppy (http://www.recipepuppy.com/about/api/) e Giphy (https://developers.giphy.com/docs/) para gerar a resposta final da requisição.

O processo é o seguinte: a API recebe os ingredientes e submete a consulta ao RecipePuppy. A partir do título retornado da receita, submete nova requisição ao Giphy e obtém uma URL com o link do .gif.

Como resposta, devolve uma lista de receitas com base nos keywords informados com 4 atributos:
- Título da receita;
- Lista de ingredientes;
- Link para acessar a receita;
- Link de um gif para a receita.

### A Estrutura

A API possui apenas um endpoint que respeita a seguinte chamada:

`http://{HOST}:{PORT}/recipes/?i={ingredient_1},{ingredient_2},{ingredient_3}`

### Instalação

Para instalar os pacotes é necessário ter instalado o `npm` e executar:

```sh
npm install
```

A execução do servidor pode ser feita pelo comando `node`, ou ainda com o pacote `nodemon` que monitora modificações no projeto e automaticamente reinicia o servidor. Sendo assim execute um dos códigos abaixo para iniciar o servidor:

```sh
node bin/server
ou
nodemon bin/server
```

### Exemplo

A porta utilizada para requisições é a porta 3000, utilizando localhost.

Para verificar se o servidor está funcionando, execute:
```sh
`http://localhost:3000/
```

Para utilizar a API:

`http://localhost:3000/recipes/?i=onion,tomato,garlic`

A resposta segue a estrutura:

```
{
	"keywords": ["onion", "tomato"],
	"recipes": [{
		"title": "Greek Omelet with Feta",
		"ingredients": ["eggs", "feta cheese", "garlic", "red onions", "spinach", "tomato", "water"],
		"link": "http://www.kraftfoods.com/kf/recipes/greek-omelet-feta-104508.aspx",
		"gif": "https://media.giphy.com/media/xBRhcST67lI2c/giphy.gif"
	   },{
		"title": "Guacamole Dip Recipe",
		"ingredients": ["avocado", "onions", "tomato"],
		"link":"http://cookeatshare.com/recipes/guacamole-dip-2783",
		"gif":"https://media.giphy.com/media/I3eVhMpz8hns4/giphy.gif"
	   }
	]
}
```

## Desenvolvido por

**Fhabiana Thieli Machado**

- <fsantos@inf.ufsm.br>
