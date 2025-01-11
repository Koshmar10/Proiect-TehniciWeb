admin = JSON.parse(localStorage.getItem('loggedInUser'));
userMessages = JSON.parse(localStorage.getItem('userMessages') || '[]');
console.log(userMessages);
messageContainer = document.getElementById('message-container');
adminName = document.getElementById('admin-name');
activeUsers= document.getElementById('active-users');

function generateRandomArray() {
    let randomArray = [];
    for (let i = 0; i < 12; i++) {
        randomArray.push(Math.floor(Math.random() * (2000 - 500 + 1)) + 500);
    }
    return randomArray;
}
let activeUsersCount = 1000;
activeUsers.innerHTML = activeUsersCount + " Users";
const randomData = generateRandomArray();
setInterval(() => {
    const updatedData = generateRandomArray();
    myChart.data.datasets[0].data = updatedData;
    myChart.update();
}, 50000);
setInterval(() => {
    const change = Math.floor(Math.random() * (50 - 24 + 1)) + 24;
    activeUsersCount += Math.random() < 0.5 ? -change : change;
    activeUsers.innerHTML = activeUsersCount + " Users";
}, 5000);
function loadMessages(){

    userMessages.forEach(message => {
        const messageBody = document.createElement('div');
        const messageHeader = document.createElement('div');
        const messageIdentification = document.createElement('div');
        const deleteButton = document.createElement('a');
        const nameContainer = document.createElement('div');
        const emailContainer = document.createElement('span');
        const messageText = document.createElement('p');
        
        messageBody.classList.add('message');
        messageHeader.classList.add('message-header');
        messageIdentification.classList.add('message-identification');
        nameContainer.classList.add('name-container');
        deleteButton.classList.add('delete-button');
        
        deleteButton.innerHTML = 'x';
        deleteButton.href = '#';
        deleteButton.onclick = () => {
            messageContainer.removeChild(messageBody);
            userMessages = userMessages.filter(msg => msg !== message);
            localStorage.setItem('userMessages', JSON.stringify(userMessages));
        };
        
        const firstnameElement = document.createElement('h3');
        firstnameElement.innerHTML = message.firstName;
        nameContainer.appendChild(firstnameElement);
        
        const lastnameElement = document.createElement('h3');
        lastnameElement.innerHTML = message.lastName;
        nameContainer.appendChild(lastnameElement);
        
        messageIdentification.appendChild(nameContainer);
        messageIdentification.appendChild(emailContainer);
       
        
        emailContainer.innerHTML = message.email;
        messageHeader.appendChild(messageIdentification);
        messageHeader.appendChild(deleteButton);
        messageBody.appendChild(messageHeader);
        messageText.innerHTML = message.message;
        messageBody.appendChild(messageText);
        
        messageContainer.appendChild(messageBody);
    });
}
function loadHome(){
    window.location.href = '../Home/index.html';
}
loadMessages();
adminName.innerHTML = admin.name;

const ctx = document.getElementById('chart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Monthly Visitors',
            data: randomData,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1
        }]
    },
    options: {
        indexAxis: 'y',
        maintainAspectRatio: false,        
        responsive: true,
        
    }
});
1

