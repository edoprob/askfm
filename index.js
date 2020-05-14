const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./database/database');
const Ask = require('./database/Ask');
const Answer = require('./database/Answer');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//rotas
	//index (todas as perguntas)
app.get("/", function(req, res){
	Ask.findAll({
		raw: true,
		order: [
			['id', 'DESC']
		]
	}).then(function(temp){
		res.render('index', {
			asks: temp
		})
	});

});

	//formulario de nova pergunta

app.get("/ask", function(req, res){
	res.render('ask')
});

	//recebendo formulario POST da nova pergunta

app.post("/receiveAsk", function(req, res){
	Ask.create({
		title: req.body.title, 
		description: req.body.description
	}).then(function(){
		console.log("registro adicionado!");
	});
	res.redirect("/");
});

	//vendo uma pergunta e podendo responder

app.get("/view/:id", function(req, res){
	var temp = req.params.id;

	Ask.findOne({
		where: {
			id: temp
		}
	}).then(function(temp1){
		if (temp1 != undefined) {
			Answer.findAll({
				where: {
					askId: temp
				},
				order: [
					["id", 'DESC']
				]
			}).then(function(temp2){
				res.render("view", {ask: temp1, answers: temp2});
			});
		} else {
			res.redirect("/");
		}
	});
	
});

	//recebendo formulario da resposta

app.post("/receiveAnswer", function(req, res){
	Answer.create({
		name: req.body.name,
		description: req.body.description,
		askId: req.body.askId 
	}).then(function(){
		console.log("registro adicionado!");
	});
	res.redirect("/view/"+req.body.askId);
});


app.listen(8081, function(){
	console.log("app rodando!");
});

function newFunction() {
	;
}
