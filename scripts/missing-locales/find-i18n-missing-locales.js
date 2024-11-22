const fs = require("fs");
const shell = require("shelljs");
const path = require("path");

function checkNonEnKeyPresence() {
  const localesDir = "../../";
  const enDir = path.join(localesDir, "en");

  let cnt = 0; // Counter for total number of missing keys
  const cntObj = {}; // Object to store the number of missing keys per language

  // Get a list of all non-en folders
  const nonEnDirs = fs
    .readdirSync(localesDir)
    .filter(
      (dir) => !["index.js", "en", ".git", "scripts", ".github"].includes(dir)
    );
  // console.log("Languages present:\n", nonEnDirs);

  // Iterate through all the non-en folders
  for (const dir of nonEnDirs) {
    const dirPath = path.join(localesDir, dir);
    const files = fs.readdirSync(dirPath);
    let langKeyMissingCnt = 0; // Counter for number of missing keys in this language

    // Iterate through all the files in the folder
    for (const file of files) {
      if (path.extname(file) !== ".json") {
        continue; // Skip non-JSON files
      }

      const filePath = path.join(dirPath, file);

      // Read the non-en file
      const nonEnData = JSON.parse(fs.readFileSync(filePath, "utf8"));

      // Read the corresponding en file
      const enFilePath = path.join(enDir, file);
      const enData = JSON.parse(fs.readFileSync(enFilePath, "utf8"));

      const keyList = []; // List of missing keys in this file

      // Iterate through all the keys in the non-en file
      for (const key in nonEnData) {
        // Search for the same key in the corresponding en file
        if (!enData.hasOwnProperty(key)) {
          keyList.push(key);
          langKeyMissingCnt++;
        }
      }

      if (keyList.length > 0) {
        cnt += keyList.length;
        console.log(
          "\n==============================================================================="
        );
        console.log(
          `Keys Present in ${dir}/${file} but Not Present in en/${file} file:`
        );
        console.log(
          "-------------------------------------------------------------------------------"
        );
        console.log(keyList.join("\n"), "\n");
      }
    }

    if (langKeyMissingCnt > 0) {
      cntObj[dir] = langKeyMissingCnt;
    }
  }
  if (cntObj > 0) {
    console.log(
      `\n\nTotal missing keys in non-en files: ${cnt}\nMissing key count per language directory:`,
      cntObj
    );
  }

  return cnt;
}

if (checkNonEnKeyPresence() > 0) {
  console.warn(
    "\n❌❌Please remove keys from non-en locales files that are not present in en locales file\n"
  );
  shell.exit(1);
} else {
  console.warn(":: No extra non-en keys found in locales ✅ ::");
  //~! Exit with success if no missing keys found
  shell.exit(0);
}
