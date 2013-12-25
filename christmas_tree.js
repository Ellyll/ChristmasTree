/*
        #
        *
       ***
      *****
     *******
    *********
        *

    good ratio: width: 505, height: 449

*/

function drawTree(context) {
    var numberOfBranches = 7;
    var topMarginInBranches = 1;
    var bottomMarginInBranches = 1;
    var starHeightInBranches = 1.5;
    var trunkHeightInBranches = 2;
    var spacingHeightInBranches = 1;
    var heightInBranches = topMarginInBranches +
                           starHeightInBranches +
                           numberOfBranches +
                           (spacingHeightInBranches*(numberOfBranches+1)) +
                           trunkHeightInBranches +
                           bottomMarginInBranches;

    var branchThickness = context.canvas.height / heightInBranches; //(numberOfBranches * 2.5);
    var maxRatio = 1;
    var maxBranchWidth = context.canvas.width; // / 1.5;
    if (maxBranchWidth/context.canvas.height > maxRatio) {
        maxBranchWidth = context.canvas.height;
    }

    var xCentre = context.canvas.width / 2;
    var colorGenerator = new ColourGenerator();
    var starY = branchThickness * (topMarginInBranches + (starHeightInBranches/2));
    var starRadius = branchThickness * (starHeightInBranches/2);

    drawStar(context, xCentre, starY, starRadius);

    // Draw branches and baubles
    var i;
    var branchY = branchThickness * (topMarginInBranches + starHeightInBranches + spacingHeightInBranches + 0.5);
    for (i = 1; i <= numberOfBranches; i++) {
        drawBranch(context, i, numberOfBranches, branchThickness, maxBranchWidth,xCentre, branchY, colorGenerator);
        branchY += branchThickness + (branchThickness*spacingHeightInBranches);
    }

    var trunkY = branchY - (branchThickness + (branchThickness*spacingHeightInBranches)) + (trunkHeightInBranches*branchThickness);
    drawTrunk(context, xCentre, trunkY, maxBranchWidth / 30, trunkHeightInBranches*branchThickness);
}

function drawStar(context, x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'yellow';
    context.fill();
}

function drawBranch(context,
                    branchNumber,
                    numberOfBranches,
                    branchThickness,
                    maxBranchWidth,
                    xCentre,
                    y,
                    colourGenerator) {
    var xStart = xCentre - ((branchNumber/numberOfBranches)*maxBranchWidth)/2;
    var xEnd   = xCentre + ((branchNumber/numberOfBranches)*maxBranchWidth)/2;

    context.beginPath();
    context.moveTo(xStart, y);
    context.lineTo(xEnd, y);
    context.lineWidth = branchThickness;
    context.strokeStyle = '#00AA00';
    context.lineCap = 'square';
    context.stroke();

    var baubleDiameter = branchThickness * 0.8;
    var maxBaubles = Math.floor((xEnd - xStart ) / baubleDiameter);

    var colour;
    var i;
    for (i=0; i < maxBaubles; i++) {
        var percent = Math.floor(Math.random()*101);
        if (percent < 40) {
            var xBauble = xStart + (i*baubleDiameter) + (baubleDiameter/2);
            var yBauble = y + Math.floor(Math.random()*((branchThickness+baubleDiameter)/2));
            colour = colourGenerator.getColour();
            drawBauble(context, xBauble, yBauble, baubleDiameter/2, colour);
        }
    }
}

function drawTrunk(context, xCentre, y, width, thickness) {
    var xStart = xCentre - (width/2);
    var xEnd = xCentre + (width/2);

    context.beginPath();
    context.moveTo(xStart, y);
    context.lineTo(xEnd, y);
    context.lineWidth = thickness;
    context.strokeStyle = 'brown';
    context.lineCap = 'square';
    context.stroke();
}

function drawBauble(context, x, y, radius, colour) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = colour;
    context.fill();

    // the sparkle
    context.beginPath();
    context.arc(x+(radius/2), y-(radius/2), 1, 0, 2 * Math.PI, false);
    context.fillStyle = 'white';
    context.fill();
}

function ColourGenerator() {
    this.colours = ['red', 'green', 'yellow', 'magenta', 'blue', 'silver', 'gold', 'purple'];
    this.colourIndex = 0;
}
ColourGenerator.prototype.getColour = function() {
    var colour = this.colours[this.colourIndex];
    this.colourIndex++;
    if (this.colourIndex >= this.colours.length) {
        this.colourIndex = 0;
    }

    return colour;
};