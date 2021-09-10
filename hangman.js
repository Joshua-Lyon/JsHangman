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
    }

    $('#wordSet').innerText = wordSet;   
    words = (await (await fetch(path)).text()).split('\n');
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
}

function setCountryWord(){
    var countryIndex = randomint(0, words.length-1)
    word = words[countryIndex].toLocaleUpperCase().trim().replace(/ /g, "/");
    words.splice(countryIndex, 1);

    startGame();
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
        letter.style.margin = "0.5em"
        id("wordContainer").append(letter)
    }
    id('wordContainer').hidden = false;
}

$('#guessInput').addEventListener('input', e => {guess(e.data.toUpperCase())})


function $ (query){
    return document.querySelector(query);
}


function guess(letter){

    id('guessInput').value = "";

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
    }
        

    hiddenWord = newHiddenWord
    
    showHiddenWord();
    
    if (hiddenWord == word){
        id('guessContainer').hidden = true;
        id('Won').hidden = false;
        listenForLetters = false;
    }
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