const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { checkForAuthenticationCookie } = require('./middleware/authentication'); // 
const Blog = require('./models/blog')
const app = express();
const PORT = process.env.PORT || 8000;

mongoose
  .connect('mongodb://127.0.0.1:27017/BlogApp')
  .then(() => console.log("MongoDB Connected"))



app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token')); 
app.use(express.static(path.resolve('./public')));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));



const userRoute = require("./routes/user");
app.use('/user', userRoute);

const blogRoute = require("./routes/blog");
app.use('/blog', blogRoute);

app.get('/', async (req, res) => {
  const allBlogs = await Blog.find({});
  console.log("User in request:", req.user); 
  res.render('home', { user: req.user, blogs: allBlogs });
});

app.get('/logout', (req, res) => {
  res.clearCookie("token").redirect("/");
});


app.listen(PORT, () => console.log(`SERVER STARTED ON PORT: ${PORT}`));
