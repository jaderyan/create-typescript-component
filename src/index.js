#! /usr/bin/env node

const inquirer = require("inquirer");
const fs = require("fs");
const CURR_DIR = process.cwd();
const createTemplate = require("./templates");

const QUESTIONS = [
  {
    name: "component-directory",
    type: "input",
    default: "src/components",
    message: "What directory should the component live in?"
  },
  {
    name: "component-name",
    type: "input",
    message: "What is the name of the component?",
    validate: function(input) {
      if (/^\w+$/g.test(input)) return true;
      else return "Component name cannot contain spaces or special characters";
    }
  },
  {
    name: "project-styles",
    type: "confirm",
    message: "Do you want to create styles for this component?"
  }
];

inquirer.prompt(QUESTIONS).then(answers => {
  const componentName = answers["component-name"];
  const hasStyles = answers["project-styles"];
  const componentFolder = answers["component-directory"];
  const componentDirectory = `${CURR_DIR}/${componentFolder}`;
  const folderPath = `${componentDirectory}/${componentName}`;

    if (!fs.existsSync(componentDirectory)) {
    fs.mkdirSync(componentDirectory, { recursive: true });
  }

  fs.mkdirSync(folderPath);

  createDirectoryContents(componentName, hasStyles, folderPath);
});

function createDirectoryContents(componentName, hasStyles, folderPath) {
  if (hasStyles) {
    fs.writeFileSync(`${folderPath}/${componentName}.scss`, "", "utf8");
  }

  fs.writeFileSync(
    `${folderPath}/${componentName}.tsx`,
    createTemplate("component", componentName, hasStyles),
    "utf8"
  );

  fs.writeFileSync(
    `${folderPath}/index.ts`,
    createTemplate("index", componentName, hasStyles),
    "utf8"
  );

  console.log("Component created 🎉");
}
