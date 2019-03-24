/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, activePlayer, roundScore, winCondition;

    startGame();



    //here we don't need to define another function, because we won't use this function again  
    document.querySelector('.btn-roll').addEventListener('click', function(){
    if(winCondition){
        
    // 0.show the dice
    document.querySelector('.dice').style.display = 'block';
        
    // 1.create random variable between 1-6 for dice roll
    var diceRoll = Math.round((Math.random()*5)+1);
    
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + diceRoll + '.png';
    
    
        

    if (diceRoll !== 1) {
            //Add score
            roundScore += diceRoll;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else{
            
            currentPlayer();
            
        }
    }
        
    
})




function currentPlayer(){

    if(activePlayer===0){
        //facem roundscore 0 pentru ca, atunci cand se da 1 cu zarul, playerul curent pierde punctele facute
        roundScore=0
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        
        //daca active player este 0 atunci il setam la 1, pentru ca e tura celuilalt player
        activePlayer=1;
        
        //toggle intra in clasa player-0-panel, verifica daca clasa active este pusa, daca nu o pune, daca este ii da remove
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
    }
    else{
        //facem roundscore 0 pentru ca, atunci cand se da 1 cu zarul, playerul curent pierde punctele facute
        roundScore=0;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        
        //daca active player este 1 atunci il setam la 0, pentru ca e tura celuilalt player
        activePlayer=0;
        
        //toggle intra in clasa player-0-panel, verifica daca clasa active este pusa, daca nu o pune, daca este ii da remove
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
    }
}


//function to set all scores to 0, and to hide the dice
function startGame(){
    
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    totalScore = [0, 0];
    winCondition=true;
    
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('#name-0').textContent='Player 1';
    document.querySelector('#name-1').textContent='Player 2';
    
    
}



document.querySelector('.btn-hold').addEventListener('click', function(){
    
    
    if(winCondition===true){
    // 1. scorul curent se pune in scores, adica sub player 1
    
   scores[activePlayer] += roundScore;
   var score=document.querySelector('.final-score').value;
   console.log(score);
    
    // 2.roundScore curent devine 0, se trece la celalalt player
    document.getElementById('score-' + activePlayer).textContent=scores[activePlayer];
    if(scores[activePlayer] >=score){
        if(score>0){
        document.querySelector('#name-' + activePlayer).textContent='Winner!';
        winCondition=false;
        document.querySelector('#current-' + activePlayer).textContent = 0;
        }
        else{
            alert('Please put a value into the box!');
        }
        
    }

    else{
        currentPlayer();//next player turn!
    }
    }
    

});


document.querySelector('.btn-new').addEventListener('click',startGame);
