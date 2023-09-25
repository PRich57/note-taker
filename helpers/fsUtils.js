const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// writeToFile function to be used within the readAndAppend and deleteAndAppend functions
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

// This function will add to the array of notes without deleting existing notes
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

// This function will filter selected item and return the new array
const deleteAndAppend = (id, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      const filteredData = parsedData.filter(content => content.id !== id);
      writeToFile(file, filteredData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend, deleteAndAppend };