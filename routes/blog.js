const { Router } = require("express");
const Blog = require('../models/blog');
const multer = require('multer');
const path= require('path');
const Comment = require("../models/comment");
const user = require("../models/user");

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null,fileName);
    }
  });

  const upload = multer({ storage: storage })
  
router.get('/add-new',(req,res)=>{
    return res.render("addBlog",{
        user:req.user,
    })
})

router.post('/',upload.single('coverImage'),async(req,res)=>{
    const {title,body}= req.body
    const blog = await Blog.create({
      body,
      title,
      createdBy : req.user._id,
      coverImageUrl: `/uploads/${req.file.filename}`
    })
    console.log(blog);
    return res.redirect(`/blog/${blog._id}`);
})

router.get('/:id', async (req, res) => {
    const blogID = req.params.id;
    try {
        const blog = await Blog.findById(blogID).populate('createdBy');
        if (!blog) {
            return res.status(404).send('Blog not found');
        }

        const comments = await Comment.find({ blogID: blogID }).populate('createdBy'); 

        console.log("Fetched comments:", comments);

        res.render('blog', {
            blogID: blogID,
            blog: blog,
            comments: comments,  // Pass comments to the view
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});



router.post('/comment/:blogID', async (req, res) => {
    try {
       const comment =  await Comment.create({
            content: req.body.content,
            blogID: req.params.blogID,
            createdBy: req.user._id
        });
        console.log("Blog ID when creating comment:", req.params.blogID);
        console.log(comment);
       // Redirect back to the main blog page after posting the comment
       return res.redirect(`/blog/${req.params.blogID}`);
    } catch (err) {
        res.status(500).send('Error while creating comment');
    }
});





module.exports=router;