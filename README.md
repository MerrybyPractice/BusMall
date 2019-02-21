# BusMall
Shuffel function taken from here: https://bost.ocks.org/mike/shuffle/ 

After research done yesterday, I knew I wanted to do 


As with many of my projects thus far, many of the key functions turned out to be methods of arrays. Two that were new to me are listed below, along with their MDN docs: 

Array Concatenatetion: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat

.Pop: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop

When thinking through how to do random colors I knew that I would need the following generals: 
  I wanted to try this with hashcolors first, as they are strings of six numbers they will be easiest to work with from the start. 
  A funciton that generates them makes the most sense. 
  A function that parses through the characters that makes up a hash code, and uses math.random to select them and puth them back to gether made even more sense. 
  If I wanted to stay away from lots of grey's and blacks, omitting 0, C, and D from my function made the most sense. 
While doing a bit of further research I came across the following bit of code: 

  function getRandomColor() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
                }
taken from this source: https://stackoverflow.com/questions/31243892/random-fill-colors-in-chart-js 
As it filled the requirements I had already laid out, and would be easy enough to slightly alter I decided to try it. This works because chart.js is able to accpect functions as input for a many of its parameters - even if utterly random colors arent the most choice design wise. 