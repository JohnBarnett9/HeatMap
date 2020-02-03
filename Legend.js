//var legendColors = d3.schemeBlues[5].reverse().concat(d3.schemeReds[6]);

function makeLegend(
	dataset,
	svg,
	baseTemp,
	legendColors
){
	//console.log("legendColors");
	//console.dir(legendColors);
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
	/*
	*/
}

function makeVarianceScaleLabel(svg){
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


export {makeLegend, makeVarianceScaleLabel};