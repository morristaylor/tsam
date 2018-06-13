'use strict';

BirdData.all = [];

function BirdData(birdDataObj) {
    this.birdID = birdDataObj.birdID;
    this.name = birdDataObj.name;
    this.habitat = birdDataObj.habitat;
    this.color = birdDataObj.color;
    this.size = birdDataObj.size;
    this.behavior = birdDataObj.behavior;
    this.image = birdDataObj.image;
};

BirdData.prototype.toHtml = function() {
   const resultsTemplate = Handlebars.compile($('#filter-results-template').text());

   return resultsTemplate(this);
};

BirdData.loadAll = function(rawBirdData) {
    rawBirdData.forEach(function(birdObject) {
        BirdData.all.push(new BirdData(birdObject));
    })
};

BirdData.fetchAll = function() {
    if (localStorage.rawBirdData) {
        const parsedBirdData = JSON.parse(localStorage.rawBirdData);
        BirdData.loadAll(parsedBirdData);
        indexView.initResults();
    } else {
        $.getJSON({
            url: 'data/birdData.json',
            data: 'data',
            success: function(data) {
                localStorage.setItem("birdData", JSON.stringify(data));
                BirdData.loadAll(data);
                indexView.initIndexPage();
            },
            error: function() {
                console.log('error');
            }
        })
    };
};

// BirdData.buildBirdList = function() {
//     const listButton = document.getElementById("list-button");
//
//     listButton.addEventListener("click", BirdData.showBirdList);
// }

BirdData.showBirdList = function() {
    const form = document.getElementById('filter');
    const birdSize = form.size.value;
    const birdColor = form.color.value;
    const birdBehavior = form.behavior.value;
    const birdHabitat = form.habitat.value;

    const filteredBirds = BirdData.all
        .filter(data => data.size === birdSize || data.size.includes(birdSize) || birdSize == '')
        .filter(data => data.color === birdColor || data.color.includes(birdColor) || birdColor == '')
        .filter(data => data.behavior === birdBehavior || data.behavior.includes(birdBehavior) || birdBehavior == '')
        .filter(data => data.habitat === birdHabitat || data.habitat.includes(birdHabitat) || birdHabitat == '')

    console.log(filteredBirds);

    $('#filter-results').empty();
    filteredBirds.forEach(function(result) {
        $('#filter-results').append(result.toHtml());
    });
}
//
// BirdData.buildBirdList();
