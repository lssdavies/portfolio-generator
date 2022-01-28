/*require built in node file system module. Node api or modules include HTTP, URL, FS*/
const fs = require('fs');
const inquirer = require('inquirer');
//assigns arrow function in page-template.js to generatePage()
const generatePage = require('./src/page-template');

/*function call for inquirer.prompt() The prompts are passed as object with a type (question type), name (property that identifies each question uniquely) and message (property that displays the question). So the questions will be stored in an array of objects where each object store the type, name and message of each question*/
const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
      /*adding input validation, requiring the user to input there name or they will get an error. Notice the validate method receives and argument nameInput*/
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your name!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "github",
      message: "Enter your Github Username",
      validate: (githubInput) => {
        if (githubInput) {
          return true;
        } else {
          console.log("Please enter your Github Username!");
          return false;
        }
      },
    },
    // Confirm if user will like to add info about themselves
    {
      type: "confirm",
      name: "confirmAbout",
      message:
        'Would you like to enter some information about yourself for an "About" section?',
      default: true,
    },
    {
      type: "input",
      name: "about",
      message: "Provide some additional information about yourself",
      /*using when property to check if user will like to add or skip about question by looking at the response from confirmAbout*/
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      },
    },
  ]);
};

/*function to capture user project data and the data from promptUser is passed to the parameter portfolioData which will be used to store each user info and projects data*/
const promptProject = (portfolioData) => {
  console.log(`
=================
Add a New Project
=================
`);
  /*if there the portfolioData object doesnt have a .projects array property, create an empty array projects within portfolioData, the array will store all the project data. The if statement ensure that portfolioData.projects array is ony set to empty if there is no data in the array.*/
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return (
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of your project?",
          validate: (projectInput) => {
            if (projectInput) {
              return true;
            } else {
              console.log("Please enter your project name!");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "description",
          message: "Provide a description of the project (Required)",
          validate: (descriptionInput) => {
            if (descriptionInput) {
              return true;
            } else {
              console.log("Please enter a project description!");
              return false;
            }
          },
        },
        {
          type: "checkbox",
          name: "languages",
          message:
            "What did you build this project with? (Check all that apply)",
          choices: [
            "JavaScript",
            "HTML",
            "CSS",
            "ES6",
            "jQuery",
            "Bootstrap",
            "Node",
          ],
        },
        {
          type: "input",
          name: "link",
          message: "Enter the GitHub link to your project. (Required)",
          validate: (linkInput) => {
            if (linkInput) {
              return true;
            } else {
              console.log("Please enter the GitHub link to your project!");
              return false;
            }
          },
        },
        {
          type: "confirm",
          name: "feature",
          message: "Would you like to feature this project?",
          default: false,
        },
        {
          type: "confirm",
          name: "confirmAddProject",
          message: "Would you like to enter another project?",
          default: false,
        },
      ])
      /*once inquirer has collected the data we need to pass the data to the portfolioData.projects array using .then() the promised data is is passed to the .then as the parameter projectData it is then pushed into the portfolioData.project array established on line 38*/
      .then((projectData) => {
        portfolioData.projects.push(projectData);
        /*this conditional statement checks if the user chose to add another project, by checking projectData to see if confirmAddProject evaluated to true. If confirmAddProject is true it will call promptProject() and since projectData was pushed to the portfolioData.projects array in line 132 the array is not empty and it will not reinitialize the portfolioData.project array to be an empty array at the conditoinal statement on line 69. portfolioData is passed to promptProject() as a parameter so the data isnt lost*/
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
        }
        // if the user doesnt chose to add another project it will evaluate to false and return the user data stored in portfolioData
        else {
          return portfolioData;
        }
      })
  );
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });














// This code was the original code but was replaced by the above code in a refactor due to the asynchronous code, it was left in for reference. It was replaced by code that uses promises instead of callback functions.
/*we call the promptUser() function and once that function is completed .then() calls the promptProject() and the promised data from prompt user is passed in as a parameter to portfolioData. promptProject once completed adds the data it captured to portfolioData as an array portfolioData.projects and in the last .then() takes portfolioData in as a parameter and then the function console.logs the data*/

// promptUser()
//   .then(promptProject)
//   .then((portfolioData) => {
//     /* data in portfolioData object gets assigned to pageHTML as a parameter in generatePage()*/
//     const pageHTML = generatePage(portfolioData);
  
//     /*using fs.writeFile to create html document in the dist folder short for distribution which is a best practice in web development. fs.write file requires 3 arguments 1. the file name and location, 2 the data to write to the file (generatedPage() function) and a call back function that will be used for error handling*/
//     fs.writeFile('./dist/index.html', pageHTML, err => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       console.log('Page created! Check out index.html in this directory to see it!');
    
//       /* fs.copy is used to copy the css to the dist folder. fs.copy file needs the location of the file to be copied the location the file will be copied to and a function for error handling, similar to fs.write 3arguments needeed*/
//       fs.copyFile('./src/style.css', './dist/style.css', err => {
//         if (err) {
//           console.log(err);
//           return;
//         }
//         console.log('Style sheet copied successfully!');
//       });
//     });
//   });