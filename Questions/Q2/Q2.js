// Write a NodeJS script to copy content of one file to another file using asynchronous
// callback. Copy file content from source.txt to destination.txt. Sequence must be
// maintained

const fs = require('fs');

// Function to copy content from source.txt to destination.txt
function copyFileContent(source, destination) {
    // Read content from source file
    fs.readFile(source, 'utf8', (err, data) => {
        if (err) {
            return console.error('Error reading file:', err);
        }

        // Write content to destination file
        fs.writeFile(destination, data, (err) => {
            if (err) {
                return console.error('Error writing to file:', err);
            }
            console.log(`Content copied from ${source} to ${destination}`);
        });
    });
}

// Call the function to copy file content
copyFileContent('Q2_source.txt', 'Q2_destination.txt');
