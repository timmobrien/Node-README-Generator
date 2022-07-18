// Goal : generate readme file for future projects

const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs');
const path =  require('path');
const templateLocation = path.join(__dirname,'utils','template','readme-template.md');
const outputLocation = path.join(__dirname, 'output', 'README.md');

const greenConsole = chalk.green;
const blueConsole = chalk.blue;

console.log(greenConsole('Welcome to the README Generator! Please answer the following questions and your README file will be generated'));
console.log(blueConsole('If you need to add code snippets or line breaks, please use backticks and <br> respectively'));

// Questions to ask

inquirer.prompt([
    // what is the project title
    {
        type: 'input',
        message: 'What is the project title?',
        name:'title',
    },
    // Description
    {
        type: 'input',
        message: 'What is the project description',
        name:'description',
    },
    // installation instructions
    {
        type: 'input',
        message: 'What are the project installation instructions?',
        name:'installation',
    },
    // Usage information
    {
        type: 'input',
        message: 'What is the project usage information?',
        name:'usage',
    },
    // Contribution guidelines
    {
        type: 'input',
        message: 'What are the contribution guidelines?',
        name:'contribution',
    },
    // test instructions
    {
        type: 'input',
        message: 'What are the project test instructions?',
        name:'test',
    },
    // email
    {
        type: 'input',
        message: 'What is your email?',
        name:'email',
    },
    // license
    {
        type: 'list',
        message: 'What is the license?',
        name:'license',
        choices: [
            'MIT','GPL-3.0', 'Apache-v2', 'ISC'
        ]
    },
    // github
    {
        type: 'input',
        message: 'What is your GitHub username?',
        name:'github',
    },
    {
        type:'input',
        message:'What is the GitHub project URL?',
        name: 'url'
    }

]).then((ans) => {
    const lowerCaseLicense = ans.license.toLowerCase()
    const template = fs.readFileSync(templateLocation, 'utf-8')
    const licenses = /{{license}}/g;
    const projectURL = /{{url}}/g
    const profileLink = /{{github-link}}/g
    const output = template.replace('{{title}}', ans.title)
        .replace('{{licenseLowerCase}}', lowerCaseLicense)
        .replace(licenses, ans.license)
        .replace('{{description}}', ans.description)
        .replace(projectURL, ans.url)
        .replace('{{github}}', ans.github)
        .replace('{{installation}}', ans.installation)
        .replace('{{usage}}', ans.usage)
        .replace('{{contribution}}',ans.contribution)
        .replace('{{test}}',ans.test)
        .replace(profileLink,`https://github.com/${ans.github}`)
        .replace('{{email}}',ans.email)
    
    fs.writeFileSync(outputLocation, output)
    console.log(greenConsole('Your README File has been exported to ' + outputLocation ))
})





// once questions are asked

// generate readme file based on the responses

