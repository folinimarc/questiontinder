"use strict";

//Simple animated example of d3-cloud - https://github.com/jasondavies/d3-cloud
//Based on https://github.com/jasondavies/d3-cloud/blob/master/examples/simple.html

// Encapsulate the word cloud functionality

var container = document.getElementById('wordcloud')
var bbox = container.getBoundingClientRect()
var width = bbox.width
var height = bbox.height

function wordCloud(selector) {

    var fill = d3.scale.category20();

    //Construct the word cloud's SVG element
    var svg = d3.select(selector).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + Math.floor(width/2) + "," + Math.floor(height/2) + ")");


    //Draw the word cloud
    function draw(words) {
        var cloud = svg.selectAll("g text")
                        .data(words, function(d) { return d.text; })

        //Entering words
        cloud.enter()
            .append("text")
            .style("font-family", "Impact")
            .style("fill", function(d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr('font-size', 1)
            .text(function(d) { return d.text; });

        //Entering and existing words
        cloud
            .transition()
                .duration(600)
                .style("font-size", function(d) { return d.size + "px"; })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .style("fill-opacity", 1);

        //Exiting words
        cloud.exit()
            .transition()
                .duration(200)
                .style('fill-opacity', 1e-6)
                .attr('font-size', 1)
                .remove();
    }


    //Use the module pattern to encapsulate the visualisation code. We'll
    // expose only the parts that need to be public.
    return {

        //Recompute the word cloud for a new set of words. This method will
        // asycnhronously call draw when the layout has been computed.
        //The outside world will need to call this function, so make it part
        // of the wordCloud return value.
        update: function(words) {
            d3.layout.cloud().size([width, height])
                .words(words)
                .padding(5)
                .rotate(function() { return 0})
                //.rotate(function() { return ~~(Math.random() * 2) * 90; })
                .font("Impact")
                .fontSize(function(d) { return d.size; })
                .on("end", draw)
                .start();
        }
    }

}


function getWords() {
    var data = []

    for (let k=0; k<50; k++) {
        data.push({
            'text': sentence(),
            'size': Math.floor(Math.random() * 20),
        })
    }
    return data
}

//Create a new instance of the word cloud visualisation.
var myWordCloud = wordCloud('#wordcloud');

//Start cycling through the demo data
//showNewWords(myWordCloud);

var words = getWords()
myWordCloud.update(words)

setTimeout(function() {
    words[4].size += 20
    words[6].size += 5
    words[2].size += 10
    myWordCloud.update(words)
}, 3000)

setTimeout(function() {
    words.push({'text': 'Hello there beautifures hereux!', 'size':40})
    words.push({'text': 'skdjk dskjkas jlkdjsalkd slkadsa!', 'size':40})
    words.push({'text': 'Hello there hereux!', 'size':12})
    myWordCloud.update(words)
}, 6000)