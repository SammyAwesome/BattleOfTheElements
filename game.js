///////////////////////////////////////////////////////////////
//                                                           //
//                    CONSTANT STATE                         //

// TODO: DECLARE and INTIALIZE your constants here
var START_TIME = currentTime();
var testx = 300
var testy = 300
var startMouseX = 0
var startMouseY = 0
var newMouseX = 0
var newMouseY = 0
var moving = false
var turn = true
var movingCard
var cardSpot
var cardNewSpot
var board=[makeArray(5),makeArray(4),makeArray(5)]
var holders=[[],[],[]]
var handIndex= 1
var rowIndex= 1
var earthArenaTexture = loadImage("earthArenaBG.jpg")
var eskatest = loadImage("eskatest.png")
var cardHolderImage = loadImage("EarthCardHolder.png")
var earthHandImage = loadImage("EarthHand.png")
var earthEdge = loadImage("EarthEdge.png")
var xenaImage
//var Card1Holders = []
//var Card2Holders = []
//var hand = []
var cards = {
trox:{name:"trox",element:"earth",rarity:4,attack:97,defense:99,creative:97,agility:89,effect1:"defenseBOOST3",effect2:"teamGame2",image:loadImage("Trox.png"),size:.3},
riota:{name:"riota",element:"fire",rarity:4,attack:99,defense:85,creative:97,agility:98,effect1:"attackBOOST3",effect2:"stategy2",image:undefined},
eska:{name:"eska",element:"water",rarity:4,attack:97,defense:89,creative:99,agility:91,effect1:"creativeBOOST3",effect2:"revive2",image:loadImage("Eska.png"),size:.3},
brisk:{name:"brisk",element:"air",rarity:4,attack:91,defense:92,creative:94,agility:99,effect1:"speedBOOST3",effect2:"death2",image:undefined},
lyca:{name:"lyca",element:"light",rarity:4,attack:91,defense:98,creative:97,agility:98,effect1:"avoid3",effect2:"speedBOOST2",image:undefined},
zye:{name:"zye",element:"darkness",rarity:4,attack:99,defense:95,creative:99,agility:91,effect1:"revive3",effect2:"attackBOOST2",image:undefined},
xena:{name:"xena",element:"magic",rarity:4,attack:98,defense:99,creative:98,agility:97,effect1:"dom3",effect2:"death3",image:loadImage("Xena.png"),size:.05},

}
var cardRow = 3
//var handCards = []
var deckCards = [cards.trox,cards.riota,cards.xena,cards.eska,cards.brisk,cards.lyca,cards.zye]
var graveCards = []
//var row1Cards = []
//var row2Cards = makeArray(4)


for(var r = 0;r<2;r++){
	for(var c = 0; c<5 - r; c++){
		insertBack(holders[0], {x:(c-2+r/2)* 200 + (screenWidth/2) - 75,y: (screenHeight/8)*(r+1)+ 600, color:makeColor(1,1,1)})
	}
}
//OPPONENTS vv
for(var r = 0;r<2;r++){
	for(var c = 0; c<5 - r; c++){
		insertBack(holders[1], {x:(c-2+r/2)* 200 + (screenWidth/2) -75,y: 250 -((screenHeight/8)*(r-1)), color:makeColor(.9,.3,.3)})
	}
}
for(var i = 0; i<5;i++){
	insertBack(holders[2], {x:screenWidth/2 + (i - 2) * 170 - 75, y:screenHeight - 150, color:makeColor(.5,.5,.5)})
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
	
	if(key == 38 && cardRow >=2){
		cardRow--
		
		
	}
	if(key == 32){
		turn = !turn
	}
	if(key == 38){
		testy= testy-10
	}
	if(key == 39){
		testx= testx+10
	}
	if(key == 37){
		testx= testx-10
	}
	if(key == 40){
		testy= testy+10
	}
	if(key == 40 && cardRow <=2){
		cardRow++
		if(cardRow == 2 && rowIndex==5){
			rowIndex = 4
		}
	}
	if(key > 48 && key < 54){
		if(cardRow == 3){
			handIndex =  key - 48
		}else{
			rowIndex = key - 48
		}
		
		
	}
	if(key == 37){
		if(cardRow == 3){
			 if(handIndex >1) {
				handIndex--	
			}
		}else {
			if(rowIndex > 1){
				rowIndex--
				
			}
		}
		
		
	}
	if(key == 39){
		if(cardRow == 3){
			if(handIndex <4 + (cardRow-2)){
				handIndex++
				
			}
			
		}else{
			if(rowIndex <4 + (2 - cardRow)){
				rowIndex++
			}
		}
	}
	if(key == 13  && cardRow == 2){
		board[1][rowIndex-1] = board[2][handIndex-1]
		removeAt(board[2], handIndex-1)
		
	}
	//console.log(cardRow)
	console.log(rowIndex)
}
function outlineCard(place){
	if(cardRow == 3){
		x=holders[2][place-1].x
		y = screenHeight - 150
		c = makeColor(0,0,0)
		//removeAt(handCards, (key - 49))
		strokePolygon([x,y,x+75,y-25,x+150,y,x+150,y+125,x+75,y+150,x,y+125],c, 12, true)
	}else if(cardRow == 2){
		r = 0
		x=(place-3+r/2)* 200 + (screenWidth/2) +25
		y =(screenHeight/4)+ 600
		c= makeColor(0,1,1)
		strokePolygon([x,y,x+75,y-25,x+150,y,x+150,y+125,x+75,y+150,x,y+125],c, 12, true)
	}else if(cardRow == 1){
		
		r = 1
		x=(place-4+r/2)* 200 + (screenWidth/2) +25
		y =(screenHeight/8)+ 600
		c= makeColor(0,.4,0)
		strokePolygon([x,y,x+75,y-25,x+150,y,x+150,y+125,x+75,y+150,x,y+125],c, 12, true)
	}
//	console.log("hello")

//	yy = screenHeight/2
//	xx = screenWidth / 2
//	strokePolygon([xx,yy,xx+75,yy-25,xx+150,yy,xx+150,yy+125,xx+75,yy+150,xx,yy+125],c, 12)
	//console.log(y)
	
}

function outlineField(place){
/*	if(cardRow == 2){
		r = 0
		x=(place-3+r/2)* 200 + (screenWidth/2) - 75
		y =(screenHeight/8) * 2+ 600
		c= makeColor(0,1,1)
		strokePolygon([x,y,x+75,y-25,x+150,y,x+150,y+125,x+75,y+150,x,y+125],c, 12, true)
	}
	if(cardRow == 1){
		//	x:(c-2+r/2)* 200 + (screenWidth/2) - 75,y: (screenHeight/8)*(r+1)+ 600
		
		r = 1
		x=(place-3+r/2)* 200 + (screenWidth/2) * 2 - 75
		y =(screenHeight/4)+ 600
		c= makeColor(0,1,1)
		strokePolygon([x,y,x+75,y-25,x+150,y,x+150,y+125,x+75,y+150,x,y+125],c, 12, true)
	}
	*/
}
function onTouchStart(x,y){
    startMouseX = x
    startMouseY = y
	cardSpot = cardUnderMouse(x,y)
	if (cardSpot != undefined) {
		moving = true;
	}
	console.log("ontouchstart", cardSpot)
	
	
}
function onTouchEnd(x,y){
    moving = false
 //   newMouseX = x
   // newMouseY = y
	cardNewSpot = cardUnderMouse(x,y)
	console.log(cardNewSpot)
	console.log(cardSpot)
	if(cardSpot!=undefined && cardNewSpot!=undefined){
		console.log("4")
		if(cardNewSpot.place != cardSpot.place || cardNewSpot.row != cardSpot.row){
			console.log("3")
			if(cardNewSpot.row <= cardSpot.row){
				console.log(cardSpot)
				var sourceCard = board[cardSpot.row-1][cardSpot.place]
				console.log("2")
				if(sourceCard != undefined){
					var newCard = board[cardNewSpot.row-1][cardNewSpot.place]
					console.log("1")
					if(newCard == undefined){
						if(turn==true){
							console.log("hi")
							board[cardSpot.row-1][cardSpot.place] = undefined
							board[cardNewSpot.row-1][cardNewSpot.place] = sourceCard
							console.log()
						}
					}
				}
			}
		}
	}
	
}
function onTouchMove(x,y){
//    moving = true
    startMouseX = x
    startMouseY = y
    
}
function DragSquare(x,y){
    fillRectangle(x-50,y-50,100,100,makeColor(1,1,1))
}


function cardUnderMouse(x,y){
	var currentRow;
	var currentPlace;
	if(y < screenHeight/4 + 750 && y >screenHeight / 4 + 575){
		
		//((x-left)/screenWidth-2left)*4
		console.log("mid")
	    currentRow = 2
	    r = 0
	    currentPlace = (x- screenWidth/2 -25) / 200 + 2 - r/2 
	//x = (c-2+r/2)* 200 + (screenWidth/2) - 75
	    currentPlace = floor(currentPlace)
		//outlinePath(currentPlace,currentRow)
	
		if(currentPlace > -1 && currentPlace < 4){
			return {place:currentPlace,row:currentRow}
			
		}
	    
	}else if(y < screenHeight/8 + 750 && y >screenHeight / 8 + 575){
		console.log("front row")
	    currentRow = 1
	    
	    r= 1
	    currentPlace = (x- screenWidth/2 -25) / 200 + 2 - r/2
	    currentPlace = floor(currentPlace) +1
	//	outlinePath(currentPlace,currentRow)
	
		if(currentPlace > -1 && currentPlace < 5){
			return {place:currentPlace,row:currentRow}
			
		}
	}
	
	if(y < screenHeight && y >screenHeight - 175){
		
		console.log("hand")
		currentRow = 3
		r=0
		currentPlace = (x+415 - screenWidth/2)/170
	    currentPlace = floor(currentPlace)
	//	outlinePath(currentPlace,currentRow)
	
		if(currentPlace > -1 && currentPlace < 5){
			return {place:currentPlace,row:currentRow}
			
		}
	}
    console.log(currentPlace)
    
}
function receiveCard(){
	
	if(deckCards.length > 0){
		
	    var	y = findHand()
		if(y != undefined){
			w = randomInteger(0,deckCards.length - 1)
			board[2][y] = deckCards[w]
			removeAt(deckCards, w)
		}
		
	}
}
function findHand(){
	for(var i = 0; i < board[2].length; i++){
		if(board[2][i] == undefined){
			return i 
		}
	}
	return undefined
}
function drawCardHolders(card){
	var x = card.x
	var y = card.y
	var c = card.color
//	fillPolygon([x,y,x+75,y-25,x+150,y,x+150,y+125,x+75,y+150,x,y+125, x,y],c)
	drawTransformedImage(cardHolderImage,x + 75,y+65, 0, .1, .1)
}

function drawHand(){
	for(var i = 0; i < board[2].length; i++){
		if(board[2][i] != undefined){
			drawCard(screenWidth/2 + (i - 2) * 170,screenHeight - 80, board[2][i])
			/*
			fillText(board[2][i].name, screenWidth/2 + (i - 2) * 170, screenHeight - 150, makeColor(1, 1, 1), "30pt Baloo Bhaina", "center", "bold")
		
			fillText("cre: " + board[2][i].creative, screenWidth/2 + (i - 2) * 170 + 40, screenHeight - 80, makeColor(1, 1, 1), "18pt Baloo Bhaina", "center", "bold")
			fillText("agi:" + board[2][i].agility, screenWidth/2 + (i - 2) * 170 - 40, screenHeight - 80, makeColor(1, 1, 1), "18pt Baloo Bhaina", "center", "bold")
			fillText("def: " + board[2][i].defense, screenWidth/2 + (i - 2) * 170 + 40, screenHeight - 50, makeColor(1, 1, 1), "18pt Baloo Bhaina", "center", "bold")
			fillText("att: " + board[2][i].attack, screenWidth/2 + (i - 2) * 170- 40, screenHeight - 50, makeColor(1, 1, 1), "18pt Baloo Bhaina", "center", "bold")
			*/
		}
	}
}
function outlinePath(place,row){
	place = place+ 1
	console.log("testplx")
	if(row == 1){
		console.log("test?")
		r = 0
			x=(place-4+r/2)* 200 + (screenWidth/2) + 125
			y =	(screenHeight/8)*(r+1)+ 600
			c= makeColor(0,.4,0)
			strokePolygon([x,y,x+75,y-25,x+150,y,x+150,y+125,x+75,y+150,x,y+125],c, 12, true)
	}
	if(row == 2){
		console.log("test?")
		r = 1
	
			x=(place-4+r/2)* 200 + (screenWidth/2) + 125
			y =	(screenHeight/8)*(r+1)+ 600
			c= makeColor(0,.4,0)
			strokePolygon([x,y,x+75,y-25,x+150,y,x+150,y+125,x+75,y+150,x,y+125],c, 12, true)
	}
/*	if(row == 3){
		console.log("test?")
		r = 1
			x=(place-4+r/2)* 200 + (screenWidth/2) +25
			y =(screenHeight/8)+ 600
			c= makeColor(0,.4,0)
			strokePolygon([x,y,x+75,y-25,x+150,y,x+150,y+125,x+75,y+150,x,y+125],c, 12, true)
	}
	*/
	console.log("place:"+place)
	
//	r = 1
//	x=(place-4+r/2)* 200 + (screenWidth/2) +25
//	y =(screenHeight/8)+ 600
//	c= makeColor(0,.4,0)
//	strokePolygon([x,y,x+75,y-25,x+150,y,x+150,y+125,x+75,y+150,x,y+125],c, 12, true)
}
function drawBackRow(){
	for(var i = 0; i < board[1].length; i++){
		if(board[1][i] != undefined){
		drawCard((i-2+1/2)* 200 + (screenWidth/2),(screenHeight/4)+ 670, board[1][i])

		}	
	}
}
function drawFrontRow(){
	for(var i = 0; i < board[0].length; i++){
		if(board[0][i] != undefined){
			
			drawCard((i-2+1/2)* 200 + (screenWidth/2) -100,(screenHeight/8)+ 670, board[0][i])
		/*
			fillText(board[0][i].name, (i-2+1/2)* 200 + (screenWidth/2) - 100, (screenHeight/8)+ 600, makeColor(0, 0, 0), "30pt Baloo Bhaina", "center", "bold")
		
			fillText("cre: " + board[0][i].creative, (i-2+1/2)* 200 + (screenWidth/2) -60, (screenHeight/8)+ 670, makeColor(0, 0, 0), "18pt Baloo Bhaina", "center", "bold")
			fillText("agi:" + board[0][i].agility, (i-2+1/2)* 200 + (screenWidth/2) - 140, (screenHeight/8)+ 670, makeColor(0, 0, 0), "18pt Baloo Bhaina", "center", "bold")
			fillText("def: " + board[0][i].defense, (i-2+1/2)* 200 + (screenWidth/2) -60, (screenHeight/8)+ 700, makeColor(0, 0, 0), "18pt Baloo Bhaina", "center", "bold")
		
			fillText("att: " + board[0][i].attack, (i-2+1/2)* 200 + (screenWidth/2) - 140, (screenHeight/8)+ 700, makeColor(0, 0, 0), "18pt Baloo Bhaina", "center", "bold")
			*/
		}	
		
	}
}
function drawCard(x,y,card){
	if (card == undefined) {return;}
		if(card.image==undefined){
			fillText(card.name, x-5, y-70, makeColor(0, 0, 0), "30pt Baloo Bhaina", "center", "bold")

			fillText("cre: " + card.creative, x + 35, y, makeColor(0, 0, 0), "18pt Baloo Bhaina", "center", "bold")
			fillText("agi:" + card.agility, x - 45, y, makeColor(0, 0, 0), "18pt Baloo Bhaina", "center", "bold")
			fillText("def: " + card.defense, x + 35, y+30, makeColor(0, 0, 0), "18pt Baloo Bhaina", "center", "bold")
			fillText("att: " + card.attack, x - 45, y+30, makeColor(0, 0, 0), "18pt Baloo Bhaina", "center", "bold")
			
		}
		
		if(card.image != undefined){
			
			drawTransformedImage(card.image,x,y-5,0,card.size,card.size)
			
		}
}
//function onMouseMove(x,y){
//	cardUnderMouse(x,y)
//}
// Called 30 times or more per second
function onTick() {
	
//	console.log(handIndex)
    // Some sample drawing 
	sw2 = screenWidth/2
	
    fillRectangle(0,0,screenWidth,screenHeight,makeColor(51/255,32/255,8/255))
	drawImage(earthArenaTexture)
	//fillPolygon([sw2 - 500, screenHeight, sw2 - 450, screenHeight - 160, sw2 + 450, screenHeight - 160, sw2 + 500, screenHeight], makeColor(240/255,230/255,140/255))
	drawTransformedImage(earthHandImage,sw2, screenHeight,0,.57,.85)
	//fillPolygon([sw2 - 500, screenHeight, sw2 - 450, screenHeight - 160, sw2 + 450, screenHeight - 160, sw2 + 500, screenHeight], makeColor(240/255,230/255,140/255))
	//fillOval()
//	drawTransformedImage(earthHandImage,sw2-500, screenHeight,0, 0,0)
	drawCardHolders({x: 250, y:800,color:makeColor(0,0,0),type:"deck"})
	fillText("cards left: " + deckCards.length, 330, 950, makeColor(1,1,1),"30pt Baloo Bhaina", "center")
	drawCardHolders({x: screenWidth - 400, y:800,color:makeColor(0,0,0),type:"dead"})
	drawTransformedImage(earthEdge,100, 650, 0, .3,.5)
	//fillRectangle(0,0,200,screenHeight,makeColor(240/255,230/255,140/255))
	drawTransformedImage(earthEdge,sw2*2 -100, 650, 0, .3,.5)
	//fillRectangle(screenWidth-200,0,screenWidth,screenHeight,makeColor(240/255,230/255,140/255))
	//strokeLine(0,screenHeight/2,screenWidth, screenHeight/2,makeColor(240/255,230/255,140/255),12)
	receiveCard()
	drawTransformedImage(eskatest,testx,testy,0,.3,.3)
//	fillRectangle(screenWidth/2-400,screenHeight-200, 800, 200, makeColor(220/255,118/255,10/255))
	for(var i = 0; i < holders[0].length; i++){
		drawCardHolders(holders[0][i])
	}
	for(var i = 0; i < holders[1].length; i++){
		drawCardHolders(holders[1][i])
	}
	for(var i = 0; i < holders[2].length; i++){
		drawCardHolders(holders[2][i])
	}
	outlineField(rowIndex)
	if(cardRow==3){
	//	outlineCard(handIndex)
		
	}else{
	//	outlineCard(rowIndex)
		
	}
	
		console.log(turn)
	
	drawHand()
    drawBackRow()
	drawFrontRow()
    if(moving == true){
//	DragSquare(startMouseX,startMouseY)
	drawCard(startMouseX,startMouseY,board[cardSpot.row-1][cardSpot.place])
	var currentSpot = cardUnderMouse(startMouseX, startMouseY)
	if(currentSpot!=undefined){
		outlinePath(currentSpot.place, currentSpot.row)
	 	
	}
    }else{
//	DragSquare(newMouseX,newMouseY)
    }
  // strokeLine(screenWidth/2, 0, screenWidth/2, screenHeight, makeColor(1,1,1), 2)	
}


///////////////////////////////////////////////////////////////
//                                                           //
//                      HELPER RULES                         //
