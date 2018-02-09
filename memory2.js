//variables containing links to images
var lasMeninas = "https://media1.britannica.com/eb-media/03/4903-004-7438539D.jpg"
var garden = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Hieronymus_Bosch_-_The_Garden_of_Earthly_Delights_-_Garden_of_Earthly_Delights_%28Ecclesia%27s_Paradise%29.jpg/400px-Hieronymus_Bosch_-_The_Garden_of_Earthly_Delights_-_Garden_of_Earthly_Delights_%28Ecclesia%27s_Paradise%29.jpg"
var nighthawks = "https://secure.img2-fg.wfcdn.com/im/10530227/resize-h600-w600%5Ecompr-r85/4557/4557414/%27Nighthawks%27+by+Edward+Hopper+Framed+Painting+Print.jpg"
var rothko = "https://media.nga.gov/public/objects/5/6/3/5/0/56350-primary-0-740x560.jpg"
var oath = "https://imgc.allpostersimages.com/img/print/posters/jacques-louis-david-the-oath-of-the-horatii_a-G-2587543-8880731.jpg"
var vanGough = "http://www.theartstory.org/images20/works/van_gogh_vincent_3.jpg"
var guernica = "https://news.artnet.com/app/news-upload/2017/01/guernica_1-256x256.jpg"
var athens = "https://imgc.artprintimages.com/img/print/print/raphael-school-of-athens-circa-1510-1512-one-of-the-murals-raphael-painted-for-pope-julius-ii_a-l-2572141-8880731.jpg?w=550&h=550"
var cards = [lasMeninas, lasMeninas, garden, garden, nighthawks, nighthawks, rothko, rothko, oath, oath, guernica, guernica];
var divs = document.getElementsByClassName("cell")
var moma = "http://educationaltravelconsultants.com/blog/wp-content/uploads/moma1.jpg"
var counter = 0;



//function startGame is called when user presses button;
function startGame() {

  for (var i = 0; i < divs.length; i++) {
    divs[i].removeEventListener("click", func) // remove event listeners from each item;
    divs[i].style.background = 'url(' + moma + ')'; //set background back to original image;
  }
  counter = 0; //reset counter for score
  var shuffledCards = shuffle(cards); // implements shuffle method
  document.getElementById('counter').innerHTML = counter;
  for (var i = 0; i < divs.length; i++) { //itereate over all divs with class of "cell" and attach unique
    divs[i].dataset.icon = shuffledCards[i]; //image url to its dataset and add class "unmatched";
    divs[i].classList.add("unmatched");
    divs[i].style.backgroundPosition = "center"; // style background position
    divs[i].addEventListener("click", func) //add event listener to each image;
  }

}

///function that is passed to the "click" event listener attached to each image;
function func() {
  var clicked = document.getElementsByClassName("clicked");
  if(clicked.length < 2){
  this.style.background = 'url(' + this.dataset.icon + ')'; //set each background url to its unique dataset
  this.style.backgroundPosition = "center"; //set background position for each image
  this.classList.add("clicked"); //add class clicked if clicked;


    counter++;

   //incrememt counter by 1
  document.getElementById('counter').innerHTML = counter //change display number of counter
  console.log(counter);
  checkMatch(); //run checkMatch function to see if theres a match
  }
}
//function checkMatch is called after image is clicked on.
function checkMatch() {
  var clickedItems = document.getElementsByClassName("clicked") //get all elements with class of clicked
  console.log(clickedItems);
  console.log(clickedItems.length)
  if (clickedItems.length === 2) { //run this code if there are two items clicked
    if (clickedItems[0].dataset.icon === clickedItems[1].dataset.icon) { //if the two clicked items have the same url, run this code:
      Array.from(clickedItems).forEach(function(value) { //use array.from in order to create new array instance from array - like object
        value.style.background = 'url(' + value.dataset.icon + ')'; //for each item in array, make permanent change to background image;
        value.style.backgroundPosition = 'center';
        value.classList.remove("unmatched"); //remove the unmatched class from image;
        value.removeEventListener("click", func)
      })
      Array.from(clickedItems).forEach(function(item) { //remove clicked class from both items.
        item.classList.remove("clicked");
      })

      checkWinner(); //check to see if there is a winner after finding a match;
    } else { //run this code if there are no matches after two items are clicked;
      setTimeout(function() { // run a settimeout function after 1 sec;
        Array.from(clickedItems).forEach(function(card) { //iterate over all items with clicked class;
          card.style.background = 'url(' + moma + ')'; // set backgrounds to default background;
          card.classList.remove("clicked"); //remove the clicked class;
          card.style.backgroundPosition = "center"; // set background position.
        })
      }, 1000)
    }
  }
}

//run this code to check for winner after each match is found;
function checkWinner() {
  var clearAll = document.getElementsByClassName("clicked"); // get both elements that were clicked;
  var allUnmatched = document.getElementsByClassName("unmatched"); // grab all other elements on board;
  if (allUnmatched.length === 0) { // if there are no more elements with class of "unmatched", run this code;
    var name = prompt("Game Over! Please Enter Your Name.")
    localStorage.setItem(name, counter);
    scoreBoard(name, counter) //alert the player that they won the game;
    counter = 0; //reset the score counter to 0;
    Array.from(clearAll).forEach(function(value) { //remove the clicked class;
      value.classList.remove("clicked");
    })
    for (var i = 0; i < divs.length; i++) {
      divs[i].removeEventListener("click", func) // remove event listeners from each item;
      divs[i].style.background = 'url(' + moma + ')'; //set background back to original image;
    }

    startGame(); // automatically start a new game for user;
    return divs;
  }
}


function scoreBoard(name) { // scoreboard function to display score of player
  console.log(name)
  var playerName = localStorage.getItem(name);
  var scoreList = document.getElementById("score-page");
  var newItem = document.createElement("li");
  newItem.innerHTML = name + " : " + playerName;
  scoreList.appendChild(newItem);
  console.log(newItem)
}


//fisher yates shuffle algorithm
function shuffle(a) {
  var newArray = a.slice()
  var j, x, i;
  for (i = newArray.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = x;
  }
  return newArray;
}
