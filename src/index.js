'use strict';

const fs = require('fs');
const path = require('path');

function listFilenamesInDirectorySync(directoryPath) {
    try {
        const files = fs.readdirSync(directoryPath);
        return files.map((file) => path.parse(file).name);
    } catch (err) {
        console.error('meta-importer error:', err);
        return [];
    }
}

module.exports = function() {
    const fileNameWithoutExtension = path.basename(this.resourcePath, path.extname(this.resourcePath));
    let outputString = '';
    
    // Retrieve the list of modules in the directory
    let modulesToImport = listFilenamesInDirectorySync(path.dirname(this.resourcePath));

    // Add imports to the top of the file
    let importsString = '';
    let exportsString = '';
    for (const importedModule of modulesToImport) {
        // ignore the curent file and anything named "index"
        if (['index', fileNameWithoutExtension].includes(importedModule)) continue;
        importsString += `import ${importedModule} from "./${importedModule}";\n`;
        exportsString += `    ${importedModule},\n`;
    }

    // Build the output string
    outputString = importsString +
    '\n' + 
    'export default {\n' +
    exportsString +
    '};\n';

    return outputString;
};
