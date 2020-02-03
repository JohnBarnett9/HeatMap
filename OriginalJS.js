import {makeXAxis, makeYAxis,getXCoord,getYCoord} from './Axis.js';
import {makeAxisLabels} from './XYAxisLabels.js';
import {makeLegend, makeLegendScaleLabel} from './Legend.js';
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

var legendColors = d3.schemeBlues[5].reverse().concat(d3.schemeReds[6]);

function main(dataset){
	makeSVG();
	makeXAxis(dataset,svg);
	makeYAxis(svg);
	makeAxisLabels(svg, width, height);
	
	var tooltipDiv = makeToolTip();
	makeHeatGroup(dataset, svg, tooltipDiv, legendColors);	
	makeLegend(dataset, svg, legendColors);	
	makeLegendScaleLabel(svg);
	makeTitle(svg);
}

function makeSVG(){
	svg = d3.select("#root")
	.append("svg")
	.attr("width", width)
	.attr("height", height)
	.attr("style", "background-color: lightgrey;");

}
