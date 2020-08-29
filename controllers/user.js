const User = require("../models/user");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => { //thực thi truy vấn
    if (err || !user) {
      return res.status(400).json({
        err: "user not found",
      });
    }
    req.profile = user;
    next();
  });
};
