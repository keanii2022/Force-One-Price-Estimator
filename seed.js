require('dotenv').config();
require('./config/database');

const Category = require('./models/category');
const Service = require('./models/service');

(async function() {

  await Category.deleteMany({});
  const categories = await Category.create([
    {name: 'One Time Services', sortOrder: 10},
    {name: 'Ongoing Services', sortOrder: 20},
  ]);

  await Service.deleteMany({});
  const services = await Service.create([
    {name: 'Pressure Wash', category: categories[0], price: 100-200},
    {name: 'Pressure Wash', category: categories[1], price: 100.00},
    {name: 'Office Cleaning', category: categories[0], price: 75-200},
    {name: 'Office Cleaning', category: categories[1], price: 75.00},
  ]);

  console.log(services)

  process.exit();

})();