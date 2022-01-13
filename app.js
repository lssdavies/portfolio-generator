//require built in node file system module. Node api or modules include HTTP, URL, FS
const inquirer = require('inquirer');

/*function call for inquirer.prompt() The prompts are passed as object with a type (question type), name (property that identifies each question uniquely) and message (property that displays the question). So the questions will be stored in an array of objects where each object store the type, name and message of each question*/ 
const promptUser = () =>  {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your Github Username'
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide sopme additional information about yourself'
    }
  ]);
 };
 //we append the function to the .then()method since the function is a promise.
 //promptUser().then(answers => console.log(answers));

 /*function to capture user project data. We add the parameter portfolioData which will be used to store the project data*/
 const promptProject = portfolioData => {

  console.log(`
=================
Add a New Project
=================
`);
  //if there is no projects array property, create an empty array portfolioData, the array will store all the project data
  if (!portfolioData.projects)  {
    portfolioData.projects = [];
  }
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)'
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)'
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
  /*once inquirer has collected the data we need to pass the data to the projects array using .then() the data is stored in projectData it is then pushed into the portfolioData project array*/
  .then(projectData => {
    portfolioData.projects.push(projectData);
    /*this conditional statement checks if the user chose to add another project, by checking projectData to see if confirmAddProject evaluated to true. If confirmAddProject is true it will call promptProject and pass the existing portfolioData as a parameter so when it runs it doesnt reinitialize the project array to be blank at the conditoinal statement on line 36*/
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } 
    // if the user doesnt chose to add another project it will evaluate to false and return the  user data stored in portfolioData
    else {
      return portfolioData;
    }
  });
};
 //we call the promptUser() promises using the .then() method to chain the questions running the promptUser questions before promptProject
 promptUser()
 .then(promptProject)
 .then(portfolioData => {
   console.log(portfolioData);
 });
  
 

// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);

// /*using fs.writeFile to create html document. fs.write file requires 3 arguments 1. the file name, 2 the data to write to the file (generatedPage() function) and a call back function that will be used for error handling*/
// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw new Error(err);

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });