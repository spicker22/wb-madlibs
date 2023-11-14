import express from 'express';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import sample from 'lodash.sample';

const app = express();
const port = '8000';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

// Run the server.
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${server.address().port}...`);
});

const COMPLIMENTS = [
  'awesome',
  'terrific',
  'fantastic',
  'neato',
  'fantabulous',
  'wowza',
  'oh-so-not-meh',
  'brilliant',
  'ducky',
  'coolio',
  'incredible',
  'wonderful',
  'smashing',
  'lovely',
];


// Display the homepage
app.get('/', (req, res) => {
  res.render('index.html' );
});


// Display a form that asks for the user's name.
app.get('/hello', (req, res) => {
  res.render('hello.html');
});


// Handle the form from /hello and greet the user.
app.get('/greet', (req, res) => {
  const name = req.query.name || 'stranger';
  const compliment = sample(COMPLIMENTS);
  res.render('greet.html.njk', 
  { name: name,
    compliment: compliment
   });
});


// Handle the form from hello and greet the user.
app.get('/game', (req, res) => {
  const playerChoice = req.query.play;        // get can only use query parameters(req.query) and route parameters(req.params)
  console.log(playerChoice);
  if (playerChoice === 'no') {
    res.render('goodbye.html.njk')
  } else {
    res.render('game.html.njk')
  }
});

// Handle the madlib output
app.get('/madlib' , (req, res) => {
  const name = req.query.name
  const color = req.query.color
  const noun = req.query.noun
  const adjective = req.query.adjective
  console.log(req.query);

  res.render("madlibStatement.html", { 
      name: name,
      color: color,
      noun: noun,
      adjective: adjective
      
  } )
})



