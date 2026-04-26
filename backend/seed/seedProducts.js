import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

// Replace this with a real user ID from your DB
const sellerId = "65f1c2a9b1234567890abcde";

const products = [
  // VEGETABLES (10 items)
  { name: "Fresh Tomatoes", description: "Organic farm fresh tomatoes", price: 50, category: "Vegetables", image: "https://via.placeholder.com/150", stock: 100, seller: sellerId },
  { name: "Potatoes", description: "Locally grown potatoes", price: 40, category: "Vegetables", image: "https://via.placeholder.com/150", stock: 200, seller: sellerId },
  { name: "Onions", description: "Red onions, freshly harvested", price: 45, category: "Vegetables", image: "https://via.placeholder.com/150", stock: 150, seller: sellerId },
  { name: "Carrots", description: "Sweet and crunchy carrots", price: 60, category: "Vegetables", image: "https://via.placeholder.com/150", stock: 120, seller: sellerId },
  { name: "Broccoli", description: "Fresh green broccoli", price: 80, category: "Vegetables", image: "https://via.placeholder.com/150", stock: 75, seller: sellerId },
  { name: "Cucumber", description: "Cool and crisp cucumbers", price: 35, category: "Vegetables", image: "https://via.placeholder.com/150", stock: 90, seller: sellerId },
  { name: "Bell Peppers", description: "Mixed color bell peppers", price: 90, category: "Vegetables", image: "https://via.placeholder.com/150", stock: 60, seller: sellerId },
  { name: "Cauliflower", description: "Fresh white cauliflower", price: 55, category: "Vegetables", image: "https://via.placeholder.com/150", stock: 85, seller: sellerId },
  { name: "Spinach", description: "Organic spinach leaves", price: 40, category: "Vegetables", image: "https://via.placeholder.com/150", stock: 110, seller: sellerId },
  { name: "Eggplant", description: "Purple brinjal/eggplant", price: 70, category: "Vegetables", image: "https://via.placeholder.com/150", stock: 95, seller: sellerId },

  // FRUITS (10 items)
  { name: "Apples", description: "Fresh red apples", price: 120, category: "Fruits", image: "https://via.placeholder.com/150", stock: 150, seller: sellerId },
  { name: "Bananas", description: "Sweet ripe bananas", price: 40, category: "Fruits", image: "https://via.placeholder.com/150", stock: 200, seller: sellerId },
  { name: "Oranges", description: "Juicy oranges", price: 90, category: "Fruits", image: "https://via.placeholder.com/150", stock: 130, seller: sellerId },
  { name: "Grapes", description: "Seedless green grapes", price: 110, category: "Fruits", image: "https://via.placeholder.com/150", stock: 80, seller: sellerId },
  { name: "Strawberries", description: "Fresh sweet strawberries", price: 150, category: "Fruits", image: "https://via.placeholder.com/150", stock: 60, seller: sellerId },
  { name: "Mangoes", description: "Alphonso mangoes", price: 200, category: "Fruits", image: "https://via.placeholder.com/150", stock: 50, seller: sellerId },
  { name: "Watermelon", description: "Sweet and refreshing", price: 80, category: "Fruits", image: "https://via.placeholder.com/150", stock: 40, seller: sellerId },
  { name: "Pineapple", description: "Ripe golden pineapple", price: 100, category: "Fruits", image: "https://via.placeholder.com/150", stock: 70, seller: sellerId },
  { name: "Pomegranate", description: "Ruby red seeds", price: 130, category: "Fruits", image: "https://via.placeholder.com/150", stock: 65, seller: sellerId },
  { name: "Kiwi", description: "Vitamin C rich kiwis", price: 160, category: "Fruits", image: "https://via.placeholder.com/150", stock: 55, seller: sellerId },

  // GRAINS & PULSES (10 items)
  { name: "Basmati Rice", description: "Premium long grain rice", price: 180, category: "Grains", image: "https://via.placeholder.com/150", stock: 100, seller: sellerId },
  { name: "Brown Rice", description: "Healthy whole grain rice", price: 140, category: "Grains", image: "https://via.placeholder.com/150", stock: 90, seller: sellerId },
  { name: "Wheat Flour", description: "Whole wheat atta", price: 60, category: "Grains", image: "https://via.placeholder.com/150", stock: 200, seller: sellerId },
  { name: "Toor Dal", description: "Split pigeon pea lentils", price: 120, category: "Pulses", image: "https://via.placeholder.com/150", stock: 150, seller: sellerId },
  { name: "Masoor Dal", description: "Red lentils", price: 110, category: "Pulses", image: "https://via.placeholder.com/150", stock: 140, seller: sellerId },
  { name: "Chana Dal", description: "Split chickpeas", price: 100, category: "Pulses", image: "https://via.placeholder.com/150", stock: 130, seller: sellerId },
  { name: "Moong Dal", description: "Yellow split gram", price: 130, category: "Pulses", image: "https://via.placeholder.com/150", stock: 120, seller: sellerId },
  { name: "Oats", description: "Rolled oats for breakfast", price: 90, category: "Grains", image: "https://via.placeholder.com/150", stock: 160, seller: sellerId },
  { name: "Quinoa", description: "Protein-rich quinoa", price: 250, category: "Grains", image: "https://via.placeholder.com/150", stock: 70, seller: sellerId },
  { name: "Corn", description: "Sweet corn kernels", price: 60, category: "Grains", image: "https://via.placeholder.com/150", stock: 110, seller: sellerId },

  // DAIRY & EGGS (8 items)
  { name: "Cow Milk", description: "Fresh dairy milk", price: 60, category: "Dairy", image: "https://via.placeholder.com/150", stock: 100, seller: sellerId },
  { name: "Curd", description: "Probiotic rich curd", price: 45, category: "Dairy", image: "https://via.placeholder.com/150", stock: 80, seller: sellerId },
  { name: "Paneer", description: "Fresh cottage cheese", price: 200, category: "Dairy", image: "https://via.placeholder.com/150", stock: 60, seller: sellerId },
  { name: "Butter", description: "Salted butter", price: 70, category: "Dairy", image: "https://via.placeholder.com/150", stock: 90, seller: sellerId },
  { name: "Cheese", description: "Processed cheese slices", price: 150, category: "Dairy", image: "https://via.placeholder.com/150", stock: 85, seller: sellerId },
  { name: "Eggs", description: "Farm fresh eggs (dozen)", price: 80, category: "Eggs", image: "https://via.placeholder.com/150", stock: 200, seller: sellerId },
  { name: "Ghee", description: "Pure cow ghee", price: 500, category: "Dairy", image: "https://via.placeholder.com/150", stock: 40, seller: sellerId },
  { name: "Yogurt", description: "Greek yogurt", price: 120, category: "Dairy", image: "https://via.placeholder.com/150", stock: 70, seller: sellerId },

  // SPICES & CONDIMENTS (7 items)
  { name: "Turmeric Powder", description: "Pure turmeric powder", price: 80, category: "Spices", image: "https://via.placeholder.com/150", stock: 150, seller: sellerId },
  { name: "Red Chili Powder", description: "Spicy chili powder", price: 100, category: "Spices", image: "https://via.placeholder.com/150", stock: 140, seller: sellerId },
  { name: "Cumin Seeds", description: "Whole cumin seeds", price: 90, category: "Spices", image: "https://via.placeholder.com/150", stock: 130, seller: sellerId },
  { name: "Coriander Powder", description: "Ground coriander", price: 70, category: "Spices", image: "https://via.placeholder.com/150", stock: 145, seller: sellerId },
  { name: "Garam Masala", description: "Aromatic spice blend", price: 120, category: "Spices", image: "https://via.placeholder.com/150", stock: 110, seller: sellerId },
  { name: "Salt", description: "Iodized table salt", price: 20, category: "Condiments", image: "https://via.placeholder.com/150", stock: 300, seller: sellerId },
  { name: "Honey", description: "Organic pure honey", price: 250, category: "Condiments", image: "https://via.placeholder.com/150", stock: 60, seller: sellerId },

  // BEVERAGES (5 items)
  { name: "Green Tea", description: "Premium green tea leaves", price: 180, category: "Beverages", image: "https://via.placeholder.com/150", stock: 100, seller: sellerId },
  { name: "Coffee Beans", description: "Arabica coffee beans", price: 350, category: "Beverages", image: "https://via.placeholder.com/150", stock: 50, seller: sellerId },
  { name: "Coconut Water", description: "Fresh tender coconut water", price: 60, category: "Beverages", image: "https://via.placeholder.com/150", stock: 80, seller: sellerId },
  { name: "Fruit Juice", description: "Mixed fruit juice", price: 90, category: "Beverages", image: "https://via.placeholder.com/150", stock: 120, seller: sellerId },
  { name: "Protein Powder", description: "Whey protein powder", price: 1200, category: "Beverages", image: "https://via.placeholder.com/150", stock: 30, seller: sellerId },

  // SNACKS (5 items)
  { name: "Potato Chips", description: "Salted potato chips", price: 30, category: "Snacks", image: "https://via.placeholder.com/150", stock: 200, seller: sellerId },
  { name: "Biscuits", description: "Butter cookies", price: 25, category: "Snacks", image: "https://via.placeholder.com/150", stock: 180, seller: sellerId },
  { name: "Namkeen", description: "Spicy mixed namkeen", price: 50, category: "Snacks", image: "https://via.placeholder.com/150", stock: 150, seller: sellerId },
  { name: "Peanut Butter", description: "Creamy peanut butter", price: 220, category: "Snacks", image: "https://via.placeholder.com/150", stock: 70, seller: sellerId },
  { name: "Popcorn", description: "Microwave popcorn", price: 80, category: "Snacks", image: "https://via.placeholder.com/150", stock: 100, seller: sellerId }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Product.deleteMany();
    console.log("Old products removed");

    const inserted = await Product.insertMany(products);
    console.log(`${inserted.length} products seeded successfully`);
    console.log("Categories available:", [...new Set(products.map(p => p.category))]);

    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seedDB();