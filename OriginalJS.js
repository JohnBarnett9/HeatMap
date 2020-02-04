/*
Purpose of file:
JavaScript code that starts the program.
Read in data, make SVG, call functions to
generate other parts of Heat Map.
'./' means in same dir
*/
import {makeXAxis, makeYAxis,getXCoord,getYCoord} from './Axis.js';
import {makeAxisLabels} from './XYAxisLabels.js';
import {makeLegend, makeLegendScaleLabel} from './Legend.js';
import {makeTitle} from './GraphTitle.js';
import {makeToolTip, makeHeatGroup} from './HeatGroup.js';

//read in JSON data, main() in .then() because .json() is asychronous
d3.json("global-temperature.json")
.then(function(data){
	var dataset = data.monthlyVariance;
	main(dataset);
});

const width = 1400; //width of SVG container
const height = 500; //height of SVG container
var svg; //the SVG container

//from HTML Color Picker, 40% away from black, every other blue
var blues = ["#0000cc", "#0000ff", "#3333ff", "#6666ff", "#9999ff"];

//from HTML Color Picker, 25% away from black, and every other red
var reds = ["#800000", "#b30000", "#e60000", "#ff1a1a", "#ff4d4d", "#ff8080"];

var legendColors = blues.concat(reds.reverse()); //reverse so both ends are dark color

//starts program
function main(dataset){
	makeSVG();
	makeXAxis(dataset,svg);
	makeYAxis(svg);
	makeAxisLabels(svg, width, height);
	
	var tooltipDiv = makeToolTip(); //tooltip obj not pass by reference, need return value
	makeHeatGroup(dataset, svg, tooltipDiv, legendColors);	
	makeLegend(dataset, svg, legendColors);	
	makeLegendScaleLabel(svg);
	makeTitle(svg);
}

//render SVG container
function makeSVG(){
	svg = d3.select("#root")
	.append("svg")
	.attr("width", width)
	.attr("height", height)
	.attr("style", "background-color: white;");
}
