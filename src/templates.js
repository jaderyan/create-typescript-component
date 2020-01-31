function createTemplate(file, componentName, hasStyles) {
  if (file === "index") {
    return createIndex(componentName);
  }

  if (file === "component") {
    return createComponent(componentName, hasStyles);
  }
}

function createIndex(componentName) {
  return `import ${componentName} from './${componentName}'

  export default ${componentName}`;
}

function createComponent(componentName, hasStyles) {
  if (hasStyles) {
    return `import React, { FunctionComponent } from "react";
  
  import './${componentName}.scss'
  
  interface IProps {
      text: string;
  }
      
  const ${componentName}: FunctionComponent<IProps> = ({ text }) => <p>{text}</p>;
      
  export default ${componentName}`;
  }

  return `import React, { FunctionComponent } from "react";

  interface IProps {
    text: string;
  }

  const ${componentName}: FunctionComponent<IProps> = ({ text }) => <p>{text}</p>;
        
  export default ${componentName}`;
}

module.exports = createTemplate;
