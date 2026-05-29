function nextPage(page){

  document.querySelectorAll('.page')
  .forEach(p => p.classList.remove('active'));

  document.getElementById('page'+page)
  .classList.add('active');

  // PAGE 2 AUTO NEXT
  if(page === 2){

    setTimeout(() => {

      nextPage(3);

    },3000)

  }

}


// COUNTDOWN

function startCountdown(){

  nextPage(4);

  let count = 3;

  const countdown =
  document.getElementById('countdown');

  countdown.innerHTML = count;

  const interval = setInterval(() => {

    count--;

    if(count > 0){

      countdown.innerHTML = count;

    }else{

      countdown.innerHTML = "❤";

      clearInterval(interval);

      setTimeout(() => {

        nextPage(5);

      },1000)

    }

  },1000)

}


// POPUP

function openMessage(img,message){

  document.getElementById('popup')
  .classList.add('active');

  document.getElementById('popup-img')
  .src = img;

  document.getElementById('popup-message')
  .innerHTML = message;

}


function closePopup(){

  document.getElementById('popup')
  .classList.remove('active');

}