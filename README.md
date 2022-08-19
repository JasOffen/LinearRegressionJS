# LinearRegressionJS

Linear Regression done entirely in Javascript. I'm creating this project to concrete my understanding of the math behind this.

### How to use

Starting with the first declared variables 'xpoints' and 'ypoints'. These are your points that we want to plot on our imaginary graph. If you dont want to use your own points you can ignore this in favor the Random method. enable this on line 28 or look for the variable "RandomXYPoints" 

When RandomXYPoints is enabled you have a couple options. The data range that each X/Y point can be at and how many data points do you want. by default the default range is 10,000 and the default points to be generated are 1000.

Finally the variable TrainingX is what data we want to predict. By default this is set to -10 to see what we expect the y value to be given this variable.

### How to run

After cloning this repo you can run `node index.js` to begin the script. You will see that this will generate your datapoints. After that it will output the variables for the math to be done. This includes our X mean, Y mean, XY Mean, x mean squared, w(or m if youre more familiar with y=mx + b for slope intercept), and our b. The Y intercept will be displayed along with the Slope, and finally our prediction based on the TrainingX variable is displayed.

Here is an example 
![output showing 913 data points, and the following math related to those points](/images/example.png)