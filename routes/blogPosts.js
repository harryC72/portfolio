import { Router } from "express";
import blogPost from "../models/blogPost";

const router = Router();

router.get("/", (req, res) => {
  blogPost
    .find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while getting blog posts"
      });
    });
});

router.get("/:id", (req, res) => {
  blogPost
    .find({ _id: req.params.id })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while getting blog posts"
      });
    });
});

router.post("/", (req, res) => {
  // Validate request
  if (!req.body.bodyText) {
    return res.status(400).send({
      message: "Blogpost body text can not be empty"
    });
  }

  const post = new blogPost({
    title: req.body.title || "Untitled Note",
    bodyText: req.body.bodyText
  });

  post
    .save()
    .then(data => {
      console.log("data", data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the blog post."
      });
    });
});

router.put("/:id", (req, res) => {
  // Validate request
  if (!req.body.bodyText) {
    return res.status(400).send({
      message: "Blogpost body text can not be empty"
    });
  }

  blogPost
    .updateOne(
      { _id: req.params.id }, // Filter
      { $set: { title: req.body.title, bodyText: req.body.bodyText } }, // Update
      { upsert: true } // add document with req.body._id if not exists
    )

    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the blog post."
      });
    });
});

router.delete("/:id", (req, res, next) => {
  blogPost
    .findByIdAndDelete({
      _id: req.params.id,
      function(err, post) {
        if (err) return next(err);
        res.json(post);
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while trying to delete the post"
      });
    });
});

export default router;
