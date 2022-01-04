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

  module.exports = generatePage;