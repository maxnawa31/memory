//variables containing links to images
var lasMeninas = "https://content3.cdnprado.net/imagenes/Documentos/imgsem/68/6871/68718fb0-d062-4db4-bf25-7af5824eebac/d44c40de-9d5b-4280-a096-9f63b116dcec.jpg"
var garden = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Hieronymus_Bosch_-_The_Garden_of_Earthly_Delights_-_Garden_of_Earthly_Delights_%28Ecclesia%27s_Paradise%29.jpg/400px-Hieronymus_Bosch_-_The_Garden_of_Earthly_Delights_-_Garden_of_Earthly_Delights_%28Ecclesia%27s_Paradise%29.jpg"
var nighthawks = "https://secure.img2-fg.wfcdn.com/im/10530227/resize-h600-w600%5Ecompr-r85/4557/4557414/%27Nighthawks%27+by+Edward+Hopper+Framed+Painting+Print.jpg"
var rothko = "https://media.nga.gov/public/objects/5/6/3/5/0/56350-primary-0-740x560.jpg"
var oath = "https://imgc.allpostersimages.com/img/print/posters/jacques-louis-david-the-oath-of-the-horatii_a-G-2587543-8880731.jpg"
var vanGough = "http://www.theartstory.org/images20/works/van_gogh_vincent_3.jpg"
var guernica = "https://news.artnet.com/app/news-upload/2017/01/guernica_1-256x256.jpg"
var athens = "https://imgc.artprintimages.com/img/print/print/raphael-school-of-athens-circa-1510-1512-one-of-the-murals-raphael-painted-for-pope-julius-ii_a-l-2572141-8880731.jpg?w=550&h=550"
var cards = [lasMeninas, lasMeninas, garden, garden, nighthawks, nighthawks, rothko, rothko, oath, oath, guernica, guernica];
var $divs = $(".cell")
var moma = "http://educationaltravelconsultants.com/blog/wp-content/uploads/moma1.jpg"
var counter = 0;

// function newGame() {
//   $divs.each(function() {
//     $(this).off("click", func) // remove event listeners from each item;
//   })
// }


//function startGame is called when user presses button;
function startGame() {

  $divs.each(function() {
    $(this).off("click", func)
    $(this).css("background-image", 'url(' + moma + ')'); //set background back to original image;
  })
  counter = 0; //reset counter for score
  var shuffledCards = shuffle(cards); // implements shuffle method
  $('#counter').html(counter);
  $divs.each(function(index) {
    $(this).attr("data-url", shuffledCards[index]); //image url to its dataset and add class "unmatched";
    $(this).addClass("unmatched");
    $(this).css("backgroundPosition", "center"); // style background position
    $(this).on("click", func) //add event listener to each image;
  }) //itereate over all divs with class of "cell" and attach unique

}

///function that is passed to the "click" event listener attached to each image;
function func() {
  $(this).css("background-image", 'url(' + $(this).attr("data-url") + ')'); //set each background url to its unique dataset
  $(this).css("backgroundPosition", "center"); //set background position for each image
  $(this).addClass("clicked"); //add class clicked if clicked;
  counter = counter + 1; //incrememt counter by 1
  $('#counter').html(counter) //change display number of counter
  console.log(counter);
  checkMatch(); //run checkMatch function to see if theres a match
}

//function checkMatch is called after image is clicked on.
function checkMatch() {
  var $clickedItems = $(".clicked") //get all elements with class of clicked
  console.log($clickedItems);
  console.log($clickedItems.length)
  if ($clickedItems.length === 2) { //run this code if there are two items clicked
    if ($(($clickedItems)[0]).attr("data-url") === $(($clickedItems)[1]).attr("data-url")) { //if the two clicked items have the same url, run this code:
      $clickedItems.each(function() { //use array.from in order to create new array instance from array - like object
        $(this).css("background-image", 'url(' + $(this).attr("data-url") + ')'); //for each item in array, make permanent change to background image;
        $(this).css("backgroundPosition", "center");
        $(this).removeClass("unmatched"); //remove the unmatched class from image;

      })
      $clickedItems.each(function() { //remove clicked class from both items.
        $(this).removeClass("clicked");
      })

      checkWinner(); //check to see if there is a winner after finding a match;
    } else { //run this code if there are no matches after two items are clicked;
      setTimeout(function() { // run a settimeout function after 1 sec;
        $clickedItems.each(function() { //iterate over all items with clicked class;
          $(this).css("background-image", 'url(' + moma + ')'); // set backgrounds to default background;
          $(this).removeClass("clicked"); //remove the clicked class;
          $(this).css("backgroundPosition", "center"); // set background position.
        })
      }, 1000)
    }
  }
}

//run this code to check for winner after each match is found;
function checkWinner() {
  var $clearAll = $(".clicked"); // get both elements that were clicked;
  var $allUnmatched = $(".unmatched"); // grab all other elements on board;
  if ($allUnmatched.length === 0) { // if there are no more elements with class of "unmatched", run this code;
    var name = prompt("Game Over! Please Enter Your Name.")
    localStorage.setItem(name, counter);
    scoreBoard(name, counter) //alert the player that they won the game;
    counter = 0; //reset the score counter to 0;
    $clearAll.each(function() { //remove the clicked class;
      $(this).removeClass("clicked");
    })
    $divs.each(function() {
      $divs[i].off() // remove event listeners from each item;
      $divs[i].css("background-image", 'url(' + moma + ')'); //set background back to original image;
    })

    newGame();
    startGame(); // automatically start a new game for user;
    return $divs;
  }
}


function scoreBoard(name) { // scoreboard function to display score of player
  console.log(name)
  var playerName = localStorage.getItem(name);
  var $scoreList = $("#score-page");
  var $newItem = $("<li></li>");
  $newItem.html(name + " : " + playerName);
  $scoreList.append($newItem);
  console.log($newItem)
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
