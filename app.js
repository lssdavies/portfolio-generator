//require built in node file system module. Node api or modules include HTTP, URL, FS
const inquirer = require('inquirer');

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'What is your name?'
  }
])
.then(answers => console.log(answers));

// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);

// /*using fs.writeFile to create html document. fs.write file requires 3 arguments 1. the file name, 2 the data to write to the file (generatedPage() function) and a call back function that will be used for error handling*/
// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw new Error(err);

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });