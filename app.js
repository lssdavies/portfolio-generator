//require built in node file system module. Node api or modules include HTTP, URL, FS
const inquirer = require('inquirer');

// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

/*function call for inquirer.prompt() The prompts are passed as object with a type (question type), name (property that identifies each question uniquely) and message (property that displays the question). So the questions will be stored in an array of objects where each object store the type, name and message of each question*/ 
const promptUser = () =>  {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
      /*adding input validation, requiring the user to input there name or they will get an error. Notice the validate method receives and argument nameInput*/
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your Github Username',
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log('Please enter your Github Username!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some additional information about yourself'
    }
  ]);
 };

 /*function to capture user project data. We add the parameter portfolioData which will be used to store each projects data*/
 const promptProject = portfolioData => {

  console.log(`
=================
Add a New Project
=================
`);
  /*if there is no projects array property, create an empty array projects, the array will store all the project data. The if statement ensure that projects array is ony set to empty if there is no data in the array.*/
  if (!portfolioData.projects)  {
    portfolioData.projects = [];
  }
  return inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What is the name of your project?',
      validate: projectInput => {
        if (projectInput) {
          return true;
        } else {
          console.log('Please enter your project name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: descriptionInput => {
        if (descriptionInput) {
          return true;
        } else {
          console.log('Please enter a project description!');
          return false;
        }
      }
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
      message: 'Enter the GitHub link to your project. (Required)',
      validate: linkInput => {
        if (linkInput) {
          return true;
        } else {
          console.log('Please enter the GitHub link to your project!');
          return false;
        }
      }
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
  /*once inquirer has collected the data we need to pass the data to the projects array using .then() the data is stored in projectData it is then pushed into the portfolioData.project array established on line 38*/
  .then(projectData => {
    portfolioData.projects.push(projectData);
    /*this conditional statement checks if the user chose to add another project, by checking projectData to see if confirmAddProject evaluated to true. If confirmAddProject is true it will call promptProject and pass the existing portfolioData as a parameter so when it runs it doesnt reinitialize the project array to be blank at the conditoinal statement on line 36*/
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } 
    // if the user doesnt chose to add another project it will evaluate to false and return the user data stored in portfolioData
    else {
      return portfolioData;
    }
  });
};
 /*we call the promptUser() function where the promise is appended in .then() which calls the promptProject funtion. It passes both the appended promptUser and promptProject pomises in the last .then() where the appended promises are passed into the portfolioData parameter and then the function console.logs the data*/
 promptUser()
 .then(promptProject)
 .then(portfolioData => {
   console.log(portfolioData);
 });
  
 



// const pageHTML = generatePage(name, github);

// /*using fs.writeFile to create html document. fs.write file requires 3 arguments 1. the file name, 2 the data to write to the file (generatedPage() function) and a call back function that will be used for error handling*/
// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw new Error(err);

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });