const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        resolve({ hash, salt });
      });
    });
  });
};

const comparePassword = async (password, hashPassword) => {
  return new Promise((resolve, reject) => {
    return  bcrypt.compare(password, user.passwordHash);
  });
};

const generateOtp = (num) => {
  if (num < 2) {
    return Math.floor(1000 + Math.random() * 9000);
  }
  const c = Math.pow(10, num - 1);

  return Math.floor(c + Math.random() * 9 * c);
};

const phoneValidation = (userPhone) => {
  if (!userPhone) return false;
  const phone = userPhone.trim();
  const firstChar = phone.charAt(0);
  if (firstChar === "+" && phone.length === 14) {
    return phone;
  } else if (firstChar === "0" && phone.length === 11) {
    return `+234${phone.slice(1)}`;
  } else if (firstChar === "2" && phone.length === 13) {
    return `+${phone}`;
  } else {
    return false;
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  generateOtp,
  phoneValidation,
};
