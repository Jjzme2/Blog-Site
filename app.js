const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const date = require(__dirname + "/date.js")
const _ = require('lodash');
const app = express();


const dayContent = date.getTimeOfDay();
const homeContent = "welcome to ILYTATWrites.";
const aboutContent = "This is the about section Content.";
const contactContent = "Contact me here: ";

// Let is safer
var posts = [];

let postRedir = "";

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  res.render('home', {
    homeContent: homeContent,
    timeOfDay: dayContent,
    posts: posts
  });
});

app.get("/about", function(req, res) {
  res.render('about', {
    homeContent: aboutContent,
    timeOfDay: dayContent
  });
});

app.get("/contact", function(req, res) {
  res.render('contact', {
    homeContent: contactContent,
    timeOfDay: dayContent
  });
});

app.get("/compose", function(req, res) {
  res.render('compose', {
    homeContent: contactContent,
    timeOfDay: dayContent
  });
});

// app.get('/post', function(req, res) {
//   res.render('post'), {
//     posts: posts,
//   }
// })

//Verbatim Copy
// app.get("/posts/:postName", function(req, res){
//   const reqestedTitle = _.lowerCase(req.params.postName);
//   posts.forEach(function(post){
//     const storedTitle = _.lowerCase(post.title);
//
//     if(storedTitle === reqestedTitle){
//       res.render("post", {
//        title: post.title,
//        content: post.body
//        });
//     }
//
//   })
// })


//My Attempt
app.get('/posts/:post', function (req, res) {

  let post = _.lowerCase(req.params.post);

  posts.forEach(function(p) {
      if(post === _.lowerCase(p.title))
      {
        res.render(`post`, {
          postTitle: p.title,
          postBody: p.body
        });
      }
  })
})

    app.post("/compose", function(req, res) {
      let post = {
        title: req.body.postTitle,
        body: req.body.postBody
      };

      posts.push(post);
      res.redirect("/");
    });

    app.listen(3000, function(req, res) {
      console.log("Server started on port 3000.");
    });
