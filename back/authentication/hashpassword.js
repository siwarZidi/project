
const passwordHash = require('password-hash');


const hashpass = async (password) => {
  const hashedPassword = await passwordHash.generate(password);
   
  return hashedPassword;
};

module.exports = {hashpass}

