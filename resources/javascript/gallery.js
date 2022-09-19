//Array for the images.
const images = [
        "./resources/images/gallery-images/1.png",
        "./resources/images/gallery-images/2.png",
        "./resources/images/gallery-images/3.png",
        "./resources/images/gallery-images/4.png",
        "./resources/images/gallery-images/5.png",
        "./resources/images/gallery-images/6.png",
];

var z_image;
var z_document;
var imageElement;
var newImage;
var currentImage;

/* global variables */
var photoOrder = [1,2,3,4,5,6];

/* shift all images one figure to the left, and change values in photoOrder array to match  */
function rightArrow() {
   for (var i = 0; i < 6; i++) {
      if ((photoOrder[i] + 1) === 7) {
         photoOrder[i] = 1;
      } else {
         photoOrder[i] += 1;
      }
   }

   currentImage = document.getElementById("current");

   var curr = parseInt(currentImage.src[currentImage.src.length-5]) - 1;
   currentImage.src = images[(curr+1)%6];
}

/* shift all images one figure to the right, and change values in photoOrder array to match  */
function leftArrow() {
   for (var i = 0; i < 6; i++) {
      if ((photoOrder[i] - 1) === 0) {
         photoOrder[i] = 6;
      } else {
         photoOrder[i] -= 1;
      }
      
   }
   currentImage = document.getElementById("current");

   var curr = parseInt(currentImage.src[currentImage.src.length-5]) - 1;
   if(curr == 0 )
   {
           currentImage.src = images[5];
   }
   else
   {
           currentImage.src = images[curr - 1];
   }
}

/* open center figure in separate window */
function zoomFig(image) {
        z_image = window.open("zoom-view.html","fullview","width=960,height=960");
        z_image.addEventListener('load',changeImage,false);
        newImage = image;

        z_image.focus();
}
function changeImage(image)
{
        z_document = z_image.document;

        imageElement = z_document.getElementById("fullPicture");

        imageElement.src = newImage.src;
}

/* create event listeners and populate image elements */
function setUpPage() {
   createEventListeners();
   window.setInterval(rightArrow,3000);
}

function createEventListeners()
{
        var nex = document.getElementById("next");
        var pre = document.getElementById("prev");

        nex.addEventListener('click',rightArrow,false);
        pre.addEventListener('click',leftArrow,false);
}

if(window.addEventListener)
{
        window.addEventListener("load",setUpPage,false);
}
else if(window.attachEvent)
{
        window.attachEvent("onload",setUpPage,false);
}