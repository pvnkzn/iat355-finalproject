// Load data from datasets/videogames_wide.csv using d3.csv and then make visualizations
async function fetchData() {
    const data = await d3.csv("./dataset/videogames_wide.csv");
    return data;
}

fetchData().then(async (data) => {

    // visualization 1

    // visualization 2

    // visualization 3

    // visualization 4




});

async function render(viewID, spec) {
    const result = await vegaEmbed(viewID, spec);
    result.view.run();
}