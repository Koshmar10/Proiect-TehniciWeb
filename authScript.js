
let loggedInUser = localStorage.getItem('loggedInUser');

loginForm = document.getElementById('loginForm');
registerForm = document.getElementById('registerForm');

registerRedirect = document.getElementById('register-redirect');
loginRedirect = document.getElementById('login-return');
passwordError = document.getElementsByClassName('password-error')[0];
emailError= document.getElementsByClassName('email-error')[0];
dissmissPasswordError = document.getElementById('password-error-dissmis');
dissmissEmailError = document.getElementById('email-error-dissmis');


function showLogin(){
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
}
function showRegister(){
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
}
function showUser(){
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
   document.getElementsByClassName('logged-user')[0].innerHTML = loggedInUser;
}


if(loggedInUser){
    showUser();
}
else{
    showLogin();
    passwordError.style.display = 'none';
    emailError.style.display = 'none';
}


dissmissEmailError.onclick = function(e){
    e.preventDefault();
    emailError.style.display = 'none';
}

dissmissPasswordError.onclick = function(e){
    e.preventDefault();
    passwordError.style.display = 'none';
}
registerRedirect.onclick = function(event) {
    event.preventDefault();
    showRegister();
}
loginRedirect.onclick = function(event) {
    event.preventDefault();
    showLogin();
}
loginForm.addEventListener('submit', function(e){
    
    e.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    
    let emailFound = false;
    let passwordFound = false;

    fetch('./data/data.json')
    .then(
        response => {
            if(response.ok){
                return response.json();
            }
            else{
                throw new Error('Server response wasn\'t OK');
            }
        }
    )
    .then(
        data => {
            
            data.users.forEach(user => {
                if (user.email == email){
                    emailFound = true;
                }
                if(user.password == password){
                    passwordFound = true;
                }
                if (user.email == email && user.password == password){
                    localStorage.setItem('loggedInUser', JSON.stringify(user));
                    loggedInUser = JSON.stringify(user);
                    window.location.href = 'index.html';
                
                }
            });
            if(!emailFound){
                emailError.style.display = 'flex';
            }
            if(!passwordFound){
                passwordError.style.display = 'flex';
            }
            
        }
    )});

    registerForm.addEventListener('submit', function(e){
        e.preventDefault();

        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        fetch('data/data.json').then
        (
            response => {
                if(response.ok){
                    return response.json();
                }
                else{
                    throw new Error('Server response wasn\'t OK');
                }
            }
        ).then(
            data => {
                let userExists = false;
                data.users.forEach(user => {
                    if(user.email == email){
                        userExists = true;
                    }
                });
                if(userExists){
                    alert('User with this email already exists');
                }
                else{
                    newUser={
                        name: name,
                        email: email,
                        password: password
                    }
                    data.users.push(newUser);
                    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
                    loggedInUser = JSON.stringify(newUser);
                    window.location.href = 'index.html';
                }
            }
        )

    });
