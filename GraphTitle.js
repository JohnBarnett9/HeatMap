/*
Purpose of file:
Render the tile of the Heat Map.
*/

function makeTitle(svg){
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
export {makeTitle};