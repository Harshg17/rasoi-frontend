// src/data/courses.js

export const courseCatalog = {
  Baking: [
    {
      id: "cake-baking-frosting", // Using string IDs (slugs) makes for pretty URLs!
      title: "Cake Baking & Frosting",
      hasTiers: true,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
      description: "Master the art of baking the perfect sponge and decorating it like a professional.",
      basic: { price: "₹2,500", items: ["Vanilla Sponge", "Chocolate Sponge", "Basic Buttercream", "Nozzle Piping Basics"] },
      advanced: { price: "₹4,500", items: ["Fondant Basics", "Tiered Cake Assembly", "Truffle Glaze", "Sugar Flowers"] }
    },
    {
      id: "artisan-breads",
      title: "Artisan Breads",
      hasTiers: false,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
      description: "Learn the science of yeast and sourdough to bake bakery-quality breads at home.",
      basic: { price: "₹1,800", items: ["Sourdough Starter", "Focaccia", "Garlic Knots", "Whole Wheat Loaf"] }
    }
  ],
  Cooking: [
    {
      id: "north-indian-masterclass",
      title: "North Indian Masterclass",
      hasTiers: true,
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
      description: "Bring the authentic dhaba and restaurant style flavors into your own kitchen.",
      basic: { price: "₹3,000", items: ["Dal Makhani", "Paneer Butter Masala", "Butter Naan", "Jeera Rice"] },
      advanced: { price: "₹5,500", items: ["Dum Biryani", "Mutton Rogan Josh", "Stuffed Kulcha", "Advanced Plating"] }
    }
  ],
  Workshops: [
    {
      id: "pizza-workshop",
      title: "One-Day Pizza Workshop",
      hasTiers: false,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      description: "A fun, fast-paced workshop dedicated entirely to perfecting the pizza pie.",
      basic: { price: "₹999", items: ["Dough from scratch", "Classic Margherita", "Stuffed Crust", "Garlic Bread"] }
    }
  ]
};

// Helper function to simulate a database query: "Find course by ID"
export const getCourseById = (courseId) => {
  for (const category in courseCatalog) {
    const foundCourse = courseCatalog[category].find(course => course.id === courseId);
    if (foundCourse) return foundCourse;
  }
  return null; // Return null if the URL doesn't match any course
};