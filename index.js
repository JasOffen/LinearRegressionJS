// Plot Points
let xpoints = [1, 2, 4];
let ypoints = [20, 140, 1];
// other variables for calculating w, b, and y
let pointsLength = 0
let xmeans = 0;
let ymeans = 0;
let xymeans = 0;
let xmeanssquared = 0;
let w = 0;
let w1 = 0;
let w2 = 0;
let b = 0;
let y = 0;

// given our line make a prediction of y given a x value
let changedSign = false;
let trainingX = -10;
let predictedY = 0;

// We'll use these for rounding up the prediction variable to be more workable
let predictedDecimal = 0;
let modifiedDecimal = 0;
let predictedWhole = 0;
let decimalplaces = 0;

//Random (x,y) points or keep set data points
let randomXYpoints = true;
let randomXYDataRange = 10000;
let randomMaxDataPoints = 1000

//Weighted Random
let weightedRandom = false;
let positiveSlope = false;
let randomNegatives;
let randomNegativeWeight = 0.5;


function regression() {

    if (randomXYpoints == true) {
        xpoints = [];
        ypoints = [];

        if (weightedRandom == true) {
            if (positiveSlope == true) {
                xyPointCount = Math.floor(Math.random() * randomMaxDataPoints);
                console.log(`generating ${xyPointCount} data points`)
                for (let i = 0; i < xyPointCount; i++) {
                    randomNegatives = Math.random();
                    if (randomNegatives < randomNegativeWeight) {
                        xpoints[i] = Math.floor(Math.random() * randomXYDataRange) * -1
                        ypoints[i] = Math.floor(Math.random() * randomXYDataRange) * -1
                    } else {
                        xpoints[i] = Math.floor(Math.random() * randomXYDataRange)
                        ypoints[i] = Math.floor(Math.random() * randomXYDataRange)
                    }

                    if (randomNegativeWeight < 1) {
                        randomNegativeWeight += 0.001
                    }
                    console.log(`Data point ${i} has been generated (${xpoints[i]},${ypoints[i]})`)
                    console.log(`random negative weight is now set to ${randomNegativeWeight}`)
                }
            } else {
                xyPointCount = Math.floor(Math.random() * randomMaxDataPoints);
                console.log(`generating ${xyPointCount} data points`)
                for (let i = 0; i < xyPointCount; i++) {
                    randomNegatives = Math.random();
                    if (randomNegatives > randomNegativeWeight) {
                        xpoints[i] = Math.floor(Math.random() * randomXYDataRange) * -1
                        ypoints[i] = Math.floor(Math.random() * randomXYDataRange)
                    } else {
                        xpoints[i] = Math.floor(Math.random() * randomXYDataRange)
                        ypoints[i] = Math.floor(Math.random() * randomXYDataRange)
                    }

                    if (randomNegativeWeight > 0.002) {
                        randomNegativeWeight -= 0.001
                    }
                    //console.log(`Data point ${i} has been generated (${xpoints[i]},${ypoints[i]})`)
                    //console.log(`random negative weight is now set to ${randomNegativeWeight}`)
                    console.log(`${xpoints[i]},${ypoints[i]}`)
                }
            }
        } else {

            xyPointCount = Math.floor(Math.random() * randomMaxDataPoints);
            console.log(`generating ${xyPointCount} data points`)
            for (let i = 0; i < xyPointCount; i++) {
                randomNegatives = Math.random();
                if (randomNegatives < randomNegativeWeight) {
                    xpoints[i] = Math.floor(Math.random() * randomXYDataRange) * -1
                    ypoints[i] = Math.floor(Math.random() * randomXYDataRange) * -1
                } else {
                    xpoints[i] = Math.floor(Math.random() * randomXYDataRange)
                    ypoints[i] = Math.floor(Math.random() * randomXYDataRange)
                }
                console.log(`Data point ${i} has been generated (${xpoints[i]},${ypoints[i]})`)
            }
        }
    }
    dataCheck();
}

function dataCheck() {
    console.log(`(x) has ${xpoints.length} datapoints, and (y) has ${ypoints.length} data points`)
    if (xpoints.length > 0 && ypoints.length > 0) {
        pointsCalc()
        xmeansCalc()
        predictedCalc()
    } else {
        console.log(`Please input some data points manually, or enable RandomXYpoints.`)
    }
}

function pointsCalc() {
    if (xpoints.length > ypoints.length) {
        pointsLength = ypoints.length
    } else if (xpoints.length < ypoints.length) {
        pointsLength = xpoints.length
    } else {
        pointsLength = xpoints.length
    }
}

function xmeansCalc() {
    for (let i = 0; i < pointsLength; i++) {
        // console.log(`i is equal to ${i}`)
        xmeans = xmeans + xpoints[i]
    }
    console.log(`x mean is equal to ${xmeans} over ${pointsLength}`);
    ymeansCalc()
}
function ymeansCalc() {
    for (let i = 0; i < pointsLength; i++) {
        // console.log(`i is equal to ${i}`)
        ymeans = ymeans + ypoints[i]
    }
    console.log(`y mean is equal to ${ymeans} over ${pointsLength}`);
    xymeansCalc()
}

function xymeansCalc() {
    for (let i = 0; i < pointsLength; i++) {
        xymeans = xpoints[i] * ypoints[i] + xymeans
    }
    console.log(`xy mean is equal to ${xymeans} over ${pointsLength}`);
    xmeanssquaredCalc()
}

function xmeanssquaredCalc() {
    for (let i = 0; i < pointsLength; i++) {
        xmeanssquared = xmeanssquared + xpoints[i] * xpoints[i]
    }
    console.log(`x means squared means is equal to ${xmeanssquared} over ${pointsLength}`)
    wCalc()
}

function wCalc() {
    w1 = (xymeans / pointsLength) - (xmeans / pointsLength) * (ymeans / pointsLength);
    w2 = (xmeanssquared / pointsLength) - (xmeans / pointsLength * xmeans / pointsLength)
    w = w1 / w2

    console.log(`w is equal to ${w}`)
    bCalc()
}

function bCalc() {
    b = ymeans / pointsLength - w * xmeans / pointsLength

    console.log(`b is equal to ${b}`)
    yCalc()
}

function yCalc() {
    console.log(`y=wx + b`)
    console.log(`y=${w}(x) + ${b}`)
    console.log(`The (y) intercept is ${b}, and the slope is ${w}`)
}

function predictedCalc() {
    predictedY = b
    //Detecting if our TrainingX variable is a negative or not, and doing slightly different for loops based on that.
    if (trainingX > 0) {
        for (let x = 0; x < trainingX; x++) {
            predictedY = predictedY + w
        }
    } else {
        changedSign = true;
        for (let x = 0; x > trainingX; x--) {
            predictedY = predictedY - w
        }
    }

    // Here we will convert our hypothesis to a string and split it. This will allow round up the decimal after the first 3 places(or however many places we choose here).
    predictedDecimal = predictedY.toString().split('.')[1]
    predictedWhole = predictedY.toString().split('.')[0]

    if (predictedDecimal >= 100) {
        if (predictedDecimal[3] >= 5) {
            modifiedDecimal = parseInt(modifiedDecimal = [predictedDecimal[0] + predictedDecimal[1] + (predictedDecimal[2])]) + 1
        } else {
            modifiedDecimal = [predictedDecimal[0] + predictedDecimal[1] + predictedDecimal[2]]
        }
    }

    if (changedSign == true) {
        console.log(`given the input feature ${trainingX}. The expected hypothesis is ${predictedWhole}.${modifiedDecimal}`)
    } else {
        console.log(`given the input feature ${trainingX}. The expected hypothesis is ${predictedWhole}.${modifiedDecimal}`)
    }
}

regression()

let xypoints;

for(let i = 0; i < pointsLength; i++){
    xypoints += xpoints[i] + " "
    xypoints += ypoints[i] + " "
}

// var fs = require('fs');
// fs.writeFileSync("./xypoints.csv", xypoints);
