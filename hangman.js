var word = "";
var hiddenWord = "";
var hiddenChar = "_";
var spaceChar = "/";
var lives = 10;
var guessed = "";
const startLives = 10;
var listenForLetters = false;
var countries = [
"Afghanistan",
"Albania",
"Algeria",
"Andorra",
"Angola",
"Antigua and Barbuda",
"Argentina",
"Armenia",
"Australia",
"Austria",
"Austrian Empire",
"Azerbaijan",
"The Bahamas",
"Bahrain",
"Bangladesh",
"Barbados",
"Belarus",
"Belgium",
"Belize",
"Benin (Dahomey)",
"Bolivia",
"Bosnia and Herzegovina",
"Botswana",
"Brazil",
"Brunei",
"Bulgaria",
"Burkina Faso (Upper Volta)",
"Burma",
"Burundi",
"Cabo Verde",
"Cambodia",
"Cameroon",
"Canada",
"The Cayman Islands",
"Central African Republic",
"Chad",
"Chile",
"China",
"Colombia",
"Comoros",
"Costa Rica",
"Croatia",
"Cuba",
"Cyprus",
"Czechia",
"Czechoslovakia",
"Democratic Republic of the Congo",
"Denmark",
"Djibouti",
"Dominica",
"Dominican Republic",
"Ecuador",
"Egypt",
"El Salvador",
"Equatorial Guinea",
"Eritrea",
"Estonia",
"Eswatini",
"Ethiopia",
"Fiji",
"Finland",
"France",
"Gabon",
"Georgia",
"Germany",
"Ghana",
"Greece",
"Grenada",
"Guatemala",
"Guinea",
"Guinea-Bissau",
"Guyana",
"Haiti",
"Holy See",
"Honduras",
"Hungary",
"Iceland",
"India",
"Indonesia",
"Iran",
"Iraq",
"Ireland",
"Israel",
"Italy",
"Jamaica",
"Japan",
"Jordan",
"Kazakhstan",
"Kenya",
"Kiribati",
"Korea",
"Kosovo",
"Kuwait",
"Kyrgyzstan",
"Laos",
"Latvia",
"Lebanon",
"Lesotho",
"Liberia",
"Libya",
"Liechtenstein",
"Lithuania",
"Luxembourg",
"Madagascar",
"Malawi",
"Malaysia",
"Maldives",
"Mali",
"Malta",
"Marshall Islands",
"Mauritania",
"Mauritius",
"Mexico",
"Micronesia",
"Moldova",
"Monaco",
"Mongolia",
"Montenegro",
"Morocco",
"Mozambique",
"Namibia",
"Nauru",
"Nepal",
"The Netherlands",
"New Zealand",
"Nicaragua",
"Niger",
"Nigeria",
"North Macedonia",
"Norway",
"Oman",
"Pakistan",
"Palau",
"Panama",
"Papua New Guinea",
"Paraguay",
"Peru",
"Philippines",
"Poland",
"Portugal",
"Qatar",
"South Korea",
"Republic of the Congo",
"Romania",
"Russia",
"Rwanda",
"Saint Kitts and Nevis",
"Saint Lucia",
"Saint Vincent and the Grenadines",
"Samoa",
"San Marino",
"Sao Tome and Principe",
"Saudi Arabia",
"Schaumburg-Lippe",
"Senegal",
"Serbia",
"Seychelles",
"Sierra Leone",
"Singapore",
"Slovakia",
"Slovenia",
"The Solomon Islands",
"Somalia",
"South Africa",
"South Sudan",
"Spain",
"Sri Lanka",
"Sudan",
"Suriname",
"Sweden",
"Switzerland",
"Syria",
"Tajikistan",
"Tanzania",
"Thailand",
"Timor-Leste",
"Togo",
"Tonga",
"Trinidad and Tobago",
"Tunisia",
"Turkey",
"Turkmenistan",
"Tuvalu",
"Uganda",
"Ukraine",
"Union of Soviet Socialist Republics",
"The United Arab Emirates",
"The United Kingdom",
"Uruguay",
"Uzbekistan",
"Vanuatu",
"Venezuela",
"Vietnam",
"Yemen",
"Zambia",
"Zimbabwe"
];
var gameMode = 0

function setGameMode(choice){
    gameMode = choice;
    if (gameMode == 0)
        id("setWordContainer").hidden = false;
            
    id("chooseGameModeContainer").hidden = true;

    if (gameMode == 1)
        setCountryWord();

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
    countryIndex = randomint(0, countries.length-1)
    word = countries[countryIndex].toLocaleUpperCase().trim().replace(/ /g, "/");
    countries.splice(countryIndex, 1);

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

document.addEventListener('keydown', e => {guess(e.key.toUpperCase())})


function $ (query){
    return document.querySelector(query);
}

function guess(letter){

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
        $('lostWord').innerText = word.replace(/\\/g, " ");
    }
        

    hiddenWord = newHiddenWord
    
    showHiddenWord();
    
    if (hiddenWord == word){
        id('guessContainer').hidden = true;
        id('Won').hidden = false;
        listenForLetters = false;
    }
    //id('guessInput').value = "";
}

function resetGame(){
    word = "";
    hiddenWord = "";
    $('#lostWord').innerText = "";
    $('#guessedLettersContainer').hidden = true;
    id('chooseGameModeContainer').hidden = false;
    id('Won').hidden = true;
    id('Lost').hidden = true;
    id('wordContainer').hidden = true;
    id('lives').hidden = true;
    guessed = "";
    updateGuessedLetters();
    lives = startLives;
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

function id(id){
    return document.getElementById(id);
}