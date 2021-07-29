const express = require("express");
const router = express.Router();
const Blog = require("../Models/blog");

router.post("/createpost", async (req, res) => {
  const { image, title, description } = req.body;
  try {
    // if user exist
    const newObject = new Blog({
      imageUrl: image,
      title,
      desc: description,
    });
    await newObject.save();
    res.send({ newObject });
  } catch (err) {
    return res.status(500).send("Server Error");
  }
});

router.get("/getpost", async (req, res) => {
  try {
    const allpost = await Blog.find();
    res.json({ allpost });
  } catch (err) {
    return res.status(500).send("Server Error");
  }
});

router.get("/getpost/:id", async (req, res) => {
  const postid = req.params.id;
  console.log(postid);
  try {
    const post = await Blog.findById({ _id: postid });
    res.json({ post });
  } catch (err) {
    return res.status(500).send("Server Error");
  }
});

router.delete("/getpost/:id", async (req, res) => {
  const postid = req.params.id;
  console.log(postid);
  try {
    const allpost = await Blog.findByIdAndDelete({ _id: postid });
    res.json({ msg: "Post has been deleted" });
  } catch (err) {
    return res.status(500).send("Server Error");
  }
});

router.patch("/getpost/:id", async (req, res) => {
  try {
    const { image, title, description } = req.body;

    const post = await Blog.findOneAndUpdate(
      { _id: req.params.id },
      {
        title,
        desc: description,
        imageUrl: image,
      }
    );
    //   .populate("user likes", "avatar username fullname")
    //   .populate({
    //     path: "comments",
    //     populate: {
    //       path: "user likes",
    //       select: "-password",
    //     },
    //   });

    res.json({
      msg: "Updated Post!",
      newPost: {
        // ...post._doc,
        title,
        image,
        description,
      },
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
