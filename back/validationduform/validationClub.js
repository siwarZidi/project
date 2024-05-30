const club = require('../models/club');

function checkPasswordCriteria(password) {
    const passwordCriteria = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&^*])(?=.{8,})/;

    let isValid = passwordCriteria.test(password);

    return isValid ? true : false;
}

const validateLoginForm =  async (formInfo) => {
    const { email, password } = formInfo;

    if (!email || !password) {
        message = "All fields are required.";
        return false;
    }

    return true;
};


const validateRegisterForm = async (formInfo) => {
    const { name , year, email, password, confirmPassword } = formInfo;

    if (!name || !year || !email || !password || !confirmPassword) {
        message = "All fields are required.";
        console.log(message)
        return {result : false , message};
    }

    //check email
    const emailexist = await club.findOne({ email: email });
    if (emailexist) {
        message = "An account with this email already exists.";
        console.log(message)

        return {result : false , message};
    }

    // Check if password meets criteria
    const validpassword = checkPasswordCriteria(password);

    if (validpassword) {

        if (password !== confirmPassword) {
            message = "Passwords don't match.";
            console.log(message)

            return {result : false , message};
        }
    } else {
        message =
            "Invalid Password! Password must contain: 1 lower and upper case letter, 1 digit, 1 special character and must be a minimum of 8 characters.";
        console.log(message)

        return {result : false , message};
    }
    message='valid form'
    return {result : true , message};
};

// Change password form validation
const validateChangePasswordForm = (formInfo) => {
    const { password, confirmPassword } = formInfo;

    // Check if there is any missing field
    if (!password || !confirmPassword) {
        message = "All fields are required.";
        return false;
    }

    // Check if password meets criteria
    const isPasswordValid = checkPasswordCriteria(password);

    if (isPasswordValid) {
        // Check if the passwords match
        if (password !== confirmPassword) {
            message = "Passwords don't match.";

            return false;
        }
    } else {
        message =
            "Invalid Password! Password must contain: 1 lower and upper case letter, 1 digit, 1 special character and must be a minimum of 8 characters.";

        return false;
    }

    return true;
};  
module.exports={validateChangePasswordForm,validateRegisterForm,validateLoginForm,checkPasswordCriteria}