import { Request, Response } from 'express';
import BlogPost from '../models/BlogPost';

// @desc    Get all blog posts
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (_req: Request, res: Response) => {
  try {
    const blogs = await BlogPost.find().sort('-createdAt');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a blog post
// @route   POST /api/blogs
// @access  Private/Admin
export const createBlog = async (req: Request, res: Response) => {
  try {
    const newBlog = new BlogPost(req.body);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private/Admin
export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Blog post not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await BlogPost.findByIdAndDelete(req.params.id);
    if (blog) {
      res.json({ message: 'Blog post removed' });
    } else {
      res.status(404).json({ message: 'Blog post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
