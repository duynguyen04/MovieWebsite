const auth = require("../models/auth.js");

exports.authorized = (req, res, next) => {
  const key = req.query.key;
  // console.log("key", key);
  if (key == undefined) {
    res.statusMessage = `Unauthorized: no user token`;
    res.status(401).end();
  }
  auth.fetchAll((data) => {
    const user = data.find((item) => item.token == key);
    // console.log("user", user);
    if (user) {
      next();
    } else {
      res.statusMessage = `Unauthorized: no user found`;
      res.status(401).end();
    }
  });
};
