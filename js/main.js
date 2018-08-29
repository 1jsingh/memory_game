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
	remainingStars = 3;
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
let remainingStars;
const myDeck = document.querySelector(".deck");
const moveDisplay = document.querySelector(".moveDisplay");
const starBar = document.querySelector(".stars");
const reloadButton = document.querySelector(".reload_btn");
const starList = starBar.children;
const displayTimer = document.querySelector(".timeDisplay");
const alertBanner = document.querySelector(".alertBanner");
let time = 0;
let timer;

function incrementTimer(){
	time++;
	displayTimer.innerHTML = `${time} sec`;
}

function resetCards(){
	for (const mycard of openCards){
		mycard.classList.remove("flip");
	}
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
	clearInterval(timer);
	alertBanner.firstElementChild.innerHTML = `You won!<br>Star rating : ${remainingStars}<br>Time : ${time} sec<br>Moves : ${moveCount/2}`;
	alertBanner.showModal();
	flush = false;
}

function resetStars(){
	for (const star of starList){
		star.innerHTML = `<i class="fas fa-star"></i>`;
	}
}

// initial setup of cards
setupCards();

// alertBanner.showModal();

// event listener for click on cards
myDeck.addEventListener('click',function respond(event){
	if (event.target.nodeName === 'IMG' && flush === true){
		const clickedCard = event.target.parentElement.parentElement;
		
		// flip the clicked card to reveal the image
		clickedCard.classList.add("flip");
		
		// add clicked card to openCards list
		addClickedcard(clickedCard);

		// starts the timer when the first card is clicked
		if (moveCount === 1){
			timer = setInterval(incrementTimer,1000);
		}

		// checks if the cards are matching
		if (moveCount%2 === 0 && openCards.length > 0){
			moveDisplay.textContent = `${moveCount/2} Moves`;
			flush = false;
			setTimeout(checkMatch,1000);}
		
		// decreases the star rating after a certain number of moves
		if (moveCount === 24){
			remainingStars--;
			starList[0].innerHTML = `<i class="far fa-star"></i>`;
		}

		// decreases the star rating after a certain number of moves
		if (moveCount === 32){
			remainingStars--;
			starList[1].innerHTML = `<i class="far fa-star"></i>`;
		}

		// decreases the star rating after a certain number of moves
		if (moveCount === 40){
			remainingStars--;
			starList[2].innerHTML = `<i class="far fa-star"></i>`;
		}

		// gives a win alert when all cards are opened
		if (openCards.length === 16){
			setTimeout(alertWin,1200);	
		}
	}
});

function reload(){
	// stop and reset the timer
	clearInterval(timer);
	time = 0; 
	displayTimer.innerHTML = `0 sec`;

	// flip back the cards
	resetCards();

	// shuffle the cards
	setTimeout(setupCards,500);

	// reset the move counter
	moveDisplay.textContent = `0 Moves`;

	// reset stars
	resetStars();
}

// event listener for click on the reload button 
reloadButton.addEventListener('click',function respond(){
	reload();
});

const playAgain = document.querySelector(".playAgain");
const closeBanner = document.querySelector(".closeBanner");

playAgain.addEventListener('click',function respond(){
	alertBanner.close();
	reload();
});

closeBanner.addEventListener('click',function respond(){
	alertBanner.close();
});

