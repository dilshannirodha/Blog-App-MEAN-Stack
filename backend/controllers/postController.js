const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
};

exports.createPost = async (req, res) => {
  const { title, content, author } = req.body;
  const media = req.file ? `/uploads/${req.file.filename}` : null;

  const post = new Post({ title, content, author, userId: req.user.id, media });
  await post.save();
  res.status(201).json(post);
};


exports.updatePost = async (req, res) => {
  const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: 'Post deleted' });
};

exports.likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likes.includes(req.user.id)) {
    post.likes.push(req.user.id);
    post.dislikes = post.dislikes.filter(id => id.toString() !== req.user.id);
  }
  await post.save();
  res.json(post);
};

exports.dislikePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.dislikes.includes(req.user.id)) {
    post.dislikes.push(req.user.id);
    post.likes = post.likes.filter(id => id.toString() !== req.user.id);
  }
  await post.save();
  res.json(post);
};

exports.addComment = async (req, res) => {
  const { text } = req.body;
  const post = await Post.findById(req.params.id);
  const comment = {
    userId: req.user.id,
    username: req.user.username,
    text,
    likes: [],
    dislikes: [],
    replies: []
  };
  post.comments.push(comment);
  await post.save();
  res.json(post);
};

exports.replyToComment = async (req, res) => {
  const { text } = req.body;
  const post = await Post.findById(req.params.postId);
  const comment = post.comments.id(req.params.commentId);
  comment.replies.push({
    userId: req.user.id,
    username: req.user.username,
    text,
    likes: [],
    dislikes: [],
    replies: []
  });
  await post.save();
  res.json(post);
};

exports.likeComment = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  const comment = post.comments.id(req.params.commentId);
  if (!comment.likes.includes(req.user.id)) {
    comment.likes.push(req.user.id);
    comment.dislikes = comment.dislikes.filter(id => id.toString() !== req.user.id);
  }
  await post.save();
  res.json(post);
};

exports.deleteComment = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  post.comments = post.comments.filter(c => c._id.toString() !== req.params.commentId);
  await post.save();
  res.json(post);
};
