// Dependencies
const express = require('express');
const path = require('path');
console.log(__dirname, "../public");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const newDirectory = path.join(__dirname, '../public/view.html');


// Data

const characters = [
 {
   routeName: 'yoda',
  name: 'Yoda',
  role: 'Jedi Master',
  age: 900,
  forcePoints: 2000,
},

{
  routeName: 'darthmaul',
  name: 'Darth Maul',
  role: 'Sith Lord',
  age: 200,
  forcePoints: 1200,
},

 {
  routeName: 'obiwankenobi',
  name: 'Obi Wan Kenobi',
  role: 'Jedi Knight',
  age: 400,
  forcePoints: 1600
},
{
  routeName: 'rey',
  name: 'Rey',
  role: 'Jedi Apprentice',
  age: 21,
  forcePoints: 500
},

];


// Routes
//basic route that sends the user first to the AJAX page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/view.html'));
})
app.get('/add', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/add.html"));
})
//displays all characters
app.get('/api/characters', (req, res) => {
  return res.json(characters);
});

//displays single characters if the user chooses
app.get('/api/characters/:character', (req,res) => {
  //create variable to be set to the request params after characters/
  const chosen = req.params.character;
  //if chosen is true run
  if(chosen) {
    console.log(chosen)
    //loop thru character array if chosen is strictly to the character arrays routeName
    //return that character
    for(let i = 0; i < characters.length; i++) {
      if (chosen === characters[i].routeName) {
        return res.json(characters[i]);
      }
    }
    //return message if user input doesnt match any of the characters
    return res.send('no character found');
    //if its not true return character object in JSON
  } else {
    res.json(false);
  }


})
//create new characters - takes in JSON INPUT
app.post('/api/characters', (req, res) => {
  const newCharacter = req.body;
  
  newCharacter.routeName = newCharacter.name.replace(/\s+/g, '').toLowerCase();
  console.log(newCharacter);

  characters.push(newCharacter);
  res.json(newCharacter);
});

///================TOONS ARRAY THAT I MADE


const toons = [
  {
    routeName: "vito",
    name: "Vito",
    class: 'rogue',
    level: 60
  },
  {
    routeName: "ben",
    name: "ben",
    class: "warrior",
    level: 60
  },
  
]

app.get('/toons', (req, res) => {
  res.send('Welcome to the Toon Page');
});
app.get('/toons/characters', (req,res) => {
  res.json(toons);
});

app.get('/toons/characters/:toon', (req, res) => {
  const chosenToon = req.params.toon;
  console.log(chosenToon);

  if(chosenToon) {

    for (let i = 0; i < toons.length; i++) {
      if(chosenToon === toons[i].routeName) {
        return res.json(toons[i]);
      }
    }
    return res.send('no toons to show! sorry!');

  } else {
    res.json(false);
  }
})
app.post('/toons/characters', (req, res) => {
  const newToon = req.body;
  console.log(newToon);
  toons.push(newToon);
  res.json(newToon);
})
























// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
