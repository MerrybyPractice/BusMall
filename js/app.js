'use strict';
//ideas:
//  a 'stable array' that does not get shuffled and is used for rendering the tables and storeing the data
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
var handler_array = [];
var label_array = [];
var clicks_array = [];
var chart_button = document.getElementById('chart_button');
var click_counter = 0;
var my_bar_chart;
var my_pie_chart;

//constructor function
var Product = function (name,number,file_path,id){
  this.name = name;
  this.number = number;
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
  new Product('R2D2 Suitcase', 14, 'img/bag.jpg', 'r2d2_bag'); //borken
  new Product('Banana Slicer', 2,'img/banana.jpg', 'banana_slicer');
  new Product('Bathroom IPad Stand', 3,'img/bathroom.jpg', 'bathroom_stand');
  new Product('Rain Sandals', 15,'img/boots.jpg', 'rain_sandals');
  new Product('All in One Breakfast', 1, 'img/breakfast.jpg', 'breakfast');
  new Product('Meatball Bubble Gum (Italian Style)', 10, 'img/bubblegum.jpg', 'meat_gum'); //broken
  new Product('Round Bottomed Chair', 16, 'img/chair.jpg', 'round_chair');
  new Product('Cthulhu Wins! Action Figure', 4,'img/cthulhu.jpg', 'cthulhu');
  new Product('Dog Beak', 5, 'img/dog-duck.jpg', 'dog_beak');
  new Product( 'Dragon Meat', 6, 'img/dragon.jpg', 'dragon');
  new Product('Utensil Pen', 20,'img/pen.jpg', 'pen');
  new Product('Pet Sweep', 12, 'img/pet-sweep.jpg', 'pet_sweep');
  new Product('Pizza Scissors',13, 'img/scissors.jpg','pizza_scissors');
  new Product('Shark-Sleeper', 17,'img/shark.jpg', 'shark_sleep'); //broken
  new Product('My First Floor Mop', 11, 'img/sweep.png','sweep');
  new Product('Gut-Your-Own Tauntaun', 8, 'img/tauntaun.jpg','tauntaun');
  new Product ('Unicorn Meat', 19,'img/unicorn.jpg', 'unicorn_meat');
  new Product ('Life-like Wiggling Octo-Arm!', 9, 'img/usb.gif', 'octo_usb');
  new Product('Futility', 7, 'img/water-can.jpg', 'water-can');
  new Product('The All Nose Wine Glass', 18,'img/wine-glass.jpg', 'wine-glass');
}
fill_product_array();

function bubble_sort(array){
  var flag = false;
  while(flag === false){
    flag = true;
    for (var i=0; i<array.length-1; i++){
      if (array[i].name>array[i+1].name){
        console.log(array[i+1].name);
        var holder = array[i];
        array[i] = array[i+1];
        array[i+1] = holder;
        flag = false;
      }
    }
  }
}

function fill_chart_arrays(){
  bubble_sort(product_array);
  for (var l = 0; l < product_array.length; l++){
    label_array.push(product_array[l].name);
    clicks_array.push(product_array[l].clicked);

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
    color+=characters[Math.floor(Math.random()*13)];
  }
  return color;
}

function stringify_array(){
  var stringy_product = JSON.stringify(product_array);
  localStorage.setItem('product_details', stringy_product);
}

//randomizer
function random_product(){

  return Math.floor(Math.random()*product_array.length);
}
function end_showing(){
  if(total_clicks <= 0){

    product_array.concat(handler_array);
    product_array.concat(last_array);
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
    fill_chart_arrays();
    render_bar_chart();
    stringify_array();
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

  handler_array = [];
  product_array = shuffle(product_array);
  handler_array.push(product_array.pop());
  handler_array.push(product_array.pop());
  handler_array.push(product_array.pop());
  last_array=[...handler_array];
  product_array = product_array.concat(last_array);
  product_left=handler_array[0];
  product_center=handler_array[1];
  product_right=handler_array[2];


  render_images();
  end_showing();
  // stringify_array();
};
//render charts
function render_bar_chart(){
  var ctx = document.getElementById('myChart').getContext('2d');
  // eslint-disable-next-line
  Chart.scaleService.updateScaleDefaults('linear', {
    ticks: {
      min: 0
    }
  });
  // eslint-disable-next-line no-undef
  my_bar_chart = new Chart(ctx, {
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
  // eslint-disable-next-line
  my_pie_chart = new Chart(ctx, {
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

//swap chart views
function pressed_chart_button(event){
  click_counter++;
  if (event.target.id==='chart_button' && click_counter %2 === 1){
    my_bar_chart.destroy();
    render_pie_chart();
  }else if (event.target.id ==='chart_button'&& click_counter %2 === 0){
    my_pie_chart.destroy();
    render_bar_chart();
  }
}

// check_local_storage();
//event lisitiner
product_block.addEventListener('click', count_clicks);
chart_button.addEventListener('click', pressed_chart_button);
render_images();

//init
if(localStorage.getItem('product_details')){
  var stringy_product = localStorage.getItem('product_details');
  product_array = JSON.parse(stringy_product);
}

console.log(clicks_array);
console.log(product_array);

