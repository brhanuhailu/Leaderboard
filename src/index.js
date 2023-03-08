import './style.css';

let data = {};
const id = 'lpqhfyZHGupjTjapKlIu ';
const forms = document.querySelector('.form-score');
const tableScore = document.querySelector('.list-score');
const refresh = document.querySelector('.btn-refresh');
const addscore = document.querySelector('.addbtn');
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`;

const errorMsgName = () => {
  const userrequired = document.querySelector('.namerequired');
  userrequired.textContent = 'Name is required!';
  userrequired.style.color = 'red';
  userrequired.style.display = 'block';
  setTimeout(() => {
    userrequired.style.display = 'none';
  }, 2000);
};

const errorMsgScore = () => {
  const scorerequired = document.querySelector('.scorerequired');
  scorerequired.style.color = 'red';
  scorerequired.textContent = 'Score is Required';
  scorerequired.style.display = 'block';
  setTimeout(() => {
    scorerequired.style.display = 'none';
  }, 2000);
};

const MsgSucess = () => {
  const success = document.querySelector('.success');
  success.style.display = 'block';
  success.style.background = 'brown';
  success.style.borderRadius = '70px';
  success.style.textAlign = 'center';
  success.textContent = 'Data Added sucessfully!';
  success.style.color = 'white';
  setTimeout(() => {
    success.style.display = 'none';
  }, 2000);
};

const fetchData = async () => {
  const gamescore = await fetch(url);
  const gamedata = await gamescore.json();
  tableScore.innerHTML = '';
  gamedata.result.forEach((element) => {
    tableScore.innerHTML += `<tr id="${gamedata.result.indexOf(element)}"><td>${element.user}</td><td>${element.score}</td></tr>`;
    if (gamedata.result.indexOf(element) % 2 === 0) {
      const contentbg = document.getElementById(`${gamedata.result.indexOf(element)}`);
      contentbg.style.background = 'grey';
    }
  });
};

const sendData = async () => {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

refresh.addEventListener('click', (element) => {
  element.preventDefault();
  fetchData();
});

const username = document.querySelector('#user');
const scoregame = document.querySelector('#score');
addscore.addEventListener('click', (e) => {
  e.preventDefault();
  if (!username.value) {
    errorMsgName();
  } else if (!scoregame.value) {
    errorMsgScore();
  } else {
    const datastore = {
      user: username.value,
      score: scoregame.value,
    };
    data = datastore;
    sendData();
    MsgSucess();
    forms.reset();
  }
});