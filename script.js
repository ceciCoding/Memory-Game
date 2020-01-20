var cards = document.querySelectorAll('.card');

var hasFlippedCard = false;
var lockboard = false;
var firstCard, secondCard;

function flipCard() {
  if(lockboard) return;
  //handle double clicking bug
  if (this === firstCard) return;
  console.log(this);
  this.classList.add('flip');

  if(!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
    //second click
    hasFlippedCard = false;
    secondCard = this;
    checkMatch();    
}


cards.forEach(card => card.addEventListener('click', flipCard));

console.log(cards);

function checkMatch(){
  if(firstCard.dataset.album === secondCard.dataset.album){
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards(){
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockboard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
    }, 1000);
}

function resetBoard(){
  [hasFlippedCard, lockboard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//shuffle cards IIFE
(function shuffle(){
  cards.forEach(card => {
    var randomPos = Math.floor(Math.random() * 18);
    card.style.order = randomPos;
  });
})();

