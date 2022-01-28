// function to determin if about data is present to display on page
/*create the about section the below checks to see if there is there isnt any data in the aboutText and if it is empy return nothing or esle there is data and to return the html for the about section*/
const generateAbout = (aboutText) => {
  if (!aboutText) {
    return "";
  }

  return `
    <section class="my-3" id="about">
      <h2 class="text-dark bg-primary p-2 display-inline-block">About Me</h2>
      <p>${aboutText}</p>
    </section>
  `;
  /* the function will be called using template literal in the location we want the about section to display and passing the data in about to it 
  ${generateAbout(about)} line 58 below*/
};

/* this generateProjects function chains the filter() and map() methods to perform their functions within from within the template literals. this is achieved by applying .filter to the template literal feature as a param of the filter function based on the whether feature is true or false (feature or !feature). Then .map() is applied to the resulting and its value to genertate the html. This is cleaner and works better than the previous function which applied the .filter() and .map() methods to the html before placing is in the template. see commented out function below for refernece*/  
const generateProjects = projectsArr => {
  return `
    <section class="my-3" id="portfolio">
      <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
      <div class="flex-row justify-space-between">
      ${projectsArr
        .filter(({ feature }) => feature)
        .map(({ name, description, languages, link }) => {
          return `
          <div class="col-12 mb-2 bg-dark text-light p-3">
            <h3 class="portfolio-item-title text-light">${name}</h3>
            <h5 class="portfolio-languages">
              Built With:
              ${languages.join(', ')}
            </h5>
            <p>${description}</p>
            <a href="${link}" class="btn"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
          </div>
        `;
        })
        .join('')}

      ${projectsArr
        .filter(({ feature }) => !feature)
        .map(({ name, description, languages, link }) => {
          return `
          <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
            <h3 class="portfolio-item-title text-light">${name}</h3>
            <h5 class="portfolio-languages">
              Built With:
              ${languages.join(', ')}
            </h5>
            <p>${description}</p>
            <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
          </div>
        `;
        })
        .join('')}
      </div>
    </section>
  `;
};

/* This function was replaced by the above fuinction that chained the .filter() and .map() methods within the template literals was left in for reference. This function is for the projects section. It uses the .filter() method to create new arrays featuredProjects and nonFeaturedProjects based on the whether project.feature evaluates to true or false. we then create 2 more arrays for the html using the .map() on featuredProjectHtmlArr and nonFeaturedProjectHtmlArr the data in these arrays are interpolated into the returning object <section> element template literal. We use a join(', ') method to turn the featuredProjectHtmlArr and nonFeaturedProjectHtmlArr to a string separated by ', ' which was passed using join() */
// const generateProjects = projectsArr => {
//   // get array of just featured projects
//   const featuredProjects = projectsArr.filter(project => {
//     if (project.feature) {
//       return true;
//     } else {
//       return false;
//     }
//   });

//   // get array of all non-featured projects
//   const nonFeaturedProjects = projectsArr.filter(project => {
//     if (!project.feature) {
//       return true;
//     } else {
//       return false;
//     }
//   });

//   const featuredProjectHtmlArr = featuredProjects.map(({ name, description, languages, link }) => {
//     return `
//       <div class="col-12 mb-2 bg-dark text-light p-3 flex-column">
//         <h3 class="portfolio-item-title text-light">${name}</h3>
//         <h5 class="portfolio-languages">
//           Built With:
//           ${languages.join(', ')}
//         </h5>
//         <p>${description}</p>
//         <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
//       </div>
//     `;
//   });

//   const nonFeaturedProjectHtmlArr = nonFeaturedProjects.map(
//     ({ name, description, languages, link }) => {
//       return `
//         <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
//           <h3 class="portfolio-item-title text-light">${name}</h3>
//           <h5 class="portfolio-languages">
//             Built With:
//             ${languages.join(', ')}
//           </h5>
//           <p>${description}</p>
//           <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
//         </div>
//       `;
//     }
//   );

//   return `
//     <section class="my-3" id="portfolio">
//       <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
//       <div class="flex-row justify-space-between">
//       ${featuredProjectHtmlArr.join('')}
//       ${nonFeaturedProjectHtmlArr.join('')}
//       </div>
//     </section>
//   `;
// };


/*templateData will accept the promise object returned by inquirer and the function has been updated to use promise object's properties*/
module.exports = (templateData) => {


  /*deconstructing object templateData by pulling the values we want by using the key name of the property we want to assign to a variable. this can be done any order with objects but we must ensure that wew're creating a variable name that completely matches the property name we're looking to deconstruct data from. If one uses the wrong property key name you wont get an error rather the variable will just be undefined. The below declaration reads create variable projects with all data from templateData. projects, create variable about with all the data data from templateData.about, and then create a object called hearder and assign all the remaining data to it*/
  const { projects, about, ...header } = templateData;
  /* [ ... ]  is the rest operator and is interchangeable with spread depending on use case*/

  console.log(projects, about, header);
  //data is passed from the above variables and accessed using template literals i.e. ${header.name} and ${header.github}

  return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Portfolio Demo</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
    <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
  </head>

  <body>
    <header>
      <div class="container flex-row justify-space-between align-center py-3">
        <h1 class="page-title text-secondary bg-dark py-2 px-3">${
          header.name
        }</h1>
        <nav class="flex-row">
          <a class="ml-2 my-1 px-2 py-1 bg-secondary text-dark" href="https://github.com/${
            header.github
          }">GitHub</a>
        </nav>
      </div>
    </header>
    <main class="container my-5">
    ${generateAbout(about)}
    ${generateProjects(projects)}
    </main>
    <footer class="container text-center py-3">
      <h3 class="text-dark">&copy; ${new Date().getFullYear()} by ${
    header.name
  }</h3>
    </footer>
  </body>
  </html>
  `;
};
// notice the use of new Date().getFullYear() method to dynamically set the date
