import { Router } from 'express';
import BlogPost from '../models/blogPost.js';

import asyncHandler from 'express-async-handler';

const getBlogPosts = asyncHandler(async (req, res) => {
  const blogPosts = await BlogPost.find({});
  res.json(blogPosts);
});

const getBlogPostById = asyncHandler(async (req, res) => {
  console.log('id', req.params.id);
  const blogPost = await BlogPost.findById(req.params.id);
  console.log('blogPost', blogPost);
  if (blogPost) {
    res.json(blogPost);
  } else {
    res.status(404);
    throw new Error('Blogpost not found');
  }
});

const saveBlogPost = (req, res) => {
  // Validate request
  if (!req.body.bodyText) {
    return res.status(400).send({
      message: 'Blogpost body text can not be empty',
    });
  }

  const post = new BlogPost({
    title: req.body.title || 'Untitled Note',
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
          err.message || 'Some error occurred while creating the blog post.',
      });
    });
};

export { getBlogPosts, getBlogPostById, saveBlogPost };
