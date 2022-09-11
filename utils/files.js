const fs = require('fs');

const readFromFile = async (callback) => fs.readFile('./pocketData.json', 'utf8', async (err, jsonString) => {
    if (err) {
        console.log('Error reading file from disk:', err);
        return;
    }
    try {
        callback(jsonString)
    }
    catch (err) {
        console.log('Error parsing JSON string:', err);
    }
});

exports.readFromFile = readFromFile