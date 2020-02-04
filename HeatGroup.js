import {getXCoord,getYCoord} from './Axis.js';

function mouseOverCallback(d){
	var tooltipDiv = d3.select("#myTooltip")

	tooltipDiv.transition()
	.duration(250)
	.style("opacity", 1);

	var monthAbbrev = d3.timeFormat("%B");
	var myDate = new Date(d.year,d.month-1, 1);

	//round 2 decimal places
	var baseTemp =
	(Math.round((8.66 - d.variance) * 100) / 100).toFixed(2);

	//round 2 decimal places
	var variance =
	(Math.round((d.variance) * 100) / 100).toFixed(2);

	var tooltipData = 
	d.year + " " + 
	monthAbbrev(myDate)
	+ "<br>Base Temp: " + baseTemp
	+ "<br>Variance: " + variance;

	tooltipDiv
	.html(tooltipData)
	.style("left", d3.event.pageX + "px")
	.style("top", d3.event.pageY + "px");
}

function mouseOutCallback(d,tooltipDiv){
	tooltipDiv
	.transition()
	.duration(250)
	.style("opacity", 0);
}

function makeToolTip(){
	//tooltip
	var tooltipDiv = d3.select("body")
	.append("div")
	.attr("id", "myTooltip")
	.text("asdf")
	.style("opacity", 0);

	return tooltipDiv;
}

function makeHeatGroup(
	dataset,
	svg,
	tooltipDiv,
	legendColors
){
	var heatGroup = svg.append("g")
	.attr("id", "allrects");
	var baseTemp = [2.8, 3.9, 5.0, 6.1, 7.2, 8.3, 9.5, 10.6, 11.7, 12.8];
	var threshold = d3.scaleThreshold()
	.domain(baseTemp) //10
	.range(legendColors);

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
		mouseOutCallback(d,tooltipDiv);
	});

}
export {makeToolTip, makeHeatGroup};
