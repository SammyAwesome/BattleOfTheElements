///////////////////////////////////////////////////////////////
//                                                           //
//                    CONSTANT STATE                         //

// TODO: DECLARE and INTIALIZE your constants here
var START_TIME = currentTime();
var Card1Holders = []
var Card2Holders = []
var hand = []
var cards = {trox:{name:"trox",element:"earth",rarity:4,attack:97,defense:99,creative:91,agility:89,effect1:"defenseBOOST3",effect2:"teamGame2"},riota:{name:"riota",element:"fire",rarity:4,attack:99,defense:85,creative:97,agility:96,effect1:"attackBOOST3",effect2:"stategy2"}}

var handCards = []
var deckCards = [cards.trox,cards.riota]
var graveCards = []
var row1Cards = []
var row2Cards = []

for(var r = 0;r<2;r++){
	for(var c = 0; c<5 - r; c++){
		insertBack(Card1Holders, {x:(c-2+r/2)* 200 + (screenWidth/2) - 75,y: (screenHeight/8)*(r+1)+ 600, color:makeColor(1,1,1)})
	}
}
for(var r = 0;r<2;r++){
	for(var c = 0; c<5 - r; c++){
		insertBack(Card2Holders, {x:(c-2+r/2)* 200 + (screenWidth/2) -75,y: 250 -((screenHeight/8)*(r-1)), color:makeColor(.9,.3,.3)})
	}
}
for(var i = 0; i<5;i++){
	insertBack(hand, {x:screenWidth/2 + (i - 2) * 170 - 75, y:screenHeight - 150, color:makeColor(.5,.5,.5)})
}
///////////////////////////////////////////////////////////////
//                                                           //
//                     MUTABLE STATE                         //

// TODO: DECLARE your variables here
var lastKeyCode;

///////////////////////////////////////////////////////////////
//                                                           //
//                      EVENT RULES                          //

// When setup happens...
function onSetup() {
    // TODO: INITIALIZE your variables here
    lastKeyCode = 0;
}


// When a key is pushed
function onKeyStart(key) {
    lastKeyCode = key;
}
function receiveCard(){
	if(deckCards.length > 0 && handCards.length < 5){
		insertBack(handCards, deckCards[deckCards.length - 1])
		removeAt(deckCards, deckCards.length - 1)
	}
}
function drawCardHolders(card){
	var x = card.x
	var y = card.y
	var c = card.color
	fillPolygon([x,y,x+75,y-25,x+150,y,x+150,y+125,x+75,y+150,x,y+125],c)
}

function drawHand(){
	for(var i = 0; i < handCards.length; i++){
		fillText(handCards[i].name, screenWidth/2 + (i - 2) * 170, screenHeight - 150, makeColor(1, 1, 1), "30pt Baloo Bhaina", "center", "bold")
		
		fillText("cre: " + handCards[i].creative, screenWidth/2 + (i - 2) * 170 + 40, screenHeight - 80, makeColor(1, 1, 1), "18pt Baloo Bhaina", "center", "bold")
		fillText("agi:" + handCards[i].agility, screenWidth/2 + (i - 2) * 170 - 40, screenHeight - 80, makeColor(1, 1, 1), "18pt Baloo Bhaina", "center", "bold")
		fillText("def: " + handCards[i].defense, screenWidth/2 + (i - 2) * 170 + 40, screenHeight - 50, makeColor(1, 1, 1), "18pt Baloo Bhaina", "center", "bold")
		fillText("att: " + handCards[i].attack, screenWidth/2 + (i - 2) * 170- 40, screenHeight - 50, makeColor(1, 1, 1), "18pt Baloo Bhaina", "center", "bold")
		
	}
}
// Called 30 times or more per second
function onTick() {
    // Some sample drawing 
	sw2 = screenWidth/2
	
    fillRectangle(0,0,screenWidth,screenHeight,makeColor(51/255,32/255,8/255))
	fillPolygon([sw2 - 500, screenHeight, sw2 - 450, screenHeight - 160, sw2 + 450, screenHeight - 160, sw2 + 500, screenHeight], makeColor(240/255,230/255,140/255))
	fillPolygon([sw2 - 500, screenHeight, sw2 - 450, screenHeight - 160, sw2 + 450, screenHeight - 160, sw2 + 500, screenHeight], makeColor(240/255,230/255,140/255))
	//fillOval()
	drawCardHolders({x: 250, y:800,color:makeColor(0,0,0),type:"deck"})
	drawCardHolders({x: screenWidth - 400, y:800,color:makeColor(0,0,0),type:"dead"})
	fillRectangle(0,0,200,screenHeight,makeColor(240/255,230/255,140/255))
	fillRectangle(screenWidth-200,0,screenWidth,screenHeight,makeColor(240/255,230/255,140/255))
	strokeLine(0,screenHeight/2,screenWidth, screenHeight/2,makeColor(240/255,230/255,140/255),12)
	receiveCard()
	
//	fillRectangle(screenWidth/2-400,screenHeight-200, 800, 200, makeColor(220/255,118/255,10/255))
	for(var i = 0; i < Card1Holders.length; i++){
		drawCardHolders(Card1Holders[i])
	}
	for(var i = 0; i < Card2Holders.length; i++){
		drawCardHolders(Card2Holders[i])
	}
	for(var i = 0; i < hand.length; i++){
		drawCardHolders(hand[i])
	}
	drawHand()
  // strokeLine(screenWidth/2, 0, screenWidth/2, screenHeight, makeColor(1,1,1), 2)	
}


///////////////////////////////////////////////////////////////
//                                                           //
//                      HELPER RULES                         //
