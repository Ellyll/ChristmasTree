/*
        +
        *
       ***
      *****
     *******
    *********
       | |
*/

function drawTree(context) {
    var numberOfBranches = 5;
    var topMarginInBranches = 1;
    var bottomMarginInBranches = 1;
    var starHeightInBranches = 1.5;
    var starSpacing = 1;
    var trunkSpacing = 0.5;
    var trunkHeightInBranches = 2;
    var spacingHeightInBranches = 1;
    var heightInBranches = topMarginInBranches +
                           starHeightInBranches +
                           starSpacing +
                           numberOfBranches +
                           (spacingHeightInBranches*(numberOfBranches-1)) +
                           trunkSpacing +
                           trunkHeightInBranches +
                           bottomMarginInBranches;

    var branchThickness = context.canvas.height / heightInBranches;
    var maxRatio = 1;
    var maxBranchWidth = context.canvas.width;
    if (maxBranchWidth/context.canvas.height > maxRatio) {
        maxBranchWidth = context.canvas.height * maxRatio;
    }

    var xCentre = context.canvas.width / 2;
    var colorGenerator = new ColourGenerator();

    // Trunk
    var trunkCentreY = branchThickness * (topMarginInBranches +
        starHeightInBranches +
        starSpacing +
        numberOfBranches +
        (spacingHeightInBranches*(numberOfBranches-1)) +
        trunkSpacing +
        (trunkHeightInBranches/2));
    drawTrunk(context, xCentre, trunkCentreY, maxBranchWidth * 0.15, trunkHeightInBranches*branchThickness);

    // Branches and baubles
    var i;
    var branchY = branchThickness * (topMarginInBranches + starHeightInBranches + starSpacing + 0.5);
    for (i = 1; i <= numberOfBranches; i++) {
        drawBranch(context, i, numberOfBranches, branchThickness, maxBranchWidth,xCentre, branchY, colorGenerator);
        branchY += branchThickness + (branchThickness*spacingHeightInBranches);
    }

    // Star
    var starY = branchThickness * (topMarginInBranches + (starHeightInBranches/2));
    var starRadius = branchThickness * (starHeightInBranches/2);

    drawStar(context, xCentre, starY, starRadius);

}

function drawStar(context, x, y, radius) {
    var points = 5;
    var angleStep = 2 * Math.PI / (points*2); // double the points as includes inner points

    var angle;
    var xCircle;
    var yCircle;
    var pointRadius;
    var innerRadius = radius / 2;
    var innerPoint = false;

    context.beginPath();
    context.fillStyle = 'yellow';
    for (angle = 0; angle <= 2*Math.PI ; angle += angleStep) {
        if (innerPoint) {
            pointRadius = innerRadius;
        } else {
            pointRadius = radius;
        }
        xCircle = x + (pointRadius * Math.sin(angle));
        yCircle = y - (pointRadius * Math.cos(angle));

        if (angle === 0) { // first point
            context.moveTo(xCircle, yCircle);
        } else {
            context.lineTo(xCircle, yCircle);
        }

        innerPoint = !innerPoint;
    }
    context.fill();

    // the sparkle
    context.beginPath();
    context.arc(x+(radius/4), y-(radius/4), 2, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgba(255,255,255,1)';     // solid
    context.strokeStyle = 'rgba(255,255,255,0.5)'; // 50% transparent
    context.lineWidth = 2;
    context.fill();
    context.stroke();
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

function drawTrunk(context, xCentre, yCentre, width, height) {
    var xStart = xCentre - (width/2);
    var yStart = yCentre - (height/2);

    context.fillStyle = '#8B4513';
    context.fillRect(xStart, yStart, width, height);
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
    context.strokeStyle = 'rgba(255,255,255,0.5)'; // 50% transparent
    context.lineWidth = 1;
    context.fill();
    context.stroke();
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