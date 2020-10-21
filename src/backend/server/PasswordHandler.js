const bcrypt = require("bcrypt");

module.exports = class PasswordHandler {
    
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
    
  }
};
