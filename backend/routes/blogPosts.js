import { Router } from 'express';
import BlogPost from '../models/blogPost.js';
import auth from '../middleware/authMiddleware.js';
import {
  getBlogPosts,
  getBlogPostById,
  saveBlogPost,
} from '../controllers/blogPostController';

import { upload } from '../utils/fileUpload';

const router = Router();

router.route('/').get(getBlogPosts);
router.route('/:id').get(getBlogPostById);

router.post('/', auth, upload.single('file'), (req, res) => {
  const url = req.protocol + '://' + req.get('host');

  const post = new BlogPost({
    title: req.body.title || 'Untitled Note',
    alt: req.body.alt,
    file: '/uploads/images/' + req.file.filename,
    ingress: req.body.ingress,
    bodyText: req.body.bodyText,
  });

  post
    .save()
    .then((data) => {
      console.log('data', data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the art piece.',
      });
    });
});

router.put('/:id', auth, (req, res) => {
  console.log('REQ', req.body, req.params);
  // Validate request
  if (!req.body.bodyText) {
    return res.status(400).send({
      message: 'Blogpost body text can not be empty',
    });
  }

  blogPost
    .updateOne(
      { _id: req.params.id }, // Filter
      { $set: { title: req.body.title, bodyText: req.body.bodyText } }, // Update
      { upsert: true } // add document with req.body._id if not exists
    )

    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while updating the blog post.',
      });
    });
});

router.delete('/:id', auth, (req, res) => {
  BlogPost.findByIdAndDelete({
    _id: req.params.id,
    function(err, post) {
      if (err) return next(err);
      res.json(post);
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while trying to delete the post',
      });
    });
});

export default router;
