const fs = require('fs');

const readFromFile = async (filePath, callback) => fs.readFile(filePath, 'utf8', async (err, jsonString) => {
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

const writeToFile = async (filePath, data, callback) => fs.writeFile(filePath, data, async err => {
    if (err) callback(err)
    else callback()
});

exports.readFromFile = readFromFile
exports.writeToFile = writeToFile