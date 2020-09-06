import { Router } from "express";
import project from "../models/project";
import auth from "../middleware/auth";

const router = Router();

router.get("/", (req, res) => {
  project
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while getting projects",
      });
    });
});

router.get("/:id", (req, res) => {
  project
    .find({ _id: req.params.id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while getting project",
      });
    });
});

router.post("/", (req, res) => {
  // Validate request
  if (!req.body.bodyText) {
    return res.status(400).send({
      message: "Project text can not be empty",
    });
  }

  console.log("REQ BODY FROM BACKEND", req.body);

  const post = new project({
    title: req.body.title || "Untitled Note",
    bodyText: req.body.bodyText,
    url: req.body.url,
    projectImage: req.body.projectImage,
    icon1: {
      techName: req.body.tech1Name,
    },
    icon2: {
      techName: req.body.tech2Name,
    },
    icon3: {
      techName: req.body.tech3Name,
    },
    icon4: {
      techName: req.body.tech4Name,
    },
    icon5: {
      techName: req.body.tech5Name,
    },
  });

  post
    .save()
    .then((data) => {
      console.log("data", data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the project.",
      });
    });
});

router.put("/:id", auth, (req, res) => {
  // Validate request
  if (!req.body.bodyText) {
    return res.status(400).send({
      message: "Project body text can not be empty",
    });
  }

  project
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
          err.message || "Some error occurred while creating the blog post.",
      });
    });
});

router.delete("/:id", auth, (req, res, next) => {
  project
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
          err.message || "Some error occurred while trying to delete the post",
      });
    });
});

export default router;
