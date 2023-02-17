const fs = require("fs");

const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "videoList.json"
);
exports.getProductFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};
