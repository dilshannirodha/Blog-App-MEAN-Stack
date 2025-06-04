const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware'); // You imported as 'auth' but used 'authMiddleware' later
const upload = require('../middleware/upload');
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  addComment,
  replyToComment,
  likeComment,
  deleteComment
} = require('../controllers/postController');

router.get('/', getPosts);

// For creating posts with file upload, use upload middleware
router.post('/', auth, upload.single('media'), createPost);

router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

router.put('/like/:id', auth, likePost);
router.put('/dislike/:id', auth, dislikePost);

router.post('/:id/comment', auth, addComment);
router.post('/:postId/comment/:commentId/reply', auth, replyToComment);

router.put('/:postId/comment/:commentId/like', auth, likeComment);
router.delete('/:postId/comment/:commentId', auth, deleteComment);

module.exports = router;
