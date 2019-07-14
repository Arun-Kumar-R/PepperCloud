//fullname length checker
let fullNameLength = (fullName) => {
    if (!fullName) {
        return false;
    } else {
        if (fullName.length < 2 || fullName.length > 30 ) {
            return false;
        } else {
            return true;
        }
    }
}

//valid fullName checker 
const validfullName = (fullName) => {
    if (!fullName) {
        return false;
    } else {
        const regExp = new RegExp (/^[a-zA-Z]+$/);
        return regExp.test(fullName);
    }
}

//fulName validation
const fulNameValidators = [{
    validator: fullNameLength,
    message: 'fulName must be contain atleast 2 characters and more than 30'
},
{
    validator: validfullName,
    message: 'FullName must not have any special characters and white spaces' 
}];

//Email length checker
let emailLength = (email) => {
    if (!email) {
        return false;
    } else {
        if (email.length < 5 || email.length > 60) {
            return false;
        } else {
            return true;
        }
    }
}

//Valid email checker
const validEmail = (email) => {
    if (!email) {
        return false;
    } else {
        const regExp = new RegExp (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);
    }
}

//Email validation
const emailValidators = [{
    validator: emailLength,
    message: 'E-Mail must be atleast 5 characters and more than 60'
},
{
    validator: validEmail,
    message: 'Provide a valid Email' 
}];

//password length checker
const passwordlength = (password) => {
    if (!password) {
        return false;
    } else {
        if ( password.length < 8 || password.length > 100) {
            return false;
        } else {
            return true;
        }
    }
}

//valid password checker
const validPassword = (password) => {
    if (!password) {
        return false;
    } else {
        const regExp = new RegExp (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
        return regExp.test(password);
    }
}

//password validation
const passwordValidators = [{
    validator: passwordlength,
    message: 'Password must be atleast 8 characters and more than 100'
},
{
    validator: validPassword,
    message: 'password must be at least one number and one letter' 
}];
