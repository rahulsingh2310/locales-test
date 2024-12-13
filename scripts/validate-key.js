// const fs = require('fs');

// // Define the regex pattern for keys
// const KEY_REGEX = /^[a-z_]+$/; // Example: Keys must contain only lowercase letters

// // Get the list of files passed as arguments
// const files = process.argv.slice(2);

// console.log({ files });

// if (files.length === 0) {
//   console.log('No files to validate.');
//   process.exit(0);
// }

// let hasErrors = false;

// files.forEach((file) => {
//   if (!file.endsWith('.json')) {
//     console.log(`Skipping non-JSON file: ${file}`);
//     return;
//   }

//   try {
//     // Read and parse the JSON file
//     const content = fs.readFileSync(file, 'utf8');
//     const data = JSON.parse(content);

//     // Validate keys in the JSON file
//     const invalidKeys = Object.keys(data).filter((key) => !KEY_REGEX.test(key));

//     if (invalidKeys.length > 0) {
//       hasErrors = true;
//       console.error(`File: ${file} - Invalid keys found:`, invalidKeys.join(', '));
//     } else {
//       console.log(`File: ${file} - All keys are valid.`);
//     }
//   } catch (error) {
//     hasErrors = true;
//     console.error(`Error processing file: ${file}\n`, error.message);
//   }
// });

// // Exit with error code if any issues were found
// if (hasErrors) {
//   process.exit(1);
// } else {
//   console.log('All JSON files passed validation!');
//   process.exit(0);
// }

const files = process.argv.slice(2);

console.log({ files });

process.exit(1);
