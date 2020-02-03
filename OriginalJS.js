import {makeXAxis, makeYAxis,getXCoord,getYCoord} from './Axis.js';
import {makeAxisLabels} from './XYAxisLabels.js';
import {makeLegend, makeVarianceScaleLabel} from './Legend.js';
import {makeTitle} from './GraphTitle.js';
import {makeToolTip, makeHeatGroup} from './HeatGroup.js';

d3.json("global-temperature.json")
.then(function(data){
	var dataset = data.monthlyVariance;
	main(dataset);
});

/**/
const width = 1400;
const height = 500;

var svg;
//var xScale;
//var yScale;
var baseTemp = [2.8, 3.9, 5.0, 6.1, 7.2, 8.3, 9.5, 10.6, 11.7, 12.8];
var legendColors = d3.schemeBlues[5].reverse().concat(d3.schemeReds[6]);
var heatGroup;
var threshold;
//var tooltipDiv = null;
Object.toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
}

function main(dataset){
	makeSVG();
	makeXAxis(dataset,svg);
	makeYAxis(svg);
	makeAxisLabels(svg, width, height);

	threshold = d3.scaleThreshold()
	.domain(baseTemp) //10
	.range(legendColors);

	heatGroup = svg.append("g");

	var tooltipDiv = makeToolTip();
	console.dir(Object.toType(tooltipDiv));

	//makeToolTip();
	//console.log("in main() tooltipDiv=");
	//console.dir(tooltipDiv);
	makeHeatGroup(dataset, heatGroup, threshold, tooltipDiv);

	
	//console.log("before makeLegendCall() legendColors=");
	//console.dir(legendColors);
	makeLegend(dataset, svg, baseTemp, legendColors);	
	makeVarianceScaleLabel(svg);

	makeTitle(svg);
}


function makeSVG(){
	svg = d3.select("#root")
	.append("svg")
	.attr("width", width)
	.attr("height", height)
	.attr("style", "background-color: lightgrey;");

}

/*
function makeXAxis(dataset){
	//var minYear = d3.min(dataset, (d,i) => dataset[i]['year']);
	var minYear = d3.min(dataset, (d) => d.year);

	var maxYear = d3.max(dataset, (d) => d.year);
	//console.dir(minYear);

	//variance
	var minVariance = d3.min(dataset, (d) => d.variance);
	var maxVariance = d3.max(dataset, (d) => d.variance);
	//console.dir(minVariance);
	//console.dir(maxVariance);


	//const xScale = d3.scaleTime()
	xScale = d3.scaleTime()
	.domain([minYear, maxYear])
	.range([50, 1300]);

	var xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
	svg.append("g")
	.attr("transform", "translate(50, 400)")
	.call(xAxis);	
}


function makeYAxis(){
	//var yScale = d3.scaleTime()
	yScale = d3.scaleTime()
	.domain([new Date("2019-01-01"), new Date("2019-12-31")])
	.range([50, 400]);

	var yAxis = d3.axisLeft(yScale)
	.tickFormat(d3.timeFormat("%B"));

	svg.append("g")
	.attr("transform", "translate(100, 0)")
	.call(yAxis);

}
*/
/*
function makeAxisLabels(){
	//X Axis Label
	svg.append("text")
	.attr("x", width / 2)
	.attr("y", height - 20)
	.text("Year");

	//Y Axis Label
	svg.append("text")
	.attr("x", 0)
	.attr("y", 0)
	.attr("transform", "translate(20,250) rotate(-90)")
	.text("Month");

}
*/

/*
function makeVarianceScaleLabel(){
	//variance scale label
	svg.append("text")
	.attr("x", 0)
	.attr("y", 420)
	.text("Variance Scale");

	//base temp scale label
	svg.append("text")
	.attr("x", 0)
	.attr("y", 440)
	.text("Base Temp Scale");
	
}
*/

/*
function makeTitle(){
	//Title of Heat Map
	svg.append("text")
	.attr("x", 500)
	.attr("y", 20)
	.text("Monthly Global Land-Surface Temperature")
	.style("font-size", "20px");

	svg.append("text")
	.attr("x", 570)
	.attr("y", 40)
	.text("1753 - 2015: base temperature 8.66℃")
	.style("font-size", "15px");

}
*/

/*
function mouseOverCallback(d){
		var tooltipDiv = d3.select("#myTooltip")

		tooltipDiv.transition()
		.duration(250)
		.style("opacity", 1);

		var monthAbbrev = d3.timeFormat("%B");
		var myDate = new Date(d.year,d.month-1, 1);
		var tooltipData = 
		d.year + " " + 
		monthAbbrev(myDate)
		+ "<br>Base Temp: " + (8.66 - d.variance)
		+ "<br>Variance: " + d.variance;

		tooltipDiv
		.html(tooltipData)
		.style("left", d3.event.pageX + "px")
		.style("top", d3.event.pageY + "px");					

}

function mouseOutCallback(d){
		tooltipDiv
		.transition()
		.duration(250)
		.style("opacity", 0);
}
*/
/*
function makeToolTip(){
	//tooltip
	tooltipDiv = d3.select("body")
	.append("div")
	.attr("id", "myTooltip")
	.text("asdf")
	.style("opacity", 0);

}
*/
/*
function makeLegend(dataset){
	//Color Legend

	var variances = dataset.map(function(d){
		return d.variance; //returns positive numbers also
	});

	//neg number furthest from 0, -6.976
	var minNegVariance = Math.min(...variances);
	
	//5.228
	var maxPosVariance = Math.max(...variances);

	//variance scale
	var varianceScale = d3.scaleLinear()
	.domain([minNegVariance, maxPosVariance])
	.range([50, 250]);

	var varianceAxis = d3.axisBottom(varianceScale).tickFormat(d3.format("d"));
	svg.append("g")
	.attr("transform", "translate(50, 420)")
	.call(varianceAxis);

	//base temp axis
	var baseTempScale = d3.scaleLinear()
	.domain([7, 13])
	.range([50, 250]);

	var baseAxis = d3.axisBottom(baseTempScale).tickFormat(d3.format("d"));
	svg.append("g")
	.attr("transform", "translate(50, 440)")
	.call(baseAxis);

	//color scale
	var colorScale = d3.scaleLinear()
	.domain([-10, 0, 10])
	.range(['red', '#ddd', 'blue'])
	.interpolate(d3.interpolateHcl);

	var myData = baseTemp; //[-10, - -5, 0, 5, 10];
	var legendGroup = svg.append("g");

	legendGroup.selectAll("rect")
	.data(legendColors)
	.enter()
	.append("rect")
	.attr("width", 20)
	.attr("height", 20)
	.attr("x", function(d,i){return (i * 20)+ 100 + "px";})
	.attr("y", 470)
	.attr("fill", function(d){return d;});
}
*/
/*
function makeHeatGroup(dataset){
	console.log("in makeHeatGroup()");
	heatGroup.selectAll("rect")
	.data(dataset)
	.enter()
	.append("rect")
	.attr("x", function(d,i){
		//+50 makes the rects start to right of Y axis
		return getXCoord(d);
	})
	.attr("y", function(d, i){
		return getYCoord(d);
	})
	.attr("width", "4px")
	.attr("height", "28px ")
	.attr("fill", function(d){ 
		return threshold(d.variance + 8.66);
	})
	.on("mouseover", function(d){
		mouseOverCallback(d);
	})
	.on("mouseout", function(d){
		mouseOutCallback(d);
	});

}
*/

