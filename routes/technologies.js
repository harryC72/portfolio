import { Router } from "express";
import technology from "../models/Technology";

import auth from "../middleware/auth.js";

const router = Router();

router.get("/", (req, res) => {
  technology
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting technologies",
      });
    });
});

router.get("/:id", (req, res) => {
  technology
    .find({ _id: req.params.id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the technology",
      });
    });
});

router.post("/", (req, res) => {
  // Validate request
  // if (!req.body.name || !req.body.image || !req.body.type) {
  //   return res.status(400).send({
  //     message: "Fill all fields",
  //   });
  // }

  console.log("REQ BODY NAME", req.body);

  const newTech = new technology({
    name: req.body.name,
    image: req.body.image,
    type: req.body.type,
  });

  newTech
    .save()
    .then((data) => {
      console.log("data", data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the new technology.",
      });
    });
});

router.put("/:id", (req, res) => {
  // Validate request
  // if (!req.body.bodyText) {
  //   return res.status(400).send({
  //     message: "Blogpost body text can not be empty",
  //   });
  // }

  technology
    .updateOne(
      { _id: req.params.id }, // Filter
      {
        $set: {
          name: req.body.name,
          image: req.body.image,
          type: req.body.type,
        },
      }, // Update
      { upsert: true } // add document with req.body._id if not exists
    )

    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the technology.",
      });
    });
});

router.delete("/:id", (req, res) => {
  technology
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
          err.message ||
          "Some error occurred while trying to delete the technology",
      });
    });
});

export default router;
