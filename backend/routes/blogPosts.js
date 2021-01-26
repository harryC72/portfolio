import { Router } from 'express';
import blogPost from '../models/blogPost.js';
import { upload } from '../utils/fileUpload';

import auth from '../middleware/authMiddleware.js';
import {
  getBlogPosts,
  getBlogPostById,
  saveBlogPost,
} from '../controllers/blogPostController';
const router = Router();

router.route('/').get(getBlogPosts);
router.route('/:id').get(getBlogPostById);

router.route('/', auth, upload.single('file')).post(saveBlogPost);

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
  blogPost
    .findByIdAndDelete({
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
