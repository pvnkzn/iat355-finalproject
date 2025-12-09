// Load data from datasets/videogames_wide.csv using d3.csv and then make visualizations
async function fetchData() {
    const data = await d3.csv("./dataset/Most_Streamed_Spotify_Songs_2024.csv");
    return data;
}

fetchData().then(async (data) => {

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
                    {field: "Track"},
                    {field: "Artist"}
                ]
            )
        )
        .title("Top 30 most popular Spotify Songs vs TikTok Views, with release date")
        .width(600)
        .height(500)
        .toSpec();
        

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
            vl.color().fieldN("Metric").title("Platform").scale({range:["#44a832","#3432a8","#a83e32",]}),
            vl.tooltip([
                {field: "Artist", type: "nominal"},
                {field: "Track", type: "nominal"},
                {field: "TikTok Views", type: "quantitative"},
                {field: "Spotify Streams", type: "quantitative"},
                {field: "YouTube Views", type: "quantitative"}
            ])
        )
        .width(800)
        .height(400)
        .title("Top 20 Most Viral Songs on Tiktok Compared with Spotify Streams")
        .toSpec();


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


    // visualization 4 NEW

    const bbno$FilteredTiktok = bbno$
        .filter(d => d["TikTok Views"] && d["TikTok Posts"] && d["TikTok Likes"])
        .sort((a, b) => d3.descending(+a["TikTok Views"], +b["TikTok Views"]))
        .slice(0, 20)
        .flatMap(d => [
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
        .flatMap(d => [
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
        .flatMap(d => [
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

    const vlSpec4 = vl
        .layer(
            vl.markBar()
            .data(bbno$FilteredTiktok)
            .encode(
                vl.y().fieldN("Track").sort("-x"),
                vl.x().fieldQ("Value").title("Views / Streams"),
                vl.color().fieldN("Metric").title("Platform").scale({range:["#44a832","#3432a8","#a83e32",]}),
                vl.tooltip([
                    {field: "Artist", type: "nominal"},
                    {field: "Track", type: "nominal"},
                    {field: "TikTok Views", type: "quantitative"},
                    {field: "TikTok Posts", type: "quantitative"},
                    {field: "TikTok Likes", type: "quantitative"}
                ])
            ),
            vl.markBar()
            .data(hozierFilteredTiktok)
            .encode(
                vl.y().fieldN("Track").sort("-x"),
                vl.x().fieldQ("Value").title("Views / Streams"),
                vl.color().fieldN("Metric").title("Platform").scale({range:["#44a832","#3432a8","#a83e32",]}),
                vl.tooltip([
                    {field: "Artist", type: "nominal"},
                    {field: "Track", type: "nominal"},
                    {field: "TikTok Views", type: "quantitative"},
                    {field: "TikTok Posts", type: "quantitative"},
                    {field: "TikTok Likes", type: "quantitative"}
                ])
            ),
            vl.markBar()
            .data(sabrinaFilteredTiktok)
            .encode(
                vl.y().fieldN("Track").sort("-x"),
                vl.x().fieldQ("Value").title("Views / Streams"),
                vl.color().fieldN("Metric").title("Platform").scale({range:["#44a832","#3432a8","#a83e32",]}),
                vl.tooltip([
                    {field: "Artist", type: "nominal"},
                    {field: "Track", type: "nominal"},
                    {field: "TikTok Views", type: "quantitative"},
                    {field: "TikTok Posts", type: "quantitative"},
                    {field: "TikTok Likes", type: "quantitative"}
                ])
            )
        )
        .width(800)
        .height(400)
        .title("Artist Comparisons")
        .toSpec();

    // visualization 5

    const bbno$FilteredPlatforms = bbno$
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
    ])

    const vlSpec5 = vl
        .markArc()
        .data(bbno$FilteredPlatforms)
        .encode(
            vl.theta().fieldQ("Value").title("Views / Streams"),
            vl.color().fieldN("Metric").title("Platform").scale({range:["#44a832","#3432a8","#a83e32",]}),
            vl.tooltip([
                {field: "Artist", type: "nominal"},
                {field: "Track", type: "nominal"},
                {field: "TikTok Views", type: "quantitative"},
                {field: "Spotify Streams", type: "quantitative"},
                {field: "YouTube Views", type: "quantitative"}
            ])
        )
        .width(800)
        .height(400)
        .title("Artist Comparisons")
        .toSpec();

    // visualization 6

    const hozierFilteredPlatforms = hozier
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
    ])

    const vlSpec6 = vl
        .markArc()
        .data(hozierFilteredPlatforms)
        .encode(
            vl.theta().fieldQ("Value").title("Views / Streams"),
            vl.color().fieldN("Metric").title("Platform").scale({range:["#44a832","#3432a8","#a83e32",]}),
            vl.tooltip([
                {field: "Artist", type: "nominal"},
                {field: "Track", type: "nominal"},
                {field: "TikTok Views", type: "quantitative"},
                {field: "Spotify Streams", type: "quantitative"},
                {field: "YouTube Views", type: "quantitative"}
            ])
        )
        .width(800)
        .height(400)
        .title("Artist Comparisons")
        .toSpec();

    // visualization 7

    const sabrinaFilteredPlatforms = sabrina
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
    ])

    const vlSpec7 = vl
        .markArc()
        .data(sabrinaFilteredPlatforms)
        .encode(
            vl.theta().fieldQ("Value").title("Views / Streams"),
            vl.color().fieldN("Metric").title("Platform").scale({range:["#44a832","#3432a8","#a83e32",]}),
            vl.tooltip([
                {field: "Artist", type: "nominal"},
                {field: "Track", type: "nominal"},
                {field: "TikTok Views", type: "quantitative"},
                {field: "Spotify Streams", type: "quantitative"},
                {field: "YouTube Views", type: "quantitative"}
            ])
        )
        .width(800)
        .height(400)
        .title("Artist Comparisons")
        .toSpec();

    //render
    render("#view", vlSpec);
    render("#view2", vlSpec2);
    render("#view3", vlSpec3);
    render("#view4", vlSpec4);
    render("#view5", vlSpec5);
    render("#view6", vlSpec6);
    render("#view7", vlSpec7);

});

async function render(viewID, spec) {
    const result = await vegaEmbed(viewID, spec);
    result.view.run();
}