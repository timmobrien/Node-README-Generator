// Goal : generate readme file for future projects

// Bringing in packages
const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs');
const path =  require('path');
const templateLocation = path.join(__dirname,'utils','template','readme-template.md');
const outputLocation = path.join(__dirname, 'output', 'README.md');

// Use chalk to colour console log text
const green = chalk.green;
const blue = chalk.blue;

// Welcome user
console.log(green('Welcome to the README Generator! Please answer the following questions and your README file will be generated'));
console.log(blue('If you need to add code snippets or line breaks, please use backticks and <br> respectively'));

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
    // project url
    {
        type:'input',
        message:'What is the GitHub project URL?',
        name: 'url'
    }

    // once we have retrieved the answers
]).then((ans) => {
    // convert the license to lowercase for URL
    const lowerCaseLicense = ans.license.toLowerCase()
    // Retrieves the template
    const template = fs.readFileSync(templateLocation, 'utf-8')
    // variable to find multiple instances of a word in the string
    const licenses = /{{license}}/g;
    const projectURL = /{{url}}/g
    const profileLink = /{{github-link}}/g
    // Replace parts of string with relevant information
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
    // Turn the edited variable into a new README
    fs.writeFileSync(outputLocation, output)
    // Notify the user
    console.log(green('Your README File has been exported to ' + outputLocation ))
})
