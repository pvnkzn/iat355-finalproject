// Load data from datasets/videogames_wide.csv using d3.csv and then make visualizations
async function fetchData() {
    const data = await d3.csv("./dataset/Most_Streamed_Spotify_Songs_2024.csv");
    return data;
}

fetchData().then(async (data) => {

    // visualization 1 OLD
    // const vlSpec = vl
    //     .markCircle()
    //         .data(data)
    //         .transform(
    //             // filtering some popular artists
    //             {filter: {field: "Artist", oneOf: ["Dua Lipa", "Ariana Grande", "Taylor Swift", "Bruno Mars", "Shawn Mendes", "Justin Bieber", "Rihanna"]}}
    //         )
    //         .encode(
    //             vl.x().fieldT("Release Date"),
    //             vl.y().fieldQ("TikTok Views"),
    //             vl.size().fieldQ("Spotify Streams"),
    //             vl.color().fieldN("Artist"),
    //             vl.tooltip(
    //                 [
    //                     {field: "Track"},
    //                     {field: "Artist"},
    //                     {field: "Spotify Streams"},
    //                     {field: "TikTok Views"}
    //                 ]
    //             )
    //         )
    //     .title("Spotify and TikTok Popularity of Popular Pop Artists' Songs")
    //     .width(800)
    //     .height(500)
    //     .toSpec();

    // visualization 1 NEW
    const filteredSpotifySongsTiktokViews = data
        .filter(d => d["TikTok Views"])
        .sort((a, b) => d3.descending(+a["TikTok Views"], +b["TikTok Views"]))
        .slice(0, 30);

    const vlSpec = vl
        .markCircle()
        .data(filteredSpotifySongsTiktokViews)
        .encode(
            vl.x().fieldQ("TikTok Views").title("TikTok Views"),
            vl.y().fieldQ("Spotify Streams"),
            vl.color().fieldN("Track"),
            vl.tooltip(
                [
                    // vl.fieldN("Track"),
                    // vl.fieldN("Artist")
                    {field: "Track"},
                    {field: "Artist"}
                ]
            )
        )
        .title("Top 30 most popular Spotify Songs vs TikTok Views, with release date")
        .width(600)
        .height(500)
        .toSpec();
        

    // visualization 2 OLD
    // const filteredSpotify = data
    //     .filter(d => d["Spotify Streams"])
    //     .sort((a, b) => d3.descending(+a["Spotify Streams"], +b["Spotify Streams"]))
    //     .slice(0, 30)
    //     .map(d => (
    //         { 
    //             Track: d["Track"], 
    //             Artist: d["Artist"], 
    //             Metric: "Spotify Streams", 
    //             Value: +d["Spotify Streams"], 
    //             "Spotify Streams": +d["Spotify Streams"]
    //         }
    //     ));
        
    // const vlSpec2 = vl
    //     .markBar()
    //     .data(filteredSpotify)
    //     .encode(
    //         vl.y().fieldN("Track").sort("-x").title("Track Title"),
    //         vl.x().fieldQ("Value").title("Views / Streams"),
    //         vl.color().fieldN("Artist").title("Artist"),
    //         vl.tooltip([
    //             vl.fieldN("Artist"),
    //             vl.fieldN("Track"),
    //             vl.fieldQ("Spotify Streams")
    //         ])
    //     )
    //     .width(800)
    //     .height(400)
    //     .title("Top 30 Most Streamed Spotify Songs")
    //     .toSpec();

    // visualization 2 NEW
    const viralSongs = data
        .filter(d => d["TikTok Views"] && d["Spotify Streams"] && d["YouTube Views"])
        .sort((a, b) => d3.descending(+a["TikTok Views"], +b["TikTok Views"]))
        .slice(0, 20)
        .flatMap(d => [
            { 
                Track: d["Track"], 
                Artist: d["Artist"], 
                Metric: "TikTok Views", 
                Value: +d["TikTok Views"], 
                "TikTok Views": +d["TikTok Views"], 
                "Spotify Streams": +d["Spotify Streams"],
                "YouTube Views": +d["YouTube Views"]
            },
            { 
                Track: d["Track"], 
                Artist: d["Artist"], 
                Metric: "Spotify Streams", 
                Value: +d["Spotify Streams"], 
                "TikTok Views": +d["TikTok Views"], 
                "Spotify Streams": +d["Spotify Streams"],
                "YouTube Views": +d["YouTube Views"]
            },
            { 
                Track: d["Track"], 
                Artist: d["Artist"], 
                Metric: "YouTube Views", 
                Value: +d["YouTube Views"], 
                "TikTok Views": +d["TikTok Views"], 
                "Spotify Streams": +d["Spotify Streams"],
                "YouTube Views": +d["YouTube Views"]
            }
        ]);

    const vlSpec2 = vl
        .markBar()
        .data(viralSongs)
        .encode(
            vl.y().fieldN("Track").sort("-x").title("Track Title"),
            vl.x().fieldQ("Value").title("Views / Streams"),
            vl.color().fieldN("Metric").title("Platform").scale({range:["#44a832","#3432a8","#a83e32",]})
            // vl.tooltip([
            //     {field: "Artist", type: "nominal"},
            //     {field: "Track", type: "nominal"},
            //     {field: "TikTok Views", type: "quantitative"},
            //     {field: "Spotify Streams", type: "quantitative"},
            //     {field: "YouTube Views", type: "quantitative"}
            // ])
        )
        .width(800)
        .height(400)
        .title("Top 20 Most Viral Songs on Tiktok Compared with Spotify Streams")
        .toSpec();

    


    // visualization 3 OLD
    // const filteredTiktok = data
    //     .filter(d => d["TikTok Posts"])
    //     .sort((a, b) => d3.descending(+a["TikTok Posts"], +b["TikTok Posts"]))
    //     .slice(0, 30)
    //     .map(d => (
    //         { 
    //             Track: d["Track"], 
    //             Artist: d["Artist"], 
    //             Metric: "TikTok Posts", 
    //             Value: +d["TikTok Posts"], 
    //             "TikTok Posts": +d["TikTok Posts"]
    //         }
    //     ));

    // const vlSpec3 = vl
    //     .markBar()
    //     .data(filteredTiktok)
    //     .encode(
    //         vl.y().fieldN("Track").sort("-x").title("Track Title"),
    //         vl.x().fieldQ("Value").title("Posts"),
    //         vl.color().fieldN("Artist").title("Artist"),
    //         vl.tooltip([
    //             vl.fieldN("Artist"),
    //             vl.fieldN("Track"),
    //             vl.fieldQ("TikTok Posts")
    //         ])
    //     )
    //     .width(800)
    //     .height(400)
    //     .title("Top 30 Most Posted TikTok Songs")
    //     .toSpec();


    //visualization 3 NEW
    const bbno$ = data
        .filter((d) => {
            return typeof(d.Artist)==="string" && d.Artist.toLowerCase().includes("bbno$") && d.Track;
    });

    const hozier = data
        .filter((d) => {
            return typeof(d.Artist)==="string" && d.Artist.toLowerCase().includes("hozier") && d.Track;
    });

    const sabrina = data
        .filter((d) => {
            return typeof(d.Artist)==="string" && d.Artist.toLowerCase().includes("sabrina") && d.Track.toLowerCase().includes("espresso");
    });

    const bbno$FilteredTiktokSpotify = bbno$
        .filter(d => d["TikTok Views"] && d["Spotify Streams"])
        .sort((a, b) => d3.descending(+a["TikTok Views"], +b["TikTok Views"]))
        .slice(0, 20)
        .flatMap(d => [
        { 
          Track: d["Track"], 
          Artist: d["Artist"], 
          Metric: "TikTok Views", 
          Value: +d["TikTok Views"], 
          "TikTok Views": +d["TikTok Views"], 
          "Spotify Streams": +d["Spotify Streams"]
        },
        { 
          Track: d["Track"], 
          Artist: d["Artist"], 
          Metric: "Spotify Streams", 
          Value: +d["Spotify Streams"], 
          "TikTok Views": +d["TikTok Views"], 
          "Spotify Streams": +d["Spotify Streams"]
        }
    ])

    const hozierFilteredTiktokSpotify = hozier
        .filter(d => d["TikTok Views"] && d["Spotify Streams"])
        .sort((a, b) => d3.descending(+a["TikTok Views"], +b["TikTok Views"]))
        .slice(0, 20)
        .flatMap(d => [
        { 
          Track: d["Track"], 
          Artist: d["Artist"], 
          Metric: "TikTok Views", 
          Value: +d["TikTok Views"], 
          "TikTok Views": +d["TikTok Views"], 
          "Spotify Streams": +d["Spotify Streams"]
        },
        { 
          Track: d["Track"], 
          Artist: d["Artist"], 
          Metric: "Spotify Streams", 
          Value: +d["Spotify Streams"], 
          "TikTok Views": +d["TikTok Views"], 
          "Spotify Streams": +d["Spotify Streams"]
        }
    ])

    const sabrinaFilteredTiktokSpotify = sabrina
        .filter(d => d["TikTok Views"] && d["Spotify Streams"])
        .sort((a, b) => d3.descending(+a["TikTok Views"], +b["TikTok Views"]))
        .slice(0, 20)
        .flatMap(d => [
        { 
          Track: d["Track"], 
          Artist: d["Artist"], 
          Metric: "TikTok Views", 
          Value: +d["TikTok Views"], 
          "TikTok Views": +d["TikTok Views"], 
          "Spotify Streams": +d["Spotify Streams"]
        },
        { 
          Track: d["Track"], 
          Artist: d["Artist"], 
          Metric: "Spotify Streams", 
          Value: +d["Spotify Streams"], 
          "TikTok Views": +d["TikTok Views"], 
          "Spotify Streams": +d["Spotify Streams"]
        }
    ])


    const vlSpec3 = vl
        .layer(
            vl.markBar()
            .data(bbno$FilteredTiktokSpotify)
            .encode(
                vl.y().fieldN("Track").sort("-x"),
                vl.x().fieldQ("Value").title("Views / Streams"),
                vl.color().fieldN("Metric").title("Platform").scale({scheme:"redblue"}),
                vl.tooltip([
                    {field: "Artist", type: "nominal"},
                    {field: "Track", type: "nominal"},
                    {field: "TikTok Views", type: "quantitative"},
                    {field: "Spotify Streams", type: "quantitative"},
                ])
            ),
            vl.markBar()
            .data(hozierFilteredTiktokSpotify)
            .encode(
                vl.y().fieldN("Track").sort("-x"),
                vl.x().fieldQ("Value").title("Views / Streams"),
                vl.color().fieldN("Metric").title("Platform").scale({scheme:"redblue"}),
                vl.tooltip([
                    {field: "Artist", type: "nominal"},
                    {field: "Track", type: "nominal"},
                    {field: "TikTok Views", type: "quantitative"},
                    {field: "Spotify Streams", type: "quantitative"},
                ])
            ),
            vl.markBar()
            .data(sabrinaFilteredTiktokSpotify)
            .encode(
                vl.y().fieldN("Track").sort("-x"),
                vl.x().fieldQ("Value").title("Views / Streams"),
                vl.color().fieldN("Metric").title("Platform").scale({scheme:"redblue"}),
                vl.tooltip([
                    {field: "Artist", type: "nominal"},
                    {field: "Track", type: "nominal"},
                    {field: "TikTok Views", type: "quantitative"},
                    {field: "Spotify Streams", type: "quantitative"},
                ])
            )
        )
        .width(800)
        .height(400)
        .title("Artist Comparisons")
        .toSpec();

            
            





    // visualization 4 OLD
    // const filteredSpotifyTiktok = data
    //     .filter(d => d["Spotify Streams"])
    //     .sort((a, b) => d3.descending(+a["Spotify Streams"], +b["Spotify Streams"]))
    //     .slice(0, 30);


    // const vlSpec4 = vl
    //     .markCircle()
    //     .data(filteredSpotifyTiktok)
    //     .encode(
    //         vl.x().fieldT("Release Date").title("Release Date"),
    //         vl.y().fieldQ("Spotify Streams"),
    //         vl.color().fieldN("Track").legend(null),
    //         vl.size().fieldQ("TikTok Posts"),
    //         vl.tooltip(
    //             [
    //                 vl.fieldN("Track"),
    //                 vl.fieldN("Artist")
    //             ]
    //         )
    //     )
    //     .width(600)
    //     .height(500)
    //     .title("Top 30 most popular Spotify Songs vs TikTok Posts, with release date")
    //     .toSpec();

    // visualization 4 NEW

    const bbno$FilteredTiktok = bbno$
        .filter(d => d["TikTok Views"] && d["TikTok Posts"] && d["TikTok Likes"])
        .sort((a, b) => d3.descending(+a["TikTok Views"], +b["TikTok Views"]))
        .slice(0, 20)
        .map(d => [
        { 
          Track: d["Track"], 
          Artist: d["Artist"], 
          Metric: "TikTok Views", 
          Value: +d["TikTok Views"], 
          "TikTok Views": +d["TikTok Views"], 
          "TikTok Posts": +d["TikTok Posts"],
          "TikTok Likes": +d["TikTok Likes"]
        },
        { 
          Track: d["Track"], 
          Artist: d["Artist"], 
          Metric: "TikTok Posts", 
          Value: +d["TikTok Posts"], 
          "TikTok Views": +d["TikTok Views"], 
          "TikTok Posts": +d["TikTok Posts"],
          "TikTok Likes": +d["TikTok Likes"]
        },
        { 
          Track: d["Track"], 
          Artist: d["Artist"], 
          Metric: "TikTok Likes", 
          Value: +d["TikTok Likes"], 
          "TikTok Views": +d["TikTok Views"], 
          "TikTok Posts": +d["TikTok Posts"],
          "TikTok Likes": +d["TikTok Likes"]
        }
    ])
  
    const hozierFilteredTiktok = hozier
        .filter(d => d["TikTok Views"] && d["TikTok Posts"] && d["TikTok Likes"])
        .sort((a, b) => d3.descending(+a["TikTok Views"], +b["TikTok Views"]))
        .slice(0, 20)
        .map(d => [
        { 
          Track: d["Track"], 
          Artist: d["Artist"], 
          Metric: "TikTok Views", 
          Value: +d["TikTok Views"], 
          "TikTok Views": +d["TikTok Views"], 
          "TikTok Posts": +d["TikTok Posts"],
          "TikTok Likes": +d["TikTok Likes"]
        },
        { 
          Track: d["Track"], 
          Artist: d["Artist"], 
          Metric: "TikTok Posts", 
          Value: +d["TikTok Posts"], 
          "TikTok Views": +d["TikTok Views"], 
          "TikTok Posts": +d["TikTok Posts"],
          "TikTok Likes": +d["TikTok Likes"]
        },
        { 
          Track: d["Track"], 
          Artist: d["Artist"], 
          Metric: "TikTok Likes", 
          Value: +d["TikTok Likes"], 
          "TikTok Views": +d["TikTok Views"], 
          "TikTok Posts": +d["TikTok Posts"],
          "TikTok Likes": +d["TikTok Likes"]
        }
    ])
        
    const sabrinaFilteredTiktok = sabrina
        .filter(d => d["TikTok Views"] && d["TikTok Posts"] && d["TikTok Likes"])
        .sort((a, b) => d3.descending(+a["TikTok Views"], +b["TikTok Views"]))
        .slice(0, 20)
        .map(d => [
        { 
          Track: d["Track"], 
          Artist: d["Artist"], 
          Metric: "TikTok Views", 
          Value: +d["TikTok Views"], 
          "TikTok Views": +d["TikTok Views"], 
          "TikTok Posts": +d["TikTok Posts"],
          "TikTok Likes": +d["TikTok Likes"]
        },
        { 
          Track: d["Track"], 
          Artist: d["Artist"], 
          Metric: "TikTok Posts", 
          Value: +d["TikTok Posts"], 
          "TikTok Views": +d["TikTok Views"], 
          "TikTok Posts": +d["TikTok Posts"],
          "TikTok Likes": +d["TikTok Likes"]
        },
        { 
          Track: d["Track"], 
          Artist: d["Artist"], 
          Metric: "TikTok Likes", 
          Value: +d["TikTok Likes"], 
          "TikTok Views": +d["TikTok Views"], 
          "TikTok Posts": +d["TikTok Posts"],
          "TikTok Likes": +d["TikTok Likes"]
        }
    ])


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