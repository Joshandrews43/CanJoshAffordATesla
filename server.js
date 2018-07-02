//server.js
var data = require('./getData.js')
var express = require('express')
const app = express()
var router = express.Router()
var path = require('path')

console.log("We're live.")

app.use('/static', express.static(__dirname + "/public"));

router.get('/', function(req, res){
	res.render('index', { title: 'CJAAT'})
});

app.use('/', router);

app.set('views', __dirname + '/html');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Route for handling PDF generation!
router.post('/xrp', function(req, res) {
	data.getXRPPrice(function(xrpData){
		const response = xrpData
		res.send(response);
	});
});
router.post('/xrb', function(req, res) {
	data.getXRBPrice(function(xrbData){
		const response = xrbData
		res.send(response);
	});
});
router.post('/prl', function(req, res) {
	data.getPRLPrice(function(prlData){
		const response = prlData
		res.send(response);
	});
});
router.post('/xlm', function(req, res) {
	data.getXLMPrice(function(xlmData){
		const response = xlmData
		res.send(response);
	});
});
// Use the environment variable or use a given port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:%s', PORT);
});


