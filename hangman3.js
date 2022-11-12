var word = "";
var hiddenWord = "";
var hiddenChar = "_";
var spaceChar = "/";
var lives = 10;
var guessed = "";
const startLives = 10;
var listenForLetters = false;
var words = [];
var wordNum = 0;
var wordsTotal = 0;
var score = 0;

var gameMode = 0;

async function setGameMode(choice){
    gameMode = choice;
    id("chooseGameModeContainer").hidden = true;

    if (gameMode == 0){
        id("setWordContainer").hidden = false;
        return;
    }
            
    var path = "";
    var wordSet = "";
    switch (gameMode){
        case 1:    
            path = "countries.csv";
            wordSet = "Countries";
            break;
        case 2:
            path = "presidents.csv";
            wordSet = "US Presidents";
            break;
        case 3:
            path = "primeministers.csv";
            wordSet = "UK Prime Ministers";
            break;
        case 4:
            path = "monarchs.csv";
            wordSet = "English Monarchs";
            break;
        case 5:
            path = "animals.csv";
            wordSet = "Animals";
            break;
        case 6:
            path = "simpsons.csv";
            wordSet = "Simpsons Characters";
            break;
        case 7:
            path = "southpark.csv";
            wordSet = "South Park Characters";
    }

    $('#wordSet').innerText = wordSet;   
    words = (await (await fetch(`dataSets/${path}`)).text()).split('\n');
    wordsTotal = words.length;
    setRandomWord();

}

function setOwnWord(){
    word = id("setWord").value.replace(/ /g, "/").toUpperCase();
    startGame();
}

function startGame(){

    setHiddenWord();
    showHiddenWord();
    id("setWordContainer").hidden = true;
    id("guessContainer").hidden = false;
    updateLives();
    $('#guessedLettersContainer').hidden = false;
    listenForLetters = true;
    createLetters();
}

function setRandomWord(){
    wordNum++;
    index = randomint(0, words.length-1)
    word = words[index].toLocaleUpperCase().trim().replace(/ /g, "/");
    words.splice(index, 1);
    updateWordCount();
    startGame();
}

function randomint(min, max){
    var diff = max - min;
    return Math.floor(Math.random() * diff + min);
}

function setHiddenWord(){
    hiddenWord = ""
    for (var c of word){
        if (c.match('^[A-Z]$'))
            hiddenWord += hiddenChar;
        else
            hiddenWord += c;
    }
}

function showHiddenWord(){
    id("wordContainer").innerText = "";
    for (var c of hiddenWord){
        var letter = document.createElement("span")
        letter.innerText = c
        letter.style.margin = "0.15em"
        id("wordContainer").append(letter)
    }
    id('wordContainer').hidden = false;
}

document.addEventListener('keydown', e => {
    disableButton(e.key.toUpperCase());
    guess(e.key.toUpperCase());
});

function disableButton(letter){
    var guessLetter = $(`#guess-letter-${letter}`);
    if (guessLetter == null)
        return;

    $('.last-letter')?.classList.remove("last-letter");
    guessLetter.classList.add("last-letter");
    guessLetter.disabled = true;
    guessLetter.blur();
    
}

function $ (query){
    return document.querySelector(query);
}

function createLetters(){
    var guessContainer = id('guessContainer');

    guessContainer.innerHTML = "";

    for (var i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i ++){
        var a = String.fromCharCode(i);
        var letter = document.createElement("button");
        letter.innerText = a;
        letter.id = `guess-letter-${a}`;
        letter.classList.add("guess-letter");
        letter.onclick = function(a) {return function(e){
            disableButton(a);
            guess(a);
        }}(a);
        guessContainer.append(letter);
    }
}

function guess(letter){
    //id('guessInput').value = "";

    if (!listenForLetters)
        return;

    if (letter.length != 1)
        return;

    if (guessed.includes(letter))
        return;
    
    if (!letter.match(/^[A-Z]$/))    
        return;

    var newHiddenWord = "";
    var found = false;

    for (var i = 0; i < word.length; i++){
        if (word[i] == letter){
            newHiddenWord += letter;
            found = true;
        }
        else
            newHiddenWord += hiddenWord[i];

    }
    if (!found){
        lives--;
        guessed += letter;
        updateGuessedLetters()
        updateLives();
    }
    
    if (lives <= 0){
        id('Lost').hidden = false;
        id('guessContainer').hidden = true;
        listenForLetters = false;
        $('#lostWord').innerText = word.replace(/\\/g, " ");
        $('#play-again-lost')?.focus();
    }
        

    hiddenWord = newHiddenWord
    
    showHiddenWord();
    
    if (hiddenWord == word){
        score += lives;
        updateScore();
        id('guessContainer').hidden = true;
        if (words.length == 0){
            id("FinishedWords").hidden = false;
        }
        else{
            id('Won').hidden = false;
            listenForLetters = false;
            $('#play-again-won')?.focus();
        }
    }
}

function updateScore(){
    if (score == 0)
        id("score").innerText = "";
    else
        id("score").innerText = `Score: ${score}`;
}

function resetGame(){
    word = "";
    hiddenWord = "";
    $('#lostWord').innerText = "";
    $('#guessedLettersContainer').hidden = true;
    id('Won').hidden = true;
    id('Lost').hidden = true;
    id('wordContainer').hidden = true;
    id('lives').hidden = true;
    $('#wordCount').innerText = "";
    guessed = "";
    updateGuessedLetters();
    lives = startLives;
    switch (gameMode){
        case 0:
            $('#setWordContainer').hidden = false;
            break;
        default:
            setRandomWord();
            startGame();
    }
}

function updateLives(){
    id('lives').hidden = false;
    id('livesCount').innerText = lives;
}

function updateGuessedLetters(){
    var guessedText = "";

    for (var i = 0; i < guessed.length; i++){
        if (i==0){
            guessedText += guessed[i];
        }
        else{
            guessedText += `, ${guessed[i]}`;
        }
    }

    id('guessedLetters').innerText = guessedText;
}

function updateWordCount(){
    $('#wordCount').innerText = `Word ${wordNum} of ${wordsTotal}`;
}

function id(id){
    return document.getElementById(id);
}