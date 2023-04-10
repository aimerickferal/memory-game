const game = {
  // Proprietes availables in the object.
  imagesFolderPath: null,
  numberOfAttempts: null,
  images: [],
  clickedImages: [],
  clickedImageIds: [],
  matchedImages: [],
  // ======================= DOM ELEMENTS =======================
  grid: null,
  score: null,
  message: null,
  init: function () {
    console.log("Hello world, I'm game.js 👾");

    game.imagesFolderPath = "../assets/images/";

    // We create a array of images.
    game.images = [
      {
        name: "red",
        img: game.imagesFolderPath + "red.png",
      },
      {
        name: "red",
        img: game.imagesFolderPath + "red.png",
      },
      {
        name: "safety-orange",
        img: game.imagesFolderPath + "safety-orange.png",
      },
      {
        name: "safety-orange",
        img: game.imagesFolderPath + "safety-orange.png",
      },
      {
        name: "yellow",
        img: game.imagesFolderPath + "yellow.png",
      },
      {
        name: "yellow",
        img: game.imagesFolderPath + "yellow.png",
      },
      {
        name: "blue",
        img: game.imagesFolderPath + "blue.png",
      },
      {
        name: "blue",
        img: game.imagesFolderPath + "blue.png",
      },

      {
        name: "green",
        img: game.imagesFolderPath + "green.png",
      },
      {
        name: "green",
        img: game.imagesFolderPath + "green.png",
      },
      {
        name: "purple",
        img: game.imagesFolderPath + "purple.png",
      },
      {
        name: "purple",
        img: game.imagesFolderPath + "purple.png",
      },
    ];

    // We randomize game.images.
    game.images.sort(() => 0.5 - Math.random());

    // We initialize a counter for the number of attempts.
    game.numberOfAttempts = 0;

    // ======================= DOM ELEMENTS =======================

    game.grid = document.querySelector(".grid");
    game.score = document.getElementById("score");
    game.message = document.getElementById("message");

    if (game.grid) {
      // We call the game.createBoard() to create the game board.
      game.createBoard();
    }
  },
  /**
   * Method that create multiplie HTML elements <img>, set some attributes to them and add them to the DOM in order to create and display the game board.
   * @return {void}
   */
  createBoard: function () {
    console.log("game.createBoard()");

    // We get the index of each images in game.images.
    for (let index = 0; index < game.images.length; index++) {
      // We create a HTML element <img>.
      let img = document.createElement("img");
      // We set a src attribute with a path to the folder where we backup the images.
      img.setAttribute("src", game.imagesFolderPath + "blank.png");
      // We set a class and a class name to the <img>.
      img.setAttribute("class", "grid__image");
      // We set dynamically a id attribute to the <img>.
      img.setAttribute("id", index);
      // We add a listener and a handler on the click event to the <img>.
      img.addEventListener("click", game.switchImage);
      // We add the <img> to game.grid.
      game.grid.appendChild(img);
    }
  },

  /**
   * Method that switch a image on the click event.
   * @param {Event} event
   * @return {void}
   */
  switchImage: function (event) {
    console.log("game.switchImage()");

    // We get the DOM element from which the event occured.
    let clickedImage = event.currentTarget;

    // We get the id of the clickedImage.
    let clickedImageId = clickedImage.getAttribute("id");

    // We push each image, according to it's id, to game.clickedImages and we get the name property of the image.
    game.clickedImages.push(game.images[clickedImageId].name);

    // We push each image id to game.clickedImageIds.
    game.clickedImageIds.push(clickedImageId);

    // We add a CSS class to clickedImage to prevent the user to be able to click on it.
    tools.addClassToElements("grid__image_pointer-events_none", clickedImage);

    // We set a src attribute with in value the path of the image according to the clickedImageId.
    clickedImage.setAttribute("src", game.images[clickedImageId].img);

    if (game.clickedImages.length === 2) {
      // We call the method game.checkForMatch() after a delay of 150 milliseconds to be shure that the code don't excute to fast.
      setTimeout(game.checkForMatch, 150);

      // We add a 1 to game.numberOfAttempts.
      game.numberOfAttempts++;
    }
  },
  /**
   * Method that check if the name of the image of the first game.clickedImages is the same as the name of the image of the second game.clickedImages.
   * @return {void}
   */
  checkForMatch: function () {
    console.log("game.checkForMatch()");

    // We get all the img that we created in game.createBoard().
    let imgs = document.querySelectorAll("img");

    // At this point game.clickedImages and game.clickedImageIds contains each two value. the two clickedImages and both ids of this two clickedImages.
    // We get the first value of game.clickedImageIds which is the id of the first clickedImage.
    const optionOnId = game.clickedImageIds[0];
    // We get the second value of game.clickedImageIds which is the id of the second clickedImage.
    const optionTwoId = game.clickedImageIds[1];

    // console.log(game.clickedImages[0]);
    // console.log(game.clickedImages[1]);
    // console.log(imgs[optionOnId]);
    // console.log(imgs[optionTwoId]);

    // The first value of game.clickedImages is the name of the image it contain.
    // If the name of the first game.clickedImages is strictly equal to the name of the second game.clickedImages.
    if (game.clickedImages[0] === game.clickedImages[1]) {
      // We display a dialog box with a message to te browser.
      alert("You find a match ! ✅");

      // We set a src attribute with the path of the folder where we backup the image we want to display.
      imgs[optionOnId].setAttribute(
        "src",
        game.imagesFolderPath + "check-mark.svg"
      );
      imgs[optionTwoId].setAttribute(
        "src",
        game.imagesFolderPath + "check-mark.svg"
      );

      // We push each game.clickedImages to game.matchedImages.
      game.matchedImages.push(game.clickedImages);
      // We add several CSS classes to both of the images to display the check mark.
      tools.addClassesToElement(
        imgs[optionOnId],
        "grid__image-check-mark",
        "grid__image-check-mark_color_green"
      );
      tools.addClassesToElement(
        imgs[optionTwoId],
        "grid__image-check-mark",
        "grid__image-check-mark_color_green"
      );
    }
    // Else the images don't match each others.
    else {
      // We set a src attribute with the path of the folder where we backup the image we want to display which will be the same that the one we set in game.creatBoard() to allow the user to play again.;
      imgs[optionOnId].setAttribute("src", game.imagesFolderPath + "blank.png");
      imgs[optionTwoId].setAttribute(
        "src",
        game.imagesFolderPath + "blank.png"
      );

      // We remove several CSS classes from both of the images to prevent the user to be able to click on them.
      tools.removeClassFromElements(
        "grid__image_pointer-events_none",
        imgs[optionOnId],
        imgs[optionTwoId]
      );

      // We display a dialog box with a message to te browser.
      alert("The images do not match ❌. Try again !");
    }

    // We empty our array to allow the user to start playing again.
    game.clickedImages = [];
    game.clickedImageIds = [];

    // We display the user score.
    game.displayScore();
  },
  /**
   * Method that display the user score.
   * @return {void}
   */
  displayScore: function () {
    console.log("game.displayScore()");

    // We use the innerText property of game.score to display the score of the user.
    game.score.innerText =
      "Score : " +
      `${game.matchedImages.length}` +
      " / " +
      `${game.numberOfAttempts}`;

    // If the length of game.matchedImages is strictly equal to game.images split by 2 because each images appear two times.
    if (game.matchedImages.length === game.images.length / 2) {
      // We have collected all the possible images of game.images.
      // We use the innerText property of game.message to display the score of the user.
      game.message.innerText = "Congratulations ! You win 🏆 ";
    }
  },
};
