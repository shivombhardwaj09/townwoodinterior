import dotenv from 'dotenv';
import connectDB from './config/db';
import Project from './models/Project';
import Service from './models/Service';
import TeamMember from './models/TeamMember';
import BlogPost from './models/BlogPost';
import Testimonial from './models/Testimonial';
import User from './models/User';
import bcrypt from 'bcryptjs';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Project.deleteMany();
    await Service.deleteMany();
    await TeamMember.deleteMany();
    await BlogPost.deleteMany();
    await Testimonial.deleteMany();
    await User.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);

    const adminUser = {
      email: 'admin@townwoodinterior.com',
      passwordHash: passwordHash,
      role: 'admin'
    };

    const projects = [
      {
        title: "Modern Minimalist Villa",
        category: "Residential",
        location: "Sector 50, Noida",
        areaSqFt: 3200,
        description: "A complete transformation of a 3200 sq.ft villa focusing on minimalist aesthetics and maximum natural light.",
        thumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000",
        images: ["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000"]
      },
      {
        title: "Luxury Penthouse Suite",
        category: "Luxury",
        location: "DLF Phase 3, Gurgaon",
        areaSqFt: 4800,
        description: "Ultra-luxury penthouse featuring Italian marble, custom brass fixtures, and a panoramic city view.",
        thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000",
        images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000"]
      },
      {
        title: "Corporate HQ Redesign",
        category: "Commercial",
        location: "Connaught Place, Delhi",
        areaSqFt: 6000,
        description: "Modernizing a heritage building into a state-of-the-art corporate headquarters while preserving classic elements.",
        thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000",
        images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"]
      },
      {
        title: "Scandinavian Family Home",
        category: "Residential",
        location: "Greater Noida West",
        areaSqFt: 2200,
        description: "Warm, functional, and inviting family home designed with Scandinavian principles.",
        thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
        images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000"]
      },
      {
        title: "Modular Kitchen Paradise",
        category: "Modular Kitchen",
        location: "Faridabad",
        areaSqFt: 450,
        description: "High-end German modular kitchen with smart storage and integrated premium appliances.",
        thumbnail: "https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&q=80&w=1000",
        images: ["https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&q=80&w=1000"]
      },
      {
        title: "Premium 3BHK Complete",
        category: "Residential",
        location: "Indirapuram, Ghaziabad",
        areaSqFt: 1800,
        description: "End-to-end interior execution for a premium 3BHK apartment delivered in 45 days.",
        thumbnail: "https://images.unsplash.com/photo-1600607687644-aac4c156628c?auto=format&fit=crop&q=80&w=1000",
        images: ["https://images.unsplash.com/photo-1600607687644-aac4c156628c?auto=format&fit=crop&q=80&w=1000"]
      }
    ];

    const services = [
      {
        title: "Residential Interior Design",
        description: "Complete home transformation from concept to completion. We design living rooms, bedrooms, dining areas, and entryways that reflect your personal style.",
        startingPrice: 800,
        order: 1
      },
      {
        title: "Modular Kitchen Design",
        description: "Precision-crafted modular kitchens with premium hardware, soft-close shutters, and intelligent space planning. German and Italian finish options.",
        startingPrice: 1200,
        order: 2
      },
      {
        title: "Wardrobe & Storage Solutions",
        description: "Custom floor-to-ceiling wardrobes, walk-in closets, and storage units engineered for maximum space utilization with elegant aesthetics.",
        startingPrice: 950,
        order: 3
      },
      {
        title: "Commercial Interior Design",
        description: "Corporate offices, retail spaces, hotels, and restaurants. We create commercial environments that enhance productivity, brand identity, and customer experience.",
        startingPrice: 700,
        order: 4
      },
      {
        title: "False Ceiling & Lighting Design",
        description: "Architectural false ceilings with integrated ambient, task, and accent lighting that transform the mood and atmosphere of every room.",
        startingPrice: 180,
        order: 5
      },
      {
        title: "3D Visualization & Planning",
        description: "Photorealistic 3D renders and virtual walkthroughs of your space before a single nail is hammered. See your dream home before it's built.",
        startingPrice: 0,
        order: 6
      }
    ];

    const team = [
      {
        name: "Mr. Ravindra Sharma",
        role: "Co-Founder & Director",
        department: "Leadership",
        bio: "20+ years of expertise in luxury residential and commercial interior design. Alumnus of National Institute of Design, Ahmedabad.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=500",
        order: 1
      },
      {
        name: "Mr. Upendra Sharma",
        role: "Co-Founder & Director",
        department: "Leadership",
        bio: "Expert in project management and client relations. Has personally overseen 200+ projects across Delhi NCR.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500",
        order: 2
      },
      {
        name: "Priya Kapoor",
        role: "Senior Interior Designer",
        department: "Design Team",
        bio: "Specializes in contemporary and Scandinavian styles. 7 years experience. IID certified designer.",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=500",
        order: 3
      }
    ];

    const blogs = [
      {
        title: "10 Interior Design Trends Dominating Delhi Homes in 2025",
        category: "Trends",
        readTime: 8,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        thumbnail: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000",
        author: "Townwood Editorial"
      },
      {
        title: "How to Choose the Perfect Modular Kitchen for Your Home",
        category: "Kitchen",
        readTime: 6,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        thumbnail: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&q=80&w=1000",
        author: "Townwood Editorial"
      }
    ];

    const testimonials = [
      {
        clientName: "Priya Mehta",
        location: "Noida",
        rating: 5,
        text: "Townwood transformed our 3BHK into a magazine-worthy home. The attention to detail was extraordinary."
      },
      {
        clientName: "Rajesh Kumar",
        location: "Delhi",
        rating: 5,
        text: "Completed our office interior 2 weeks ahead of schedule. Truly professional team."
      },
      {
        clientName: "Anita Singh",
        location: "Gurgaon",
        rating: 5,
        text: "The modular kitchen they designed has become the heart of our home. Absolutely stunning."
      }
    ];

    await Project.insertMany(projects);
    await Service.insertMany(services);
    await TeamMember.insertMany(team);
    await BlogPost.insertMany(blogs);
    await Testimonial.insertMany(testimonials);
    await User.create(adminUser);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

importData();
