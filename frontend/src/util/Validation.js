export function emailValidation(email) {

    if (email === '') return false;
    const regex_pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regex_pattern.test(email)) {
        return true;
    }
    return false;
}

export function nameValidation(name) {

    if (name === '') return false;

    for (var i = 0; i < name.length; i++) {
        var charCode = name.charCodeAt(i);
        if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
            return false;
        }
    }

    return true;

}

export function mobileValidation(mobileNumber) {

    if (mobileNumber === '') return false;

    if (mobileNumber.length == 10) {
        return true;
    }
    return false;

}

export function addressValidation(address) {

    if (address === '') return false;

    if (address.length > 50) return false;

    var notallowedCharacters = "!$%^&*+={][}><?|";


    for (var i = 0; i < notallowedCharacters.length; i++) {
        var char = notallowedCharacters.charAt(i);


        if (address.indexOf(char) != -1) {
            return false;
        }
    }

    return true;
}

export function dateValidation(date) {
    if (date) {
        return true;
    }
    return false;
}

export function passwordValidation(pwd1, pwd2) {
    if (pwd1 === pwd2) {
        return true;
    }
    else {
        return false;
    }
}


export function imageValidation(image) {
    if (image === null) {
        return false;
    }
    return true;
}

export function currentDateString() {
    const date = new Date();
    return (date.getFullYear() + "-" + ((date.getMonth() + 1) + "").padStart(2, '0') + "-" + ((date.getDate() + "").padStart(2, '0')));
}