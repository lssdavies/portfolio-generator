//require built in node file system module. Node api or modules include HTTP, URL, FS
const fs = require('fs');
const generatePage = require('./src/page-template.js');

//declaring const to capture input excluding the node and app paths
const profileDataArgs = process.argv.slice(2);

/*Using assignment destructuring to store user input in command line captured fromm the process.argv array assigned to profileDataArgs. This is the same as declare the items individually i.e const name = profileDataArgs[0]; const github = profileDataArgs[1];*/
const [name, github] = profileDataArgs;

/*using fs.writeFile to create html document. fs.write file requires 3 arguments 1. the file name, 2 the data to write to the file (generatedPage() function) and a call back function that will be used for error handling*/
fs.writeFile('./index.html', generatePage(name, github), err => {
  if (err) throw new Error(err);

  console.log('Portfolio complete! Check out index.html to see the output!');
});