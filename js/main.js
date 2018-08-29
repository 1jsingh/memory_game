/*
 * Create a list that holds all of your cards
 */

const cardList = document.querySelectorAll(".card");


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let fruitList = ['apple','apple','watermelon','watermelon','cherries',
						'cherries','strawberry','strawberry','banana','banana','raspberry','raspberry','pineapple','pineapple','orange','orange'];

function setupCards() {

	moveCount = 0;
	numCorrectPairs = 0;
	openCards = [];
	flush = true;
	fruitList = shuffle(fruitList);

	for (let i=0 ; i<=fruitList.length-1 ; i++){
		// console.log(cardList[i]);
		cardList[i].alt = fruitList[i];
		cardList[i].innerHTML = `<div class="side"><img class="fruit_image" src="images/lightning.png" alt="${fruitList[i]}"></div>
			    	<div class="side back"><img class="fruit_image" src="images/${fruitList[i]}.png" alt="${fruitList[i]}"></div>`
	}
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let moveCount ;
let numCorrectPairs;
let openCards = [];
let flush ;
const myDeck = document.querySelector(".deck");
const moveDisplay = document.querySelector(".moveDisplay");
const starBar = document.querySelector(".stars");
const reloadButton = document.querySelector(".reload_btn");

function resetCards(){
	for (const mycard of openCards){
		mycard.classList.remove("flip");
	}
	flush = true;
}

function getChildIndex(parent,child) {
	const childNodes = parent.childNodes;
	const numChild = parent.childElementCount;
	for (let i=0; i<=numChild ; i++){
		if (childNodes[i] === child){return i;}
	}
	return -1;
}

function addClickedcard(card){
	if (!(openCards.includes(card))){
		openCards.push(card);
		moveCount++;
	}
}

function checkMatch() {
	if (openCards[openCards.length-1].alt !== openCards[openCards.length-2].alt){
		openCards.pop().classList.remove("flip");
		openCards.pop().classList.remove("flip");
	}
	flush = true;
}

function alertWin(){
	alert(`You won in ${moveCount/2} moves`);	
	flush = false;
}

setupCards();

myDeck.addEventListener('click',function respond(event){
	if (event.target.nodeName === 'IMG' && flush === true){
		const clickedCard = event.target.parentElement.parentElement;
		clickedCard.classList.add("flip");
		addClickedcard(clickedCard);
		if (moveCount%2 === 0 && openCards.length > 0){
			moveDisplay.textContent = `${moveCount/2} Moves`;
			const newStar = document.createElement('li');
			newStar.innerHTML = `<i class="fas fa-star"></i>`;
			starBar.appendChild(newStar);
			flush = false;
			setTimeout(checkMatch,1000);}
		
		if (openCards.length === 16){
			setTimeout(alertWin,1200);	
		}
	}
});

reloadButton.addEventListener('click',function respond(){
	flush = false;
	resetCards();
	setTimeout(setupCards,500);
	starBar.innerHTML=``;
	moveDisplay.textContent = `0 Moves`;
});



