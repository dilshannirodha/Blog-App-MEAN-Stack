const Post = require('../models/Post');

// Get all posts
exports.getPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
};

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const media = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : null;

    const post = new Post({ title, content, author, userId: req.user.id, media });
    await post.save();
    global._io.emit('postCreated', post);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  global._io.emit('postUpdated', updated);
  res.json(updated);
};

// Delete a post
exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  global._io.emit('postDeleted', req.params.id);
  res.json({ message: 'Post deleted' });
};

// Like a post
exports.likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likes.includes(req.user.id)) {
    post.likes.push(req.user.id);
    post.dislikes = post.dislikes.filter(id => id.toString() !== req.user.id);
  }
  await post.save();
  global._io.emit('postLiked', { postId: post._id, likes: post.likes });
  res.json(post);
};

// Dislike a post
exports.dislikePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.dislikes.includes(req.user.id)) {
    post.dislikes.push(req.user.id);
    post.likes = post.likes.filter(id => id.toString() !== req.user.id);
  }
  await post.save();
  global._io.emit('postDisliked', { postId: post._id, dislikes: post.dislikes });
  res.json(post);
};

// Add a comment to a post
exports.addComment = async (req, res) => {
  const { text } = req.body;
  const post = await Post.findById(req.params.id);
  const comment = {
    userId: req.user.id,
    username: req.user.username,
    text,
    likes: [],
    replies: []
  };
  post.comments.push(comment);
  await post.save();
  
  // Get the newly added comment (last one in array)
  const newComment = post.comments[post.comments.length - 1];
  global._io.emit('newComment', newComment);
  
  res.json(post);
};

// Reply to a comment
exports.replyToComment = async (req, res) => {
  const { text } = req.body;
  const post = await Post.findById(req.params.postId);
  const comment = post.comments.id(req.params.commentId);
  const reply = {
    userId: req.user.id,
    username: req.user.username,
    text,
    likes: [],
    replies: []
  };
  comment.replies.push(reply);
  await post.save();
  
  // Get the newly added reply (last one in array)
  const newReply = comment.replies[comment.replies.length - 1];
  global._io.emit('newReply', {
    reply: newReply,
    parentCommentId: comment._id
  });
  
  res.json(post);
};

// Like a comment
exports.likeComment = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  const comment = post.comments.id(req.params.commentId);
  
  const userId = req.user.id;
  const likeIndex = comment.likes.indexOf(userId);
  
  if (likeIndex === -1) {
    comment.likes.push(userId);
  } else {
    comment.likes.splice(likeIndex, 1);
  }
  
  await post.save();
  
  global._io.emit('likeComment', {
    commentId: comment._id,
    likes: comment.likes
  });
  
  res.json(post);
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  const commentId = req.params.commentId;
  
  // Remove the comment
  post.comments = post.comments.filter(c => c._id.toString() !== commentId);
  await post.save();
  
  global._io.emit('deleteComment', commentId);
  
  res.json(post);
};
