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

const teamList = [];

    function addManager() {
    
        inquirer.prompt([
            {
                type: "input",
                message: "What is the Manager's name?",
                name: "managerName"
            },
            {
                type: "input",
                message: "What is the Manager's ID number?",
                name: "managerID"
            },
            {
                type: "input",
                message: "What is the Manager's email address?",
                name: "managerEmail"
            },
            {
                type: "input",
                message: "What is the Manager's office number?",
                name: "managerOffice"
            }
        ]).then(response => {
    
            const newManager = new Manager(response.managerName, response.managerID, response.managerEmail, response.managerOffice);
            teamList.push(newManager);
            chooseMember();
    
        });
    }
    
    function addEngineer() {
         inquirer.prompt([
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
                name: "github"
            }
        ]).then(response => {
    
            const newEngineer = new Engineer(response.engineerName, response.engineerID, response.engineerEmail, response.github);
            teamList.push(newEngineer);
            chooseMember();
        });
    }
    
    
    function addIntern() {
         inquirer.prompt([
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
            chooseMember();
        });
    }
    
    function chooseMember() {

        inquirer.prompt([

            {
                type: "checkbox",
                message: "Please select an employee to add to your team:",
                name: "role",
                choices: ["Manager", "Engineer", "Intern", "No more members to add at this time!"]
            }
        ]).then(response => {
            const position = response.role;
            if (position == "Manager") {
                addManager();
            } else if (position == "Engineer") {
                addEngineer();
            } else if (position == "Intern") {
                addIntern();
            } else if (position == "No more members to add at this time!") {
                console.log("You're all done. Your team is now ready to be viewed!")
                write();
            }
        });

    }

    chooseMember();

function write() {
    fs.writeFileSync(outputPath, render(teamList));
}

       