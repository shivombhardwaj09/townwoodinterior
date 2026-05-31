import express from 'express';

// Middleware
import { protect } from '../middleware/authMiddleware';
import upload from '../middleware/uploadMiddleware';

// Controllers
import { loginUser } from '../controllers/authController';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/projectController';
import { getServices, createService, updateService, deleteService } from '../controllers/serviceController';
import { getEnquiries, createEnquiry, updateEnquiry, deleteEnquiry } from '../controllers/enquiryController';
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } from '../controllers/teamController';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../controllers/blogController';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonialController';
import { getGalleryImages, createGalleryImage, updateGalleryImage, deleteGalleryImage } from '../controllers/galleryController';

const router = express.Router();

// Auth Route
router.post('/auth/login', loginUser);

// Upload Route (Protected)
router.post('/upload', protect, upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({
      message: 'Image Uploaded Successfully',
      imageUrl: `/uploads/${req.file.filename}`,
    });
  } else {
    res.status(400).json({ message: 'No image file provided' });
  }
});

// Projects
router.route('/projects')
  .get(getProjects)
  .post(protect, createProject);
router.route('/projects/:id')
  .put(protect, updateProject)
  .delete(protect, deleteProject);

// Services
router.route('/services')
  .get(getServices)
  .post(protect, createService);
router.route('/services/:id')
  .put(protect, updateService)
  .delete(protect, deleteService);

// Enquiries (Admin should be able to get all, but public creates them)
router.route('/enquiries')
  .get(protect, getEnquiries)
  .post(createEnquiry);
router.route('/enquiries/:id')
  .put(protect, updateEnquiry)
  .delete(protect, deleteEnquiry);

// Team Members
router.route('/team')
  .get(getTeamMembers)
  .post(protect, createTeamMember);
router.route('/team/:id')
  .put(protect, updateTeamMember)
  .delete(protect, deleteTeamMember);

// Blogs
router.route('/blogs')
  .get(getBlogs)
  .post(protect, createBlog);
router.route('/blogs/:id')
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

// Testimonials
router.route('/testimonials')
  .get(getTestimonials)
  .post(protect, createTestimonial);
router.route('/testimonials/:id')
  .put(protect, updateTestimonial)
  .delete(protect, deleteTestimonial);

// Gallery
router.route('/gallery')
  .get(getGalleryImages)
  .post(protect, createGalleryImage);
router.route('/gallery/:id')
  .put(protect, updateGalleryImage)
  .delete(protect, deleteGalleryImage);

export default router;
