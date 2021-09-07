var word = "";
var hiddenWord = "";
var hiddenChar = "_";
var lives = 10;
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
}

function setOwnWord(){
    word = id("setWord").value.toUpperCase();
    setHiddenWord();
    showHiddenWord();
    id("setWordContainer").hidden = true;
    id("guessContainer").hidden = false;
}

function setCountryWord(){

}

function setHiddenWord(){
    hiddenWord = ""
    for (var c of word){
        hiddenWord += hiddenChar;
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
    
}

id('guessInput').addEventListener('keydown', e => {guess(e.key.toUpperCase())})


function guess(letter){

    id('guessInput').value = "";
    if (letter.length != 1)
        return hiddenWord;
    
    var newHiddenWord = "";

    for (var i = 0; i < word.length; i++){
        if (word[i] == letter)
            newHiddenWord += letter;
        else
            newHiddenWord += hiddenWord[i];

    }
    hiddenWord = newHiddenWord

    showHiddenWord();
}

function main(){



}

function id(id){
    return document.getElementById(id);
}