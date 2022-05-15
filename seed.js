require('dotenv').config();
require('./config/database');

const Category = require('./models/category');
const Item = require('./models/item');

(async function() {

  await Category.deleteMany({});
  const categories = await Category.create([
    {name: 'One Time Deep Clean', sortOrder: 10},
    {name: 'Ongoing Services', sortOrder: 20},
    {name: 'A la Carte', sortOrder: 30},
  ]);

  await Item.deleteMany({});
  const items = await Item.create([
    {name: 'Pressure Wash', emoji:'🔫', category: categories[0], price: 600 },
    {name: 'Window Cleaning', emoji:'💦', category: categories[0], price: 200},
    {name: 'Carpet Cleaning', emoji:'♨️', category: categories[0], price: 150},
    {name: 'Office Cleaning', emoji:'🛋', category: categories[0], price: 300},
    {name: 'Office Recurring', emoji:'🛋', category: categories[1], price: 80},
    {name: 'Pressure Wash Recurring', emoji:'🔫', category: categories[1], price: 100},
    {name: 'Window Recurring', emoji:'💦', category: categories[1], price: 75},
    {name: 'Trash Removal', emoji:'🗑', category: categories[2], price: 100},
    {name: 'Smell-Good', emoji:'🪔', category: categories[2], price: 10},
  ]);

  console.log(items)

  process.exit();

})();