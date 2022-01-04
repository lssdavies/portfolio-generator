//require built in node file system module. Node api or modules include HTTP, URL, FS
const fs = require('fs');
const generatePage = require('./src/page-template.js');
//declaring const to capture input excluding the node and app paths
const profileDataArgs = process.argv.slice(2, process.argv.length);

/*Using assignment destructuring to store user input in command line captured fromm the process.argv array assigned to profileDataArgs. This is the same as declare the items individually i.e const name = profileDataArgs[0]; const github = profileDataArgs[1];*/
const [name, github] = profileDataArgs;

/*arrow function to generate page. The function is accepting 2 arguments, it is structured to return a HTML as a string so the arrow needs to include the return statement and curly braces. This could be written in  asingle line/action where return would be implied and curly braces will not be needed. eg "const generatePage = (userName, githubName) => `Name: ${userName}, Github: ${githubName}`;" if we weren't trying to create a HTML document. Template literals are used to pass ${name} and ${github} to the generated string(HTML)*/
const generatePage = (userName, githubName) => {
    return`
    <!DOCTYPE html> 
    <html lang="en"> 
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Portfolio Demo</title>
    </head>
  
    <body>
      <h1>${name}</h1>
      <h2><a href="https://github.com/${github}">Github</a></h2>
    </body>
    </html>
    `;
  };

  /*using fs.writeFile to create html document. fs.write file requires 3 arguments 1. the file name, 2 the data to write to the file (generatedPage() function) and a call back function that will be used for error handling*/
  fs.writeFile('./index.html', generatePage(name, github), err => {
      if (err) throw err;
      //the arrow function doesnt require an else statement 
      console.log('Portfolio complete! Checout index.html to see the outout!')
  });





  // //printing the function with the values of name and git parsed to the function
// console.log(generatePage(name, github));
// //confirming name and github matches generatePage function
// console.log(name, github);


// // console.log(profileDataArgs);

// const printProfileData = (profileDataArr) => {
//     profileDataArr.forEach(profileItem => console.log(profileItem));
// };
// printProfileData(profileDataArgs);