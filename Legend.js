function makeLegend(
	dataset,
	svg,
	legendColors
){
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

	//group to hold legend scales and labels
	var legendGroup = svg.append("g")
	.on("mouseover", function(d){
		var legendLine = d3.select("#lineline");
		legendLine
		.attr("x1", function(d){return d3.event.pageX + "px";})
		.attr("x2", function(d){return d3.event.pageX + "px";})
		.attr("y1", function(d){
			return 420 + "px";
		})
		.attr("y2", function(d){
			return 490 + "px";
		})
		.style("opacity", 1);
	})
	.on("mouseout", function(d){
		var legendLine = d3.select("#lineline");
		legendLine.style("opacity", 0);		
	});

	legendGroup.append("g")
	.attr("transform", "translate(100, 420)")
	.call(varianceAxis);

	//base temp axis
	var baseTempScale = d3.scaleLinear()
	.domain([7, 13])
	.range([50, 250]);

	var baseAxis = d3.axisBottom(baseTempScale).tickFormat(d3.format("d"));
	
	legendGroup.append("g")
	.attr("transform", "translate(100, 440)")
	.call(baseAxis);

	//color scale
	var colorScale = d3.scaleLinear()
	.domain([-10, 0, 10])
	.range(['red', '#ddd', 'blue'])
	.interpolate(d3.interpolateHcl);

	legendGroup.selectAll("rect")
	.data(legendColors)
	.enter()
	.append("rect")
	.attr("width", 20)
	.attr("height", 20)
	.attr("x", function(d,i){
		return (i * 20)+ 140 + "px";
	})
	.attr("y", 470)
	.attr("fill", function(d){return d;})
	.on("mouseover", function(d){
		var blackedOut = document.querySelectorAll("#allrects :not([fill="+CSS.escape(d)+"])");
		blackedOut.forEach(element => element.setAttribute("opacity", .4));
	})
	.on("mouseout", function(d){
		var blackedOut = document.querySelectorAll("#allrects :not([fill="+CSS.escape(d)+"])");
		blackedOut.forEach(element => element.setAttribute("opacity", 1));
	});

	var legendScalesLine =
	svg
	.append("line")
	.attr("x1", 50)
	.attr("x2", 50)
	.attr("y1", 50)
	.attr("y2", 100)
	.attr("id", "lineline")
	.style("stroke-width", 1)
	.style("stroke", "black")
	.style("opacity", 0);
}

function makeLegendScaleLabel(svg){
	//variance scale label
	svg.append("text")
	.attr("x", 20)
	.attr("y", 430)
	.text("Variance Scale");

	//base temp scale label
	svg.append("text")
	.attr("x", 20)
	.attr("y", 450)
	.text("Base Temp Scale");
	
	svg.append("text")
	.attr("x", 20)
	.attr("y", 480)
	.text("Heat Color Scale");
}

export {makeLegend, makeLegendScaleLabel};
