import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

// Replace this with a real admin/kishan user ID from your DB after registering
const sellerId = "65f1c2a9b1234567890abcde";

const products = [

  // ── VEGETABLES (10) ──────────────────────────────────────────────────────
  {
    name: "Fresh Tomatoes",
    description: "Organically grown tomatoes freshly harvested from Bhaktapur farms. No pesticides used. Best for cooking, salads, and chutneys. Rich in Vitamin C and antioxidants.",
    price: 60,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=500&q=80",
    stock: 100,
    unit: "kg",
    location: "Bhaktapur",
    seller: sellerId
  },
  {
    name: "Potatoes",
    description: "Locally grown white potatoes from Dhading. Perfect for curries, fries, and everyday cooking. Freshly dug and cleaned.",
    price: 40,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1518977676405-7d43e3f4b0b0?w=500&q=80",
    stock: 200,
    unit: "kg",
    location: "Dhading",
    seller: sellerId
  },
  {
    name: "Red Onions",
    description: "Fresh red onions harvested from Bara district. Strong flavor, perfect for all Nepali cooking. Stored in dry conditions.",
    price: 45,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&q=80",
    stock: 150,
    unit: "kg",
    location: "Bara",
    seller: sellerId
  },
  {
    name: "Carrots",
    description: "Sweet and crunchy carrots from Kavre farms. Rich in beta carotene and fiber. Great for juices and curries.",
    price: 60,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&q=80",
    stock: 120,
    unit: "kg",
    location: "Kavre",
    seller: sellerId
  },
  {
    name: "Broccoli",
    description: "Farm fresh green broccoli from Lalitpur. Packed with nutrients. Delivered within 24 hours of harvest.",
    price: 80,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500&q=80",
    stock: 75,
    unit: "kg",
    location: "Lalitpur",
    seller: sellerId
  },
  {
    name: "Cucumber",
    description: "Cool and crisp cucumbers from Chitwan. Perfect for salads and raita. Grown without harmful chemicals.",
    price: 35,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1568584711271-6c929fb49b60?w=500&q=80",
    stock: 90,
    unit: "kg",
    location: "Chitwan",
    seller: sellerId
  },
  {
    name: "Cauliflower",
    description: "Fresh white cauliflower heads from Nuwakot. Great for aloo gobi, soup, and stir fry.",
    price: 55,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1510627489301-51d605a32be1?w=500&q=80",
    stock: 85,
    unit: "kg",
    location: "Nuwakot",
    seller: sellerId
  },
  {
    name: "Spinach",
    description: "Organic spinach leaves from Kathmandu valley farms. Rich in iron and calcium. Best consumed fresh.",
    price: 40,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&q=80",
    stock: 110,
    unit: "kg",
    location: "Kathmandu",
    seller: sellerId
  },
  {
    name: "Eggplant",
    description: "Purple brinjal freshly picked from Rupandehi farms. Ideal for curries and roasting.",
    price: 50,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=500&q=80",
    stock: 95,
    unit: "kg",
    location: "Rupandehi",
    seller: sellerId
  },
  {
    name: "Green Peas",
    description: "Sweet and tender green peas from Mustang. Perfect for pulao, curries, and snacking.",
    price: 70,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=500&q=80",
    stock: 80,
    unit: "kg",
    location: "Mustang",
    seller: sellerId
  },

  // ── FRUITS (10) ──────────────────────────────────────────────────────────
  {
    name: "Red Apples",
    description: "Fresh Jumla red apples — Nepal's finest. Naturally sweet, hand picked from high altitude orchards. No wax coating.",
    price: 200,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=500&q=80",
    stock: 150,
    unit: "kg",
    location: "Jumla",
    seller: sellerId
  },
  {
    name: "Bananas",
    description: "Sweet ripe bananas from Chitwan. Naturally ripened, no artificial ethylene used.",
    price: 40,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=500&q=80",
    stock: 200,
    unit: "dozen",
    location: "Chitwan",
    seller: sellerId
  },
  {
    name: "Oranges",
    description: "Juicy Dhankuta oranges — famous across Nepal. Rich in Vitamin C. Harvested December to February.",
    price: 90,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=500&q=80",
    stock: 130,
    unit: "kg",
    location: "Dhankuta",
    seller: sellerId
  },
  {
    name: "Mangoes",
    description: "Sweet Maldaha mangoes from Sindhuli. Naturally ripened on the tree. Available June to August.",
    price: 180,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&q=80",
    stock: 50,
    unit: "kg",
    location: "Sindhuli",
    seller: sellerId
  },
  {
    name: "Watermelon",
    description: "Large sweet watermelons from Bardiya. Refreshing summer fruit. Seedless variety available.",
    price: 35,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1568584711271-6c929fb49b60?w=500&q=80",
    stock: 40,
    unit: "piece",
    location: "Bardiya",
    seller: sellerId
  },
  {
    name: "Grapes",
    description: "Seedless green grapes from Mustang. Sweet and firm. Perfect for snacking and juicing.",
    price: 250,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=500&q=80",
    stock: 80,
    unit: "kg",
    location: "Mustang",
    seller: sellerId
  },
  {
    name: "Strawberries",
    description: "Fresh sweet strawberries from Nuwakot hill farms. Bright red and full of flavor. Limited seasonal stock.",
    price: 300,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&q=80",
    stock: 60,
    unit: "kg",
    location: "Nuwakot",
    seller: sellerId
  },
  {
    name: "Pineapple",
    description: "Ripe golden pineapples from Ilam. Sweet and tangy. Freshly cut available on request.",
    price: 120,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1490885578174-acda8905c2c6?w=500&q=80",
    stock: 70,
    unit: "piece",
    location: "Ilam",
    seller: sellerId
  },
  {
    name: "Pomegranate",
    description: "Ruby red pomegranates from Dang valley. Rich in antioxidants. Each fruit packed with juicy seeds.",
    price: 180,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&q=80",
    stock: 65,
    unit: "piece",
    location: "Dang",
    seller: sellerId
  },
  {
    name: "Kiwi",
    description: "Vitamin C rich kiwis imported via Tatopani. Soft and sweet when ripe. Store at room temperature.",
    price: 300,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1585059895524-72359e06133a?w=500&q=80",
    stock: 55,
    unit: "kg",
    location: "Kathmandu",
    seller: sellerId
  },

  // ── GRAINS (8) ───────────────────────────────────────────────────────────
  {
    name: "Basmati Rice",
    description: "Premium long grain basmati rice from Chitwan. Aged for 1 year for perfect aroma and texture. Stone free and cleaned.",
    price: 180,
    category: "Grains",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80",
    stock: 100,
    unit: "kg",
    location: "Chitwan",
    seller: sellerId
  },
  {
    name: "Wheat Flour",
    description: "Whole wheat atta stone ground from local wheat. No bleaching or additives. Best for roti and bread.",
    price: 55,
    category: "Grains",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80",
    stock: 200,
    unit: "kg",
    location: "Nawalpur",
    seller: sellerId
  },
  {
    name: "Maize Corn",
    description: "Yellow maize from Palpa farms. Ground into flour or used whole. Staple grain of hill communities.",
    price: 45,
    category: "Grains",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500&q=80",
    stock: 150,
    unit: "kg",
    location: "Palpa",
    seller: sellerId
  },
  {
    name: "Black Lentils",
    description: "Whole black urad dal from Rupandehi. Perfect for dal makhani. High in protein and iron.",
    price: 130,
    category: "Grains",
    image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=500&q=80",
    stock: 120,
    unit: "kg",
    location: "Rupandehi",
    seller: sellerId
  },
  {
    name: "Red Lentils",
    description: "Split masoor dal from Bara. Quick cooking and nutritious. Staple of every Nepali dal bhat.",
    price: 110,
    category: "Grains",
    image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=500&q=80",
    stock: 140,
    unit: "kg",
    location: "Bara",
    seller: sellerId
  },
  {
    name: "Buckwheat",
    description: "Locally grown Fapar (buckwheat) from Dolpa. Used for traditional Nepali roti. Gluten free grain.",
    price: 160,
    category: "Grains",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80",
    stock: 80,
    unit: "kg",
    location: "Dolpa",
    seller: sellerId
  },
  {
    name: "Millet",
    description: "Kodo millet from Sindhupalchok. Traditional Nepali grain used for jaand and roti. High nutrition.",
    price: 90,
    category: "Grains",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80",
    stock: 110,
    unit: "kg",
    location: "Sindhupalchok",
    seller: sellerId
  },
  {
    name: "Chickpeas",
    description: "Whole white chana from Nawalpur. High protein legume. Perfect for curries, salads, and snacks.",
    price: 120,
    category: "Grains",
    image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=500&q=80",
    stock: 130,
    unit: "kg",
    location: "Nawalpur",
    seller: sellerId
  },

  // ── DAIRY (6) ────────────────────────────────────────────────────────────
  {
    name: "Fresh Cow Milk",
    description: "Pure fresh cow milk from Kirtipur dairy farms. Pasteurized and packed hygienically. Delivered daily.",
    price: 70,
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80",
    stock: 100,
    unit: "litre",
    location: "Kirtipur",
    seller: sellerId
  },
  {
    name: "Homemade Curd",
    description: "Thick probiotic rich curd set overnight. Made from full fat cow milk. Best with rice and roti.",
    price: 80,
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&q=80",
    stock: 80,
    unit: "kg",
    location: "Bhaktapur",
    seller: sellerId
  },
  {
    name: "Fresh Paneer",
    description: "Soft homemade cottage cheese from Lalitpur. Made fresh daily from pure cow milk. Best for curries.",
    price: 400,
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80",
    stock: 60,
    unit: "kg",
    location: "Lalitpur",
    seller: sellerId
  },
  {
    name: "Pure Ghee",
    description: "Traditional hand churned pure cow ghee from Sindhupalchok. Made using Bilona method. Rich golden color.",
    price: 1200,
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80",
    stock: 40,
    unit: "kg",
    location: "Sindhupalchok",
    seller: sellerId
  },
  {
    name: "Farm Eggs",
    description: "Free range desi chicken eggs from Kavrepalanchok. Brown shell, rich orange yolk. No hormones used.",
    price: 180,
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&q=80",
    stock: 200,
    unit: "dozen",
    location: "Kavrepalanchok",
    seller: sellerId
  },
  {
    name: "Butter",
    description: "Creamy salted butter churned from fresh cream. Made in small batches from Chitwan dairy.",
    price: 600,
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&q=80",
    stock: 50,
    unit: "kg",
    location: "Chitwan",
    seller: sellerId
  },

  // ── SEEDS (5) ────────────────────────────────────────────────────────────
  {
    name: "Mustard Seeds",
    description: "Black mustard seeds from Bara. Used for tarkari tempering and making mustard oil. Naturally dried.",
    price: 120,
    category: "Seeds",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=500&q=80",
    stock: 100,
    unit: "kg",
    location: "Bara",
    seller: sellerId
  },
  {
    name: "Sesame Seeds",
    description: "White til (sesame) from Kapilvastu. Used in til ko laddu and cooking. High in calcium.",
    price: 200,
    category: "Seeds",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=500&q=80",
    stock: 80,
    unit: "kg",
    location: "Kapilvastu",
    seller: sellerId
  },
  {
    name: "Sunflower Seeds",
    description: "Raw sunflower seeds from Kailali. Great for snacking and oil extraction. High in Vitamin E.",
    price: 180,
    category: "Seeds",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=500&q=80",
    stock: 90,
    unit: "kg",
    location: "Kailali",
    seller: sellerId
  },
  {
    name: "Fenugreek Seeds",
    description: "Methi seeds from Nawalparasi. Used in tempering and as spice. Known for health benefits.",
    price: 100,
    category: "Seeds",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=500&q=80",
    stock: 120,
    unit: "kg",
    location: "Nawalparasi",
    seller: sellerId
  },
  {
    name: "Pumpkin Seeds",
    description: "Raw pumpkin seeds from Surkhet. Nutritious and crunchy. Great roasted with salt.",
    price: 350,
    category: "Seeds",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=500&q=80",
    stock: 60,
    unit: "kg",
    location: "Surkhet",
    seller: sellerId
  },

  // ── SPICES (6) ───────────────────────────────────────────────────────────
  {
    name: "Turmeric Powder",
    description: "Pure haldi powder stone ground from Terai farms. Deep yellow color, strong flavor. No artificial color.",
    price: 200,
    category: "Spices",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=500&q=80",
    stock: 150,
    unit: "kg",
    location: "Saptari",
    seller: sellerId
  },
  {
    name: "Red Chili Powder",
    description: "Fiery red chili powder from Palpa. Sun dried and stone ground. Gives deep red color to dishes.",
    price: 280,
    category: "Spices",
    image: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=500&q=80",
    stock: 140,
    unit: "kg",
    location: "Palpa",
    seller: sellerId
  },
  {
    name: "Cumin Seeds",
    description: "Whole jeera from Mustang. Strong aroma, earthy flavor. Essential spice for every Nepali kitchen.",
    price: 400,
    category: "Spices",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=500&q=80",
    stock: 130,
    unit: "kg",
    location: "Mustang",
    seller: sellerId
  },
  {
    name: "Timur (Szechuan Pepper)",
    description: "Authentic Nepali Timur from Rolpa forests. Unique numbing citrusy flavor. Key ingredient in many Nepali dishes.",
    price: 800,
    category: "Spices",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=500&q=80",
    stock: 50,
    unit: "kg",
    location: "Rolpa",
    seller: sellerId
  },
  {
    name: "Cardamom",
    description: "Green elaichi from Ilam — Nepal's pride. World class quality. Used in tea, sweets, and biryani.",
    price: 3000,
    category: "Spices",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=500&q=80",
    stock: 30,
    unit: "kg",
    location: "Ilam",
    seller: sellerId
  },
  {
    name: "Pure Honey",
    description: "Raw unprocessed wild honey from Lamjung cliffs. Harvested by traditional Gurung honey hunters. No additives.",
    price: 1500,
    category: "Spices",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&q=80",
    stock: 40,
    unit: "kg",
    location: "Lamjung",
    seller: sellerId
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Product.deleteMany();
    console.log("Old products removed");

    const inserted = await Product.insertMany(products);
    console.log(`${inserted.length} products seeded successfully`);
    console.log("Categories:", [...new Set(products.map(p => p.category))]);

    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seedDB();