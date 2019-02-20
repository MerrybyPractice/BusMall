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
var chart_button = document.getElementById('chart_button');
var click_counter = 0;
//constructor function
var Product = function (name,file_path,id){
  this.name = name;
  this.img = file_path;
  this.shown = 0;
  this.id = id;
  this.clicked = 0;
  product_array.push(this);
};

function shuffle(array) {
  var m = array.length, t, i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

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

function getRandomColor(){
  var characters = '123456789ABEF'.split('');
  var color = '#';
  for (var y = 0; y < 6; y++){
    color+=characters[Math.floor(Math.random()*16)];
  }
  return color;
}

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
    fill_clicks_array();
    render_bar_chart();
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
    }else if (event.target.id === 'img_center'){
      product_center.clicked ++;
    }else if (event.target.id === 'img_left')
      product_left.clicked ++;
  }

  var handler_array = [];
  product_array = shuffle(product_array);
  handler_array.push(product_array.pop());
  handler_array.push(product_array.pop());
  handler_array.push(product_array.pop());
  product_array = product_array.concat(last_array);

  product_left=handler_array[0];
  product_center=handler_array[1];
  product_right=handler_array[2];

  last_array=handler_array;
  render_images();
  end_showing();
};
//render charts
function render_bar_chart(){
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: label_array,
      datasets:[{
        label:'# of Votes',
        data: clicks_array,
        backgroundColor: [
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
        ],
        borderColor: [
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
        ],
        borderWidth: 1
      }]
    },
    options: {
      legends:{
        labels:{
          fontcolor:'#000',
          fontsize: '10',
        }
      },
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

function render_pie_chart(){
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: label_array,
      datasets:[{
        label:'# of Votes',
        data: clicks_array,
        backgroundColor: [
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
        ],
        borderColor: [
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
        ],
        borderWidth: 1
      }]
    },
    options: {
      legends:{
        labels:{
          fontcolor:'#000',
          fontsize: '10',
        }
      },
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
function pressed_chart_button(event){
  click_counter++;
  if (event.target.id==='chart_button' && click_counter %2 === 1){
    render_pie_chart();
  }else if (event.target.id ==='chart_button'&& click_counter %2 === 0){
    render_bar_chart();
  }
}
console.log('click');
//event lisitiner
product_block.addEventListener('click', count_clicks);
chart_button.addEventListener('click', pressed_chart_button);
render_images();
fill_label_array();

//init


