//global variables
//  declare displayed img 1, 2, 3
var total_clicks = 25; //decriment from 25 before displaying results
var product_block = document.getElementById('product_block');
var right_img = document.getElementById('img_right');
var center_img = document.getElementById('img_center');
var left_img = document.getElementById('img_left');s
var product_array = ['hello'];
var product_right = product_array[random_product];
var product_center = product_array[random_product];
var product_left = product_array[random_product];
//helper functions
//randomizer
function random_product(){

  Math.floor(Math.random*length.product_array);

}

//constructor function
function Product (name,file_path,id){
  this.name = name;
  this.img = file_path;
  this.shown = 0;
  this.id = id;
  this.clicked = 0;
  product_array.push(this);
}

function fill_product_array(){
  new Product('R2D2 Suitcase', 'img/bag.jpg', 'r2d2_bag');
  console.log(product_array);
  new Product('Banana Slicer', 'img/banana.jpg', 'banana_slicer');
  new Product('Bathroom IPad Stand', 'img/bathroom.jpg', 'bathroom_stand');
  new Product('Rain Sandals', 'img/boots.jpg', 'rain_sandals');
  new Product('All in One Breakfast', 'img/breakfast.jpg', 'breakfast');
  new Product('Meatball Bubble Gum (Italian Style)', 'img/bubblegum.jpg', 'meat_gum');
  new Product('Round Bottomed Chair', 'img/chair.jpg', 'round_chair');
  new Product('Cthulhu Wins! Action Figure', 'img/cthulhu.jpg', 'cthulhu');
  new Product('Dog Beak', 'img/dog-duck.jpg', 'dog_beak');
  new Product( 'Dragon Meat','img/dragon.jpg','dragon');
  new Product('Utensil Pen', 'img/pen.jpg', 'pen');
  new Product('Pet Sweep', 'img/pet-sweep.jpg', 'pet_sweep');
  new Product('Pizza Scissors', 'img/scissors.jpg','pizza_scissors');
  new Product('Shark-Sleeper', 'img/shark.jpg', 'shark_sleep');
  new Product('My First Floor Mop', 'img/sweep.png','sweep');
  new Product('Gut-Your-Own Tauntaun', 'img/tauntaun.jpg','tauntaun');
  new Product ('Unicorn Meat', 'img/unicorn.jpg', 'unicorn_meat');
  new Product ('Life-like Wiggling Octo-Arm!', 'img/usb.gif', 'octo_usb');
  new Product('Futility', 'img/water-can.jpg', 'water-can');
  new Product('The All Nose Wine Glass', 'img/wine-glass.jpg', 'wine-glass');
}
fill_product_array();
console.log(product_array);


//render functions


//event lisitiner
//event handler
//init

