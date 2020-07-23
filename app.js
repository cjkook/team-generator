const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let batchEmployees = [];

// Write code to use inquirer to gather information about the development team members,
// ! inquirer for each employee
// and to create objects for each team member (using the correct classes as blueprints!)
fnNew();
// CREATE NEW ENTRY
function fnNew() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Name:",
        name: "name",
      },
      {
        type: "input",
        message: "ID:",
        name: "id",
      },
      {
        type: "input",
        message: "Email:",
        name: "email",
      },
      {
        type: "list",
        message: "Which type of employee would is this?",
        name: "role",
        choices: ["Intern", "Manager", "Engineer", "Employee"],
      },
    ])
    .then(function (res) {
      const { name, id, email, role } = res;
      let entry = res;
      console.log(name);
      switch (role) {
        case "Intern":
          inquirer
            .prompt({
              type: "input",
              message: "Which school does this employee attend?",
              name: "school",
            })
            .then((res2) => {
              entry = new Intern(name, id, email, res2.school);
              batchEmployees.push(entry);
              console.log(batchEmployees);
              fnAddAnother();
            });
          break;
        case "Manager":
          inquirer
            .prompt({
              type: "input",
              message: "Office Number:",
              name: "officeNumber",
            })
            .then((res2) => {
              entry = new Manager(name, id, email, res2.officeNumber);
              batchEmployees.push(entry);
            });
          break;
        case "Engineer":
          inquirer
            .prompt({
              type: "input",
              message: "Github user name:",
              name: "github",
            })
            .then((res2) => {
              entry = new Engineer(name, id, email, res2.github);
              batchEmployees.push(entry);
            });
          break;
        default:
          entry = new Employee(name, id, email);
          batchEmployees.push(entry);
          break;
      }
    });
}

function fnAddAnother() {
  inquirer
    .prompt({
      type: "list",
      message: "Would you like to enter another employee?",
      name: "addAnother",
      choices: ["Yes", "No"],
    })
    .then((res) => {
      if (res.addAnother === "Yes") {
        fnNew();
      } else {
        fs.writeFile(outputPath, render(batchEmployees), function (err) {
          if (err) {
            return console.log(err);
          }

          console.log("Success!");
        });
      }
    });
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
