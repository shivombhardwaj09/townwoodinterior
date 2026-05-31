import { Request, Response } from 'express';
import GalleryImage from '../models/GalleryImage';

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
export const getGalleryImages = async (_req: Request, res: Response) => {
  try {
    const images = await GalleryImage.find().sort('-createdAt');
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a gallery image
// @route   POST /api/gallery
// @access  Private/Admin
export const createGalleryImage = async (req: Request, res: Response) => {
  try {
    const newImage = new GalleryImage(req.body);
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// @desc    Update a gallery image
// @route   PUT /api/gallery/:id
// @access  Private/Admin
export const updateGalleryImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const image = await GalleryImage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (image) {
      res.json(image);
    } else {
      res.status(404).json({ message: 'Gallery image not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// @desc    Delete a gallery image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
export const deleteGalleryImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const image = await GalleryImage.findByIdAndDelete(req.params.id);
    if (image) {
      res.json({ message: 'Gallery image removed' });
    } else {
      res.status(404).json({ message: 'Gallery image not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
