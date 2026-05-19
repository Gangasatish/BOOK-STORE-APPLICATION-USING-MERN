import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import Book from "./models/Book.js";

const seedBooks = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-help",
    price: 399,
    stock: 20,
    featured: true,
    pages: 320,
    language: "English",
    publisher: "Avery",
    publishedYear: 2018,
    isbn: "9780735211292",
    description:
      "A practical framework for improving every day.\n\nInstead of chasing big goals, this book focuses on tiny systems that compound over time.",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "Thriller",
    price: 349,
    stock: 14,
    featured: true,
    pages: 336,
    language: "English",
    publisher: "Celadon Books",
    publishedYear: 2019,
    isbn: "9781250301697",
    description:
      "A twisted psychological mystery around a woman who stops speaking after a violent crime.\n\nA therapist becomes obsessed with uncovering the truth.",
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Productivity",
    price: 429,
    stock: 8,
    pages: 304,
    language: "English",
    publisher: "Grand Central Publishing",
    publishedYear: 2016,
    isbn: "9781455586691",
    description:
      "Rules for focused success in a distracted world.\n\nCal Newport explains why depth is becoming rare and more valuable.",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "Science Fiction",
    price: 499,
    stock: 11,
    featured: true,
    pages: 496,
    language: "English",
    publisher: "Ballantine Books",
    publishedYear: 2021,
    isbn: "9780593135204",
    description:
      "A lone astronaut wakes with no memory and one mission: save Earth.\n\nA fun, science-heavy survival story with humor and heart.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "History",
    price: 459,
    stock: 16,
    pages: 464,
    language: "English",
    publisher: "Harper",
    publishedYear: 2015,
    isbn: "9780062316097",
    description:
      "A sweeping narrative of human history from ancient hunter-gatherers to modern societies.\n\nIt connects biology, culture, and economics in a clear voice.",
    image:
      "https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fiction",
    price: 379,
    stock: 13,
    pages: 304,
    language: "English",
    publisher: "Viking",
    publishedYear: 2020,
    isbn: "9780525559474",
    description:
      "Between life and death, a library lets Nora try alternate versions of her life.\n\nA reflective novel on regret, hope, and second chances.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    genre: "Finance",
    price: 389,
    stock: 22,
    featured: true,
    pages: 256,
    language: "English",
    publisher: "Harriman House",
    publishedYear: 2020,
    isbn: "9780857197689",
    description:
      "Timeless lessons about wealth, greed, and happiness.\n\nGreat for understanding behavior behind financial decisions.",
    image:
      "https://images.unsplash.com/photo-1455885666463-9a5b48b17a16?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Educated",
    author: "Tara Westover",
    genre: "Memoir",
    price: 369,
    stock: 9,
    pages: 352,
    language: "English",
    publisher: "Random House",
    publishedYear: 2018,
    isbn: "9780399590504",
    description:
      "A memoir about growing up off the grid and finding education later in life.\n\nA powerful story of self-invention and resilience.",
    image:
      "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    price: 339,
    stock: 19,
    pages: 688,
    language: "English",
    publisher: "Ace",
    publishedYear: 1965,
    isbn: "9780441013593",
    description:
      "Politics, prophecy, and survival on the desert planet Arrakis.\n\nOne of the foundational epics of modern science fiction.",
    image:
      "https://images.unsplash.com/photo-1473755504818-b72b6dfdc226?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    price: 319,
    stock: 24,
    pages: 208,
    language: "English",
    publisher: "HarperOne",
    publishedYear: 1993,
    isbn: "9780062315007",
    description:
      "A shepherd travels in search of treasure and discovers purpose.\n\nSimple language with strong symbolic themes.",
    image:
      "https://images.unsplash.com/photo-1516146544193-b54a65682f16?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    genre: "Psychology",
    price: 469,
    stock: 12,
    pages: 512,
    language: "English",
    publisher: "Farrar, Straus and Giroux",
    publishedYear: 2011,
    isbn: "9780374533557",
    description:
      "A landmark exploration of two systems that drive how we think and decide.\n\nIt explains common cognitive biases with everyday examples.",
    image:
      "https://images.unsplash.com/photo-1468273519810-d3fe4c125cdb?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Classic",
    price: 329,
    stock: 17,
    pages: 328,
    language: "English",
    publisher: "Signet Classic",
    publishedYear: 1949,
    isbn: "9780451524935",
    description:
      "A dystopian novel about surveillance, censorship, and truth control.\n\nIts warnings remain relevant in the digital age.",
    image:
      "https://images.unsplash.com/photo-1483546416237-76fd26bbcdd1?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "The Martian",
    author: "Andy Weir",
    genre: "Science Fiction",
    price: 359,
    stock: 10,
    pages: 384,
    language: "English",
    publisher: "Crown",
    publishedYear: 2014,
    isbn: "9780804139021",
    description:
      "An astronaut is stranded on Mars and has to science his way home.\n\nHigh-stakes survival with witty narration.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    genre: "Technology",
    price: 489,
    stock: 7,
    featured: true,
    pages: 352,
    language: "English",
    publisher: "Addison-Wesley",
    publishedYear: 2019,
    isbn: "9780135957059",
    description:
      "Practical engineering habits for writing maintainable software.\n\nCovers craftsmanship, communication, and long-term thinking.",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    genre: "Business",
    price: 409,
    stock: 15,
    pages: 224,
    language: "English",
    publisher: "Currency",
    publishedYear: 2014,
    isbn: "9780804139298",
    description:
      "Notes on startups and building truly new products.\n\nChallenges conventional advice around competition and innovation.",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    price: 499,
    stock: 25,
    featured: true,
    pages: 309,
    language: "English",
    publisher: "Scholastic",
    publishedYear: 1997,
    isbn: "9780590353427",
    description: "A young boy discovers he is a wizard and attends a magical school.\n\nThe start of an epic journey.",
    image: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    price: 799,
    stock: 12,
    pages: 1178,
    language: "English",
    publisher: "Allen & Unwin",
    publishedYear: 1954,
    isbn: "9780544003415",
    description: "An epic high fantasy novel about a quest to destroy a powerful ring.\n\nA journey across Middle-earth.",
    image: "https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic",
    price: 349,
    stock: 18,
    pages: 281,
    language: "English",
    publisher: "J.B. Lippincott & Co.",
    publishedYear: 1960,
    isbn: "9780060935467",
    description: "A novel about the serious issues of rape and racial inequality.\n\nTold from the perspective of a child in the South.",
    image: "https://images.unsplash.com/photo-1587876931567-564ce588bfbd?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    price: 299,
    stock: 20,
    pages: 208,
    language: "English",
    publisher: "Charles Scribner's Sons",
    publishedYear: 1925,
    isbn: "9780743273565",
    description: "A tragic story of Jay Gatsby and his pursuit of Daisy Buchanan.\n\nA critique of the American Dream.",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    price: 250,
    stock: 15,
    pages: 432,
    language: "English",
    publisher: "T. Egerton",
    publishedYear: 1813,
    isbn: "9781503290563",
    description: "A romantic novel of manners.\n\nFollows the character development of Elizabeth Bennet.",
    image: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    price: 399,
    stock: 22,
    pages: 310,
    language: "English",
    publisher: "George Allen & Unwin",
    publishedYear: 1937,
    isbn: "9780547928227",
    description: "A children's fantasy novel about the quest of home-loving Bilbo Baggins.\n\nHe wins a share of the treasure guarded by a dragon.",
    image: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Classic",
    price: 279,
    stock: 30,
    pages: 234,
    language: "English",
    publisher: "Little, Brown and Company",
    publishedYear: 1951,
    isbn: "9780316769174",
    description: "A novel about teenage angst and alienation.\n\nThe protagonist Holden Caulfield has become an icon for teenage rebellion.",
    image: "https://images.unsplash.com/photo-1544822688-c5f41fa4bc8c?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "The Hunger Games",
    author: "Suzanne Collins",
    genre: "Young Adult",
    price: 450,
    stock: 14,
    featured: true,
    pages: 374,
    language: "English",
    publisher: "Scholastic",
    publishedYear: 2008,
    isbn: "9780439023481",
    description: "A dystopian novel where children are forced to participate in a televised death match.\n\nA thrilling story of survival.",
    image: "https://images.unsplash.com/photo-1502220802046-dfb0cd330d8c?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Science Fiction",
    price: 350,
    stock: 19,
    pages: 311,
    language: "English",
    publisher: "Chatto & Windus",
    publishedYear: 1932,
    isbn: "9780060850524",
    description: "A dystopian social science fiction novel.\n\nExamines a futuristic society that revolves around science and efficiency.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    genre: "Science Fiction",
    price: 320,
    stock: 21,
    pages: 249,
    language: "English",
    publisher: "Ballantine Books",
    publishedYear: 1953,
    isbn: "9781451673319",
    description: "A dystopian novel presenting a future American society where books are outlawed.\n\nFiremen burn any that are found.",
    image: "https://images.unsplash.com/photo-1542315053-5d55e0947738?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    genre: "Thriller",
    price: 399,
    stock: 16,
    pages: 489,
    language: "English",
    publisher: "Doubleday",
    publishedYear: 2003,
    isbn: "9780307474278",
    description: "A mystery thriller novel.\n\nFollows symbologist Robert Langdon and cryptologist Sophie Neveu.",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    genre: "Thriller",
    price: 410,
    stock: 11,
    pages: 465,
    language: "English",
    publisher: "Norstedts Förlag",
    publishedYear: 2005,
    isbn: "9780307454546",
    description: "A psychological thriller novel.\n\nInvolves a disgraced journalist and a tattooed computer hacker.",
    image: "https://images.unsplash.com/photo-1507676184212-d0330a151f14?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Gone Girl",
    author: "Gillian Flynn",
    genre: "Thriller",
    price: 380,
    stock: 13,
    pages: 432,
    language: "English",
    publisher: "Crown Publishing Group",
    publishedYear: 2012,
    isbn: "9780307588364",
    description: "A thriller novel exploring a marriage gone terribly wrong.\n\nFull of twists and unreliable narration.",
    image: "https://images.unsplash.com/photo-1518331393661-344421b8c1ec?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "The Fault in Our Stars",
    author: "John Green",
    genre: "Young Adult",
    price: 310,
    stock: 17,
    pages: 313,
    language: "English",
    publisher: "Dutton Books",
    publishedYear: 2012,
    isbn: "9780525478812",
    description: "A young adult novel about two teenagers who meet in a cancer support group.\n\nA touching and emotional story.",
    image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Good Omens",
    author: "Terry Pratchett & Neil Gaiman",
    genre: "Fantasy",
    price: 430,
    stock: 9,
    pages: 412,
    language: "English",
    publisher: "Victor Gollancz",
    publishedYear: 1990,
    isbn: "9780060853983",
    description: "A comedy about the birth of the son of Satan and the coming of the End Times.\n\nAn angel and a demon try to sabotage it.",
    image: "https://images.unsplash.com/photo-1505664177922-921d7b1a20ce?auto=format&fit=crop&w=900&q=80"
  }
];

const run = async () => {
  await connectDB(process.env.MONGO_URI || process.env.MONGODB_URL || process.env.MONGODB_URI);

  await Book.deleteMany({});
  await Book.insertMany(seedBooks);

  const adminEmail = "admin@leafline.dev";
  const existingAdmin = await User.findOne({ email: adminEmail });

  if (!existingAdmin) {
    const password = await bcrypt.hash("admin123", 10);
    await User.create({
      name: "Store Admin",
      email: adminEmail,
      password,
      role: "admin"
    });
  }

  console.log("Seed completed with 30 books. Admin: admin@leafline.dev / admin123");
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
