/*
Purpose of file:
Create the X and Y Axis.
Convert year and month to position in Heat Map.
*/

var xScale; //converts year to location in px
var yScale; //converts month to location in px
 
//render X Axis
function makeXAxis(dataset,svg){
	var minYear = d3.min(dataset, (d) => d.year);
	var maxYear = d3.max(dataset, (d) => d.year);

	//variance
	var minVariance = d3.min(dataset, (d) => d.variance);
	var maxVariance = d3.max(dataset, (d) => d.variance);

	xScale = d3.scaleTime()
	.domain([minYear, maxYear])
	.range([50, 1300]);

	var xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
	svg.append("g")
	.attr("transform", "translate(50, 400)")
	.call(xAxis);	
}

//render Y Axis
function makeYAxis(svg){
	//var yScale = d3.scaleTime()
	yScale = d3.scaleTime()
	.domain([new Date("2019-01-01"), new Date("2019-12-31")])
	.range([50, 400]);

	//%B is full Month name
	var yAxis = d3.axisLeft(yScale)
	.tickFormat(d3.timeFormat("%B"));

	svg.append("g")
	.attr("transform", "translate(100, 0)")
	.call(yAxis);

}

//translate year to location on X Axis
function getXCoord(d){
	return xScale(d.year) + 51 + "px";
}

//translate month to location on Y Axis
function getYCoord(d){
	return  yScale(new Date("2019-" + d.month + "-01")) + "px";
}

export {makeXAxis,makeYAxis,getXCoord,getYCoord};
