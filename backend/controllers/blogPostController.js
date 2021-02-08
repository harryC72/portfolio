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

export { getBlogPosts, getBlogPostById };
