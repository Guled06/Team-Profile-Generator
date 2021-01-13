const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choices = require("inquirer/lib/objects/choices");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const teamList = [];

function work() {

    function getManager() {
    
        return inquirer.prompt([
            {
                type: "input",
                message: "Enter the Manager's name",
                name: "managerName"
            },
            {
                type: "input",
                message: "What is the Manager's ID number?",
                name: "managerId"
            },
            {
                type: "input",
                message: "What is the Manager's email address?",
                name: "managerEmail"
            },
            {
                type: "input",
                message: "What is the Manager's office number?",
                name: "officeNumber"
            }
        ]).then(response => {

            const newManager = new Manager(response.managerName, response.managerID, response.managerEmail, response.officeNumber);
            teamList.push(newManager);
            addMember();
        });
    };
    
    function getEngineer() {
        return inquirer.prompt([
            {
                type: "input",
                message: "What is the Engineer's name?",
                name: "engineerName"
            },
            {
                type: "input",
                message: "What is the Engineer's ID number?",
                name: "engineerID"
            },
            {
                type: "input",
                message: "What is the Engineer's email address?",
                name: "engineerEmail"
            },
            {
                type: "input",
                message: "What is the Engineer's GitHub username?",
                name: "Github"
            }
        ]).then(response => {

            const newEngineer = new Engineer(response.engineerName, response.engineerID, response.engineerEmail, response.Github);
            teamList.push(newEngineer);
            addMember();
        });
    
    };

    function getIntern() {
        return inquirer.prompt([
            {
                type: "input",
                message: "What is the Intern's name?",
                name: "internName"
            },
            {
                type: "input",
                message: "What is the Intern's ID number?",
                name: "internID"
            },
            {
                type: "input",
                message: "What is the Intern's email address?",
                name: "internEmail"
            },
            {
                type: "input",
                message: "What is the Intern's school name?",
                name: "internSchool"
            }
        ]).then(response => {

            const newIntern = new Intern(response.internName, response.internID, response.internEmail, response.internSchool);
            teamList.push(newIntern);
            addMember();
        });
    };

    function addMember() {
        return inquirer.prompt([
            {
                type: "checkbox",
                message: "Please select an employee",
                name: "select",
                choices: [
                    "manager",
                    "engineer",
                    "intern",
                    "done"
                ]
            }
        ]).then(response => {
            const position = response.select;
            if (position === "manager") {
                 getManager();
            } else if (position === "engineer") {
                 getEngineer();
            } else if (position === "intern") {
                 getIntern();
            } else if (position === "done") {
                 goTeam();
            }
        });
    };

    addMember();
}

function goTeam() {
    fs.writeFile(outputPath, render(teamList));
}

work();


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
