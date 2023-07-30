// Global
var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');
// 

// home page
var username = localStorage.getItem('sessionUsername');
if (username) {
    document.getElementById('username').innerHTML = `Welcome ${username}`;
}

// storage
var signUpArr;
if (localStorage.getItem('users')) {
    signUpArr = JSON.parse(localStorage.getItem('users'));
} else {
    signUpArr = [];
}
// 

// inputs is emty or not
function isEmty() {
    if (signupEmail.value == '' || signupName.value == '' || signupPassword.value == '') {
        return false;
    }
}
// 

// email is available or not
function isEmailExist() {
    for (var i = 0; i < signUpArr.length; i++) {
        if (signUpArr[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false
        }
    }
}
// 

// to store data && Sign Up
function signUp() {
    if (isEmty() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger mb-2">All inputs is required</span>';
        return false;
    }
    var signUp = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    }
    // check arr is emty
    if (signUpArr.length == 0) {
        signUpArr.push(signUp);
        localStorage.setItem('users', JSON.stringify(signUpArr));
        document.getElementById('exist').innerHTML = '<span class="text-success mb-2">Success</span>';
        location.href = 'index.html';

    }
    // if not check availability
    else if (isEmailExist() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger mb-2">This email is already exist</span>';
        return false;
    } else {
        signUpArr.push(signUp);
        localStorage.setItem('users', JSON.stringify(signUpArr));
        document.getElementById('exist').innerHTML = '<span class="text-success mb-2">Success</span>';
        location.href = 'index.html';
    }
}
// 

// to check 
// inputs is emty or not
function isLoginEmty() {
    if (signinEmail.value == '' || signinPassword.value == '') {
        return false;
    }
}

// Log In
function logIn() {
    if (isLoginEmty() == false) {
        document.getElementById('incorrect').innerHTML = `<span class="text-danger mb-2">All inputs is required</span>`
        return false;
    }
    for (var i = 0; i < signUpArr.length; i++) {
        if (signinEmail.value.toLowerCase() == signUpArr[i].email.toLowerCase() && signinPassword.value.toLowerCase() == signUpArr[i].password.toLowerCase()) {
            document.getElementById('incorrect').innerHTML = '<span class="text-success mb-2">Success</span>';
            localStorage.setItem('sessionUsername', signUpArr[i].name)
            location.href = 'home.html'
            return true;
        }
    }
    document.getElementById('incorrect').innerHTML = `<span class="text-danger mb-2">incorrect email or password</span>`
}
// 

// log out
function logOut() {
    localStorage.removeItem('sessionUsername');
    location.href = 'index.html'
}