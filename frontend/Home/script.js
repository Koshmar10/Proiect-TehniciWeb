let activeUser = JSON.parse(localStorage.getItem('loggedInUser'));


const adminButton = document.getElementById('admin-button');
const adminButton1 = document.getElementById('admin-button1');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
const experience1 = document.getElementById('experience1');
const experience2 = document.getElementById('experience2');
const experience3 = document.getElementById('experience3');

function loadAdminPage(){
    window.location.href = '../Admin/index.html';
}
if (!localStorage.getItem('userMessages')) {
    localStorage.setItem('userMessages', JSON.stringify([]));
}


document.getElementById('logged-user').innerHTML = activeUser['name'];
document.getElementById('logged-user1').innerHTML = activeUser['name'];
contactForm = document.getElementById('contact-form');
function logout(){
    localStorage.removeItem('loggedInUser');
    window.location.href = '../Authentification/index.html';
}

if (!activeUser){
    window.location.href = '../Authentification/index.html';
}else{
    console.log(activeUser);
    let adminPrivilege = activeUser['admin'];
    console.log(adminPrivilege);
    if (adminPrivilege){
        adminButton.style.display = 'flex';
        adminButton1.style.display = 'flex';
    }else{
        adminButton.style.display = 'none';
        adminButton1.style.display = 'none';
    }
}
contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    let firstName = document.getElementById('firstname').value;
    let lastName = document.getElementById('lastname').value;
    let email = document.getElementById('contact-email').value;
    let message = document.getElementById('message').value;

    contactFormObject = {
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'message': message  
    }
    userMessages = JSON.parse(localStorage.getItem('userMessages') || '[]');
    userMessages.push(contactFormObject);
    console.log(userMessages);
    localStorage.setItem('userMessages', JSON.stringify(userMessages));
    contactForm.reset();
});
function moveExperiencesLeft() {
    let temp = experience1.innerHTML;
    experience1.innerHTML = experience2.innerHTML;
    experience2.innerHTML = experience3.innerHTML;
    experience3.innerHTML = temp;
}

function moveExperiencesRight() {
    let temp = experience3.innerHTML;
    experience3.innerHTML = experience2.innerHTML;
    experience2.innerHTML = experience1.innerHTML;
    experience1.innerHTML = temp;
}

leftArrow.addEventListener('click', moveExperiencesLeft);
rightArrow.addEventListener('click', moveExperiencesRight);