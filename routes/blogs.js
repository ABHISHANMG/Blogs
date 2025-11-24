const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getUserBlogs,
  likeBlog,
} = require('../controllers/blogController');
const { protect } = require('../middleware/auth');

router.get('/', getBlogs);
router.get('/user/:userId', getUserBlogs);
router.get('/:id', getBlog);
router.post('/', protect, createBlog);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);
router.put('/:id/like', protect, likeBlog);

module.exports = router;

