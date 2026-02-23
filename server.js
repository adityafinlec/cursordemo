const path = require('path');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// Database setup
const DB_PATH = path.join(__dirname, 'recipes.db');
const db = new sqlite3.Database(DB_PATH);

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mood TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      ingredients TEXT,
      instructions TEXT
    )`
  );

  // Seed some initial recipes if table is empty
  db.get('SELECT COUNT(*) as count FROM recipes', (err, row) => {
    if (err) {
      console.error('Error checking recipe count', err);
      return;
    }

    if (row.count === 0) {
      const insertStmt = db.prepare(
        `INSERT INTO recipes (mood, title, description, ingredients, instructions)
         VALUES (?, ?, ?, ?, ?)`
      );

      const seedData = [
        [
          'happy',
          'Sunshine Lemon Pasta',
          'Bright and zesty pasta to match your mood.',
          'Spaghetti, lemon, olive oil, garlic, parmesan, salt, pepper',
          'Cook pasta. Sauté garlic in olive oil, add lemon zest and juice, toss pasta with sauce and parmesan. Season to taste.'
        ],
        [
          'happy',
          'Chole Bhature (Spiced Chickpeas with Fried Bread)',
          'A vibrant, indulgent North Indian classic for celebration moods.',
          'Dried or canned chickpeas, onion, tomato, ginger, garlic, chole masala or garam masala, cumin, coriander, chili powder, bhature or fluffy flatbread, oil, salt',
          'Simmer chickpeas with sautéed onion, tomato, and spices until thick and flavorful. Serve hot with freshly fried bhature or soft flatbread.'
        ],
        [
          'sad',
          'Cozy Mac and Cheese',
          'A warm, creamy hug in a bowl.',
          'Macaroni, butter, flour, milk, cheddar, salt, pepper',
          'Cook macaroni. Make a roux with butter and flour, whisk in milk, add cheese until melted. Combine with pasta and bake if desired.'
        ],
        [
          'sad',
          'Khichdi (Comforting Rice and Lentils)',
          'Soft, gently spiced one-pot comfort food from Indian kitchens.',
          'Rice, yellow moong dal, ghee or oil, cumin seeds, ginger, turmeric, salt, optional peas or carrots',
          'Rinse rice and dal, sauté cumin and ginger in ghee, add turmeric, rice, dal, and water. Pressure cook or simmer until soft and porridge-like, then season with salt.'
        ],
        [
          'stressed',
          'Calming Miso Soup',
          'Light, soothing soup to slow things down.',
          'Miso paste, dashi or veggie broth, tofu, green onions, seaweed',
          'Warm broth, dissolve miso, add cubed tofu and seaweed, heat gently without boiling. Finish with sliced green onions.'
        ],
        [
          'stressed',
          'Masala Chaas (Spiced Buttermilk)',
          'Cool, light, and gut-soothing drink common after heavy meals in India.',
          'Plain yogurt, cold water, roasted cumin powder, salt, chopped coriander, optional green chili and grated ginger',
          'Whisk yogurt with cold water until frothy, stir in roasted cumin, salt, and herbs. Serve chilled over ice for a calming sip.'
        ],
        [
          'tired',
          'One-Pan Lazy Veggie Hash',
          'Minimal effort, maximum comfort.',
          'Potatoes, bell pepper, onion, eggs, olive oil, salt, pepper',
          'Dice veggies, sauté in oil until tender and golden, make small wells, crack eggs into wells, cover and cook until eggs set.'
        ],
        [
          'tired',
          'Aloo Paratha with Yogurt',
          'Stuffed potato flatbread that feels like a full brunch in one bite.',
          'Whole wheat flour, boiled potatoes, green chili, coriander, garam masala, salt, ghee or oil, plain yogurt',
          'Make a soft dough with flour and water. Mash potatoes with spices and herbs. Stuff dough balls with filling, roll gently, and cook on a hot tawa with ghee until golden on both sides. Serve with yogurt.'
        ],
        [
          'adventurous',
          'Spicy Chickpea Tacos',
          'A fun, bold flavor trip.',
          'Chickpeas, taco shells, chili powder, cumin, paprika, lime, cabbage, yogurt or sour cream',
          'Crisp chickpeas with spices in a pan, stuff into taco shells with shredded cabbage and a lime-yogurt drizzle.'
        ],
        [
          'adventurous',
          'Paneer Tikka Skewers',
          'Smoky, spiced paneer cubes inspired by tandoor flavors.',
          'Paneer cubes, thick yogurt, ginger-garlic paste, tandoori masala or garam masala, chili powder, lemon juice, bell peppers, onion, oil, salt',
          'Marinate paneer and veggies in spiced yogurt, thread onto skewers, and grill or roast at high heat until lightly charred at the edges. Finish with lemon juice.'
        ]
      ];

      seedData.forEach((recipe) => insertStmt.run(recipe));
      insertStmt.finalize();
      console.log('Seeded initial recipes.');
    }
  });
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API: get a random recipe for a mood
app.get('/api/recipes', (req, res) => {
  const { mood, excludeId } = req.query;

  if (!mood) {
    return res.status(400).json({ error: 'Mood is required' });
  }

  const params = [mood];
  let query = 'SELECT * FROM recipes WHERE mood = ?';

  if (excludeId) {
    query += ' AND id != ?';
    params.push(excludeId);
  }

  query += ' ORDER BY RANDOM() LIMIT 1';

  db.get(query, params, (err, row) => {
    if (err) {
      console.error('Error fetching recipe', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!row) {
      return res.status(404).json({ error: 'No recipes found for that mood yet.' });
    }

    res.json(row);
  });
});

app.listen(PORT, () => {
  console.log(`Mood recipe app running on http://localhost:${PORT}`);
});

