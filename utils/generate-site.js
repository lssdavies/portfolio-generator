const fs = require('fs');

// writeFile function thats returns a promise, a promis is created using the JS keyword new. we provide it with a function that accepts two functions as parameters: resolve and reject. From there, we can write whatever asynchronous functionality we need to execute, and run the resolve() function when the code executes successfully or reject() when it fails to execute successfully. */
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
      fs.writeFile('./dist/index.html', fileContent, err => {
        // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
        if (err) {
          reject(err);
          // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
          return;
        }
  
        // if everything went well, resolve the Promise and send the successful data to the `.then()` method
        resolve({
          ok: true,
          message: 'File created!'
        });
      });
    });
  };

  //Copy file function to copy style.css into dist folder
  const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
        // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
        if (err) {
          reject(err);
          // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
          return;
        }
  
        // if everything went well, resolve the Promise and send the successful data to the `.then()` method
        resolve({
          ok: true,
          message: 'File created!'
        });
      });
    });
  };

  // exports both functions and will be imported into app.js the functions are exported as an object. this can be can be simplified using ES6 as follows below the commented out ,odule.export object
//   module.exports ={
//       writeFile: writeFile,
//       copyFile: copyFile
//   };

/*this is know as shorthand property names, this is possible because the property key name matches their corresponding value*/
module.exports = { writeFile, copyFile };