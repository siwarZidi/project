
const bcrypt = require('bcrypt'); // Assuming you've installed bcrypt (npm install bcrypt)

const saltRounds = 10; // Adjust as needed (higher value = more secure, but slower)

const hashpass = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};


module.exports = {hashpass}


