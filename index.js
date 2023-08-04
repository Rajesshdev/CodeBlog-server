const express = require('express')
const mongoose = require('mongoose')
const Crud = require('./models/friends')
const Comment = require('./models/comments')
const cors = require('cors')
const cloudinary = require('cloudinary').v2;
const bodyParser = require('body-parser');
const app = express()
require("dotenv").config();
const fs = require('fs')
app.use(cors())
mongoose.connect('mongodb+srv://rajessh781:R%40jesh2512@personal-blog.dtfxubi.mongodb.net/CodeBlog', { useNewUrlParser: true })
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
mongoose.set('strictQuery', true);
//post Funcytion
app.post('/post/add', async (req, res) => {
    let base64Image = req.body.author.photo.split(';base64,').pop();
    fs.writeFile('image.png', base64Image, { encoding: 'base64' }, function (err) {
        console.log('File created');
    });
    let base64Image1 = req.body.blogphoto.split(';base64,').pop();
    fs.writeFile('image.png', base64Image1, { encoding: 'base64' }, function (err) {
        console.log('File created');
    });
    const result = await cloudinary.uploader.upload(req.body.author.photo, {
        folder: 'author_photos'
      });
      const result1 = await cloudinary.uploader.upload(req.body.blogphoto, {
        folder: 'blog_photos'
      });
    const author = {
        bio: req.body.author.bio,
        name: req.body.author.name,
        photo: result.secure_url
    }
    const categories = {
        type: req.body.categories.type
    }
    const content = []
    for (let i = 0; i < req.body.content.length; i++) {
        content.push({
            text: req.body.content[i].text,
            code: req.body.content[i].code
        })
    }
    const Post = new Crud({ author: author, categories: categories, content: content, blogphoto: result1.secure_url, title: req.body.title });
    await Post.save();
    res.send("Data is Inserted")
})

app.put('/post/update',async(req,res)=>{
    let base64Image = req.body.author.photo.split(';base64,').pop();
    fs.writeFile('image.png', base64Image, { encoding: 'base64' }, function (err) {
        console.log('File created');
    });
    const Newauthor = {
        bio: req.body.author.bio,
        name: req.body.author.name,
        photo: base64Image
    }
    const categories = {
        type: req.body.categories.type
    }
    const content = []
    for (let i = 0; i < req.body.content.length; i++) {
        content.push({
            text: req.body.content[i].text,
            code: req.body.content[i].code
        })
    }
    // const Post = new Crud({ author: author, categories: categories, content: content, blogphoto: req.body.blogphoto, title: req.body.title });
try{
    await Crud.findById(req.body.id,(err,update)=>{
        update.author=Newauthor
        // const Post = new Crud({ author: author, categories: categories, content: content, blogphoto: req.body.blogphoto, title: req.body.title });
     update.save();
    })
}
catch(err){
    console.log(err);
}
res.send("updated")
})

app.get('/read',async (req, res) => {
    // const data = await Model.findById(req.body.id);
    Crud.find({}, (err, result) => {
        
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})
app.get('/get/post', (req, res) => {
    Crud.find({}, (err, result) => {
        
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})
app.post('/comments/add', async (req, res) => {
    const blog_id = req.body.blog_id
    const name = req.body.name
    const email = req.body.email
    const comment=req.body.comment
    const Post = new Comment({ blog_id: blog_id, name: name, email: email,comment:comment })
    await Post.save();
    res.send("Comments Posted")
})
app.get('/comments/', async (req, res) => {
    Comment.find({}, (err, result) => {
        if (err) {
            res.send(err)
        }
        else {
            res.send(result)
        }
    })
})

app.listen(process.env.PORT||3001, () => {
    console.log("Youre COnnected")
})
