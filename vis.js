// Load data from datasets/videogames_wide.csv using d3.csv and then make visualizations
async function fetchData() {
    const data = await d3.csv("./dataset/Most_Streamed_Spotify_Songs_2024.csv");
    return data;
}

fetchData().then(async (data) => {

    // visualization 1
    const vlSpec = vl
        .markCircle()
            .data(data)
            .transform(
                // filtering some popular artists
                {filter: {field: "Artist", oneOf: ["Dua Lipa", "Ariana Grande", "Taylor Swift", "Bruno Mars", "Shawn Mendes", "Justin Bieber", "Rihanna"]}}
            )
            .encode(
                vl.x().fieldT("Release Date"),
                vl.y().fieldQ("TikTok Views"),
                vl.size().fieldQ("Spotify Streams"),
                vl.color().fieldN("Artist"),
                vl.tooltip(
                    [
                        {field: "Track"},
                        {field: "Artist"},
                        {field: "Spotify Streams"},
                        {field: "TikTok Views"}
                    ]
                )
            )
        .title("Spotify and TikTok Popularity of Popular Pop Artists' Songs")
        .width(800)
        .height(500)
        .toSpec();

    // visualization 2

    // visualization 3

    // visualization 4
    const vlSpec4 = vl
        .markCircle()
        .data(data
            .filter(d =>  d["Spotify Streams"])
            .sort((a, b) => d3.descending(+a["Spotify Streams"], +b["Spotify Streams"]))
            .slice(0, 30)).title("Top 30 most popular Spotify Songs vs TikTok Posts, with release date")
        .encode(
            vl.x().fieldT("Release Date").title("Release Date"),
            vl.y().fieldQ("Spotify Streams"),
            vl.color().fieldN("Track").legend(null),
            vl.size().fieldQ("TikTok Posts"),
            vl.tooltip(
                [
                    vl.fieldN("Track"),
                    vl.fieldN("Artist")
                ]
            )
        )
        .width(800)
        .height(500)
        .toSpec();



    //render
    render("#view", vlSpec);
    render("#view4", vlSpec4);

});

async function render(viewID, spec) {
    const result = await vegaEmbed(viewID, spec);
    result.view.run();
}