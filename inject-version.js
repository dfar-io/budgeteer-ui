const fs = require("fs");
const childProcess = require("child_process");

const dateKey = "~DATE~";
const gitKey = "~GIT_SHA~";
const templateFile = "./src/environments/version.template";
const outputFile = "./src/environments/version.ts";

function replace(key, value) {
  const data = fs.readFileSync(outputFile, "utf8");
  const regex = new RegExp(key, "g");
  const result = data.replace(regex, value);

  fs.writeFileSync(outputFile, result, "utf8");
}

fs.copyFile(templateFile, outputFile, err => {
  if (err) {
    console.log(err);
  } else {
    childProcess.exec("git rev-parse --short HEAD", function(childErr, sha) {
      if (childErr) {
        console.log(childErr);
      } else {
        replace(gitKey, sha.trim());

        var datetime = new Date().toISOString()
                                 .slice(0,10)
                                 .replace('T','|')
                                 .replaceAll('-', '.');
          replace(dateKey, datetime.trim());
      }
    });
  }
});