const express = require('express');
const app = express();
const bodyParser = require("body-parser"); 

const port = 3000

app.use(bodyParser.urlencoded({extended: true})); // use to parese express req.bod
app.use(express.static('public')); // server static files i.e css
app.set("view engine", "ejs"); // no need to mention extension ejs

//main code start here

let post = new Object();
post["postBy"] = "Naresh";
post["postTitle"] = "I Love JS";
post["postDescription"] = "JavaScript, often abbreviated as JS, is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions";
post["postTag"] = "Coding";
post['postDateTime'] = new Date().toLocaleString();

let postArray = new Array();
postArray.push(post);

app.get('/tweets', function(req, res){
    res.render('tweet',{"home": "unactive", "createPost": "active"})
});


// create post page
app.get('/create-post', function(req, res){
    res.render('post', {"home": "unactive", "createPost": "active"})
});

app.post('/create-post', function(req, res){
    const postData = req.body;
    postData['postDateTime'] = new Date().toLocaleString();
    postArray.push(postData);
    res.redirect('/')
})

// home page
app.get('/', function(req, res){
    postArray = postArray.reverse() 
    res.render('home', {'posts': postArray, "home": "active", "createPost": "unactive"})
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))