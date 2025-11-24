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
    const filteredSpotify = data
        .filter(d => d["Spotify Streams"])
        .sort((a, b) => d3.descending(+a["Spotify Streams"], +b["Spotify Streams"]))
        .slice(0, 30)
        .map(d => (
            { 
                Track: d["Track"], 
                Artist: d["Artist"], 
                Metric: "Spotify Streams", 
                Value: +d["Spotify Streams"], 
                "Spotify Streams": +d["Spotify Streams"]
            }
        ));
        
    const vlSpec2 = vl
        .markBar()
        .data(filteredSpotify)
        .encode(
            vl.y().fieldN("Track").sort("-x").title("Track Title"),
            vl.x().fieldQ("Value").title("Views / Streams"),
            vl.color().fieldN("Artist").title("Artist"),
            vl.tooltip([
                vl.fieldN("Artist"),
                vl.fieldN("Track"),
                vl.fieldQ("Spotify Streams")
            ])
        )
        .width(800)
        .height(400)
        .title("Top 30 Most Streamed Spotify Songs")
        .toSpec();

    // visualization 3
    const filteredTiktok = data
        .filter(d => d["TikTok Posts"])
        .sort((a, b) => d3.descending(+a["TikTok Posts"], +b["TikTok Posts"]))
        .slice(0, 30)
        .map(d => (
            { 
                Track: d["Track"], 
                Artist: d["Artist"], 
                Metric: "TikTok Posts", 
                Value: +d["TikTok Posts"], 
                "TikTok Posts": +d["TikTok Posts"]
            }
        ));

    const vlSpec3 = vl
        .markBar()
        .data(filteredTiktok)
        .encode(
            vl.y().fieldN("Track").sort("-x").title("Track Title"),
            vl.x().fieldQ("Value").title("Posts"),
            vl.color().fieldN("Artist").title("Artist"),
            vl.tooltip([
                vl.fieldN("Artist"),
                vl.fieldN("Track"),
                vl.fieldQ("TikTok Posts")
            ])
        )
        .width(800)
        .height(400)
        .title("Top 30 Most Posted TikTok Songs")
        .toSpec();

    // visualization 4
    const filteredSpotifyTiktok = data
        .filter(d => d["Spotify Streams"])
        .sort((a, b) => d3.descending(+a["Spotify Streams"], +b["Spotify Streams"]))
        .slice(0, 30);


    const vlSpec4 = vl
        .markCircle()
        .data(filteredSpotifyTiktok)
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
        // .width(800)
        // .height(500)
        .title("Top 30 most popular Spotify Songs vs TikTok Posts, with release date")
        .toSpec();


    //render
    render("#view", vlSpec);
    render("#view2", vlSpec2);
    render("#view3", vlSpec3);
    render("#view4", vlSpec4);

});

async function render(viewID, spec) {
    const result = await vegaEmbed(viewID, spec);
    result.view.run();
}