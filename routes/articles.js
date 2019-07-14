const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = require('../model/article');
const multer = require('multer'); //image uploader package
const ObjectId = require('mongoose').Types.ObjectId; // generate _id
const jwtLogin = require('jwt-login'); //jwt login logout

// multer storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb)=> {
        cb(null, new Date().toDateString() + file.originalname);
    }
});
// filrfilter jpeg or png or gif
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
// upload function from multer
const upload = multer({
    storage: storage,
    limit:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// jwt login authorize
const valid_login = (req, res, next) => {
    try {
        req.jwt = jwtLogin.validate_login(req, res)
        next();
    } catch(err) {
        res.status(500).json({
            success: false,
            message: "Error",
            error: err
        });
    }
} 

// get the articles from the database
router.get('/', (req, res, next) => {
    Article.find()
    .select('title description articleImg authorId')
    .populate('author')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            articles: docs
        }
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(404).json({
            success: false,
            message: "Could not get the articles from the database",
            error: err
        });
    });
});

// add a article using post routes
router.post('/add', valid_login, upload.single('articleImg'), (req, res) => {
    const article = new Article({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        author: req.body.authorId,
        articleImg: req.file.path
    });
    article.save((err) => {
        if(err) {
            res.status(401).json({
                success: false,
                message: 'Could not add a Article'
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Article Added Successfully'
            });
        }
    });
});

// get single article
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Article.findById(id)
    .select('title description email articleImg')
    .populate('author')
    .exec()
    .then(doc => {
        console.log("from database", doc);
        if(doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message:"No Article found for provided Id"
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "Internal server error",
            error:err
        });
    });
});


// Update Submit POST Route
router.put('/:id',valid_login, upload.single('articleImg'), function(req, res){
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send("no article in given id:" `${req.params.id}`);
    const UpdateArticle = {
        title: req.body.title,
        description: req.body.description,
        articleImg: req.file.path
    };
    Article.findByIdAndUpdate(req.params.id, {$set: UpdateArticle}, {new: true}, (err, doc) => {
        if(!err) {
            res.send(doc);
            res.json({
                message:" Article updated",
                success: true
            });
        } else {
            console.log("Error in Article Update: " + JSON.stringify(err, undefined, 2));
        }
    });

  });

  // Delete Article
router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send("no article in given id:" `${req.params.id}`);
   
    Article.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {
            res.status(200).json({
                success: true,
                message: "Article Deleted Successfully"
            });
        } else {
            res.status(404).json({
                success:false,
                message:"Could not Delete the article"
            });
            console.log("Error in Article Delete: " + JSON.stringify(err, undefined, 2));
        }
    });
});
// export the router
module.exports = router; 