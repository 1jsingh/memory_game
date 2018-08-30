# Memory game
Its an implementation of memory matching game interface using DOM and javascript

## Requirements
* Web browser supporting html5(Chrome)
* Text editor(Sublime Text/Atom)

## Usage
Just open the index.html file in any modern browser to play the game

## Game play
* click on a card to start the game , doing so would reveal the card image and start the game timer
* if the next clicked card also has the same image as the previously opened card both the cards are left open and frozen
* otherwise both the cards are flipped downwards , hiding the card image
* The game is won once all the cards are opened
* Try to minimize the time and number of moves taken to win the game
* You also get a star rating based upon the move count : 
  * 3 for less than 12 moves 
  * 2 for less than 16 moves
  * 1 for less than 20 moves
  * 0 for more than or equal to 20 moves
