const fs = require('fs');
const db = require('../src/plants-db.json');

const uniquePlantNames = [...new Set(db.plants.map(plant => plant.scientificNameWithoutAuthor))];

fs.writeFile('../dist/plants.json', JSON.stringify(uniquePlantNames, null, 2), () => {});
