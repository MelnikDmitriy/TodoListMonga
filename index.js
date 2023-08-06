const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const routes = require('./routes');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'publick')));

app.use(routes);

async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://dmitry:qwerty123@cluster0.l82xmgm.mongodb.net/todos',
      {}
    );
    app.listen(PORT, () => {
      console.log('Server has been started...');
    });
  } catch (e) {
    console.log(e);
  }
}

start();
