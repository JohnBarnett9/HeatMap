/*
export const width = 1400;
export const height = 500;
export var svg;
export function makeSVG(){
	svg = d3.select("#root")
	.append("svg")
	.attr("width", width)
	.attr("height", height)
	.attr("style", "background-color: lightgrey;");

}
*/

export var svgStuff = function(){
	const width = 1400;
	const height = 500;
	var svg;
	function makeSVG(){
		svg = d3.select("#root")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("style", "background-color: lightgrey;");

	}

}();
console.log("svgStuff in SVG.js=");
console.dir(svgStuff);
//export var svgStuff;


