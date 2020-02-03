var xScale;
var yScale;

 
function makeXAxis(dataset,svg){
	//console.log("in makeXAxis()");
	/*
	X Axis, works, commented to debug Y Axis
	*/
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

function makeYAxis(svg){
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

function getXCoord(d){
	return xScale(d.year) + 51 + "px";
}
function getYCoord(d){

	return  yScale(new Date("2019-" + d.month + "-01")) + "px";
}

export {makeXAxis,makeYAxis,getXCoord,getYCoord};
