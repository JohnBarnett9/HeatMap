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
var baseTemp = [2.8, 3.9, 5.0, 6.1, 7.2, 8.3, 9.5, 10.6, 11.7, 12.8];
var legendColors = d3.schemeBlues[5].reverse().concat(d3.schemeReds[6]);
var heatGroup;
var threshold;

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
	makeHeatGroup(dataset, heatGroup, threshold, tooltipDiv);	
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
