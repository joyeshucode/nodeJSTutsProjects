const express=require('express');
const bodyParser=require('body-parser');
const app=express();
var mongoose = require("mongoose");
//Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017/admin';
mongoose.Promise = global.Promise;
var db;
app.set('view engine', 'ejs');
mongoose.connect(mongoDB, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})
/*mongoose.connect(mongoDB, {
  useMongoClient: true
});*/




app.use(bodyParser.urlencoded({extended: true}))

app.listen(3030,()=>{
	console.log('hello');
});

app.get('/',(req,res)=>{
	//res.sendFile(__dirname+'/index.html');
	console.log("hello");
	db.collection('User').find().toArray(function(err, results) {
  	console.log(results);
  	if (err) return console.log(err)
  	// renders index.ejs
    res.render('index.ejs', {users: results})
  
})
});

app.post('/users',(req,res)=>{
	console.log('hello');
	db.collection('User').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
	console.log(req.body);
});
