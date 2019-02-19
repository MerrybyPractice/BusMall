'use strict';
//global variables
var total_clicks = 25;
var product_block = document.getElementById('product_block');
var right_img = document.getElementById('img_right');
var right_title = document.getElementById('h2_right');
var center_img = document.getElementById('img_center');
var center_title = document.getElementById('h2_center');
var left_img = document.getElementById('img_left');
var left_title = document.getElementById('h2_left');
var results_list = document.getElementById('results_list');
var product_array = [];
var last_array = [];
var label_array = [];
var clicks_array = [];
//constructor function
var Product = function (name,file_path,id){
  this.name = name;
  this.img = file_path;
  this.shown = 0;
  this.id = id;
  this.clicked = 0;
  product_array.push(this);
};

function fill_product_array(){
  new Product('R2D2 Suitcase', 'img/bag.jpg', 'r2d2_bag');
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

function fill_label_array(){
  for (var l = 0; l < product_array.length; l++){
    label_array.push(product_array[l].name);
    console.log(product_array[l].name);
  }
  
}
function fill_clicks_array(){
  for (var c = 0; c < product_array.length; c++){
    clicks_array.push(product_array[c].clicked);
    console.log(product_array[c].clicked);
  }
}

var product_right = product_array[random_product()];
var product_center = product_array[random_product()];
var product_left = product_array[random_product()];
// helper functions
//randomizer
function random_product(){

  return Math.floor(Math.random()*product_array.length);
}
function end_showing(){
  if(total_clicks <= 0){
    product_block.removeEventListener('click', count_clicks);
    right_img.src = null;
    left_img.src = null;
    center_img.src = null;
    for(var i= 0; i< product_array.length; i++){
      var li = document.createElement('li');
      li.textContent = `Selected ${product_array[i].name} ${product_array[i].clicked} times out of ${product_array[i].shown} times shown`;
      results_list.appendChild(li);
      if (i===product_array.length){
        break;

      }
    }
  }
  if(total_clicks <= 0){
    console.log(clicks_array);
    fill_clicks_array();
  render_chart();
  }
  
}
//render functions
var render_product = function(product, target_img, target_h2){
  target_img.src = product.img;
  product.shown++;
  target_h2.textContent = product.name;
};
var render_images = function(){
  render_product(product_right, right_img, right_title);
  render_product(product_center, center_img, center_title);
  render_product(product_left, left_img, left_title);
};

//event handler
var count_clicks = function (event){
  if (event.target.tagName === 'IMG'){
    total_clicks --;
    if(event.target.id === 'img_right'){
      product_right.clicked ++;
      console.log(product_right.clicked);
      console.log(product_right);
    }else if (event.target.id === 'img_center'){
      product_center.clicked ++;
    }else if (event.target.id === 'img_left')
      product_left.clicked ++;
  }
  product_right = product_array[random_product()];

  if (last_array.includes(product_right)){
    product_right = product_array[random_product()];
  }

  product_center = product_array[random_product()];
  if (product_center === product_right){
    product_center = product_array[random_product()];
  }
  if (last_array.includes(product_center)){
    product_center = product_array[random_product()];
  }
  product_left = product_array[random_product()];
  if (product_left === product_right){
    product_left = product_array[random_product()];
  }
  if (product_left === product_center){
    product_left = product_array[random_product()];
  }
  if (last_array.includes(product_left)){
    product_left = product_array[random_product()];
  }
  last_array.push(product_right);
  last_array.push(product_center);
  last_array.push(product_left);
  render_images();
  end_showing();
};
//render chart
function render_chart(){
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: label_array,
      datasets:[{
        label:'# of Votes',
        data: clicks_array,
        backgroundColor: [
          'rgba(255,99,123,0.2)',
          'rgba(54,162,235,0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153,102,255,0.2)',
          'rgba(255,159,64,0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54,162,235,1)',
          'rgba(255,206,86,1)',
          'rgba(75,192,192,1)',
          'rgba(153,102,255,1)',
          'rgba(255,159,64,1',

        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{ 
          tickets:{
            beginAtZero:true
          }
        }]
      }
    }
  });
}
//event lisitiner
product_block.addEventListener('click', count_clicks);
render_images();
fill_label_array();



//init


