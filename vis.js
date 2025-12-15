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
        .slice(0, 10);

    const vlSpec = vl
        .markCircle({size:150})
        .background("transparent")
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
        // .width(600)
        .width("container")
        .height(500)
        .title({
            text: "Top 10 most popular Spotify Songs vs TikTok Views, with release date",
            fontSize: 24,
            color:"#212121",
            offset: 15 //space between title and chart
        })

        .config({
            axis: {
                domainColor: '#212121',
                tickColor: '#212121', 
                labelColor: '#212121', 
                titleColor: '#212121',
                gridColor: '#212121',
                labelFontSize: 16,
                titleFontSize: 18,
            },
            legend: {
                labelColor: '#212121',
                titleColor: '#212121',
        
        },
            header: {
                labelColor: '#212121',
                titleColor: '#212121',
            }
        })
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

    const viralSongsTiktok = data
        .filter(d => d["TikTok Views"])
        .sort((a, b) => d3.descending(+a["TikTok Views"], +b["TikTok Views"]))
        .slice(0, 10)
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
        ]);
    
    const viralSongsSpotify = data
        .filter(d => d["TikTok Views"] && d["Spotify Streams"] && d["YouTube Views"])
        .sort((a, b) => d3.descending(+a["TikTok Views"], +b["TikTok Views"]))
        .slice(0, 10)
        .flatMap(d => [
            { 
                Track: d["Track"], 
                Artist: d["Artist"], 
                Metric: "Spotify Streams", 
                Value: +d["Spotify Streams"], 
                "TikTok Views": +d["TikTok Views"], 
                "Spotify Streams": +d["Spotify Streams"],
                "YouTube Views": +d["YouTube Views"]
            },
        ]);

    const viralSongsYoutube = data
        .filter(d => d["TikTok Views"] && d["Spotify Streams"] && d["YouTube Views"])
        .sort((a, b) => d3.descending(+a["TikTok Views"], +b["TikTok Views"]))
        .slice(0, 10)
        .flatMap(d => [
            { 
                Track: d["Track"], 
                Artist: d["Artist"], 
                Metric: "YouTube Views", 
                Value: +d["YouTube Views"], 
                "TikTok Views": +d["TikTok Views"], 
                "Spotify Streams": +d["Spotify Streams"],
                "YouTube Views": +d["YouTube Views"]
            },
        ]);

    const vlSpec2 = vl
        .markBar()
        .background("transparent")
        .data(viralSongsTiktok)
        .encode(
            vl.y().fieldN("Track").sort("-x").title("Track Title"),
            vl.x().fieldQ("Value").title("Views / Streams"),
            vl.color().fieldN("Metric").title("Platform").scale({range:["#7cb5f7"]}),
            vl.tooltip([
                {field: "Artist", type: "nominal"},
                {field: "Track", type: "nominal"},
                {field: "TikTok Views", type: "quantitative"},
                // {field: "Spotify Streams", type: "quantitative"},
                // {field: "YouTube Views", type: "quantitative"}
            ])
        )
        // .width(800)
        .width("container")
        .height(400)
        // .title("Top 20 Most Viral Songs on Tiktok Compared with Spotify Streams")
        .title({
            text: "Top 10 Most Viral Songs on Tiktok (with views)",
            fontSize: 24,
            color:"#212121",
            offset: 15 //space between title and chart
        })

        .config({
            axis: {
                domainColor: '#212121',
                tickColor: '#212121', 
                labelColor: '#212121', 
                titleColor: '#212121',
                gridColor: '#212121',
                labelFontSize: 16,
                titleFontSize: 18,
            },
            legend: {
                labelColor: '#212121',
                titleColor: '#212121',
        
        },
            header: {
                labelColor: '#212121',
                titleColor: '#212121',
            }
        })
        .toSpec();

    

    // const vlSpec2 = vl
    //     .markBar()
    //     .data(viralSongs)
    //     .encode(
    //         vl.y().fieldN("Track").sort("-x").title("Track Title"),
    //         vl.x().fieldQ("Value").title("Views / Streams"),
    //         vl.color().fieldN("Metric").title("Platform").scale({range:["#44a832","#3432a8","#a83e32",]}),
    //         vl.tooltip([
    //             {field: "Artist", type: "nominal"},
    //             {field: "Track", type: "nominal"},
    //             {field: "TikTok Views", type: "quantitative"},
    //             {field: "Spotify Streams", type: "quantitative"},
    //             {field: "YouTube Views", type: "quantitative"}
    //         ])
    //     )
    //     // .width(800)
    //     .width("container")
    //     .height(400)
    //     .title("Top 20 Most Viral Songs on Tiktok Compared with Spotify Streams")
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
        // .width(800)
        .width("container")
        .height(400)
        .title("Artist Comparisons")
        .toSpec();


    // visualization 4 NEW

    const bbno$FilteredTiktok = bbno$
         .filter(d => d["TikTok Views"] && d["TikTok Likes"])
      .sort((a, b) => d3.descending(a["TikTok Views"], b["TikTok Views"]))
      .slice(0, 20)
      .flatMap(d => [
        { 
          Track: d["Track"], 
          Artist: d["Artist"], 
          Metric: "TikTok Views", 
          Value: d["TikTok Views"], 
          "TikTok Views": d["TikTok Views"], 
          "TikTok Likes": d["TikTok Likes"]
        },
        
        { 
          Track: d["Track"], 
          Artist: d["Artist"], 
          Metric: "TikTok Likes", 
          Value: d["TikTok Likes"], 
          "TikTok Views": d["TikTok Views"], 
          "TikTok Posts": d["TikTok Posts"],
          "TikTok Likes": d["TikTok Likes"]
        }
      ])
  
    const hozierFilteredTiktok = hozier
        .filter(d => d["TikTok Views"] && d["TikTok Likes"])
      .sort((a, b) => d3.descending(a["TikTok Views"], b["TikTok Views"]))
      .slice(0, 20)
      .flatMap(d => [
        { 
          Track: d["Track"], 
          Artist: d["Artist"], 
          Metric: "TikTok Views", 
          Value: d["TikTok Views"], 
          "TikTok Views": d["TikTok Views"], 
          
          "TikTok Likes": d["TikTok Likes"]
        },
        { 
          Track: d["Track"], 
          Artist: d["Artist"], 
          Metric: "TikTok Likes", 
          Value: d["TikTok Likes"], 
          "TikTok Views": d["TikTok Views"], 
    
          "TikTok Likes": d["TikTok Likes"]
        }
      ])
   
        
    const sabrinaFilteredTiktok = sabrina
         .filter(d => d["TikTok Views"] && d["TikTok Likes"])
      .sort((a, b) => d3.descending(a["TikTok Views"], b["TikTok Views"]))
      .slice(0, 20)
      .flatMap(d => [
        { 
          Track: d["Track"], 
          Artist: d["Artist"], 
          Metric: "TikTok Views", 
          Value: d["TikTok Views"], 
          "TikTok Views": d["TikTok Views"], 
          "TikTok Likes": d["TikTok Likes"]
        },
       
        { 
          Track: d["Track"], 
          Artist: d["Artist"], 
          Metric: "TikTok Likes", 
          Value: d["TikTok Likes"], 
          "TikTok Views": d["TikTok Views"], 
          "TikTok Likes": d["TikTok Likes"]
        }
      ])
  

    const vlSpec4 = vl
        .layer(
            vl.markBar()
            .data(bbno$FilteredTiktok)
            .encode(
    vl.y().fieldN("Track").sort("-x"),
    vl.yOffset().fieldN("Metric"),
    vl.x().fieldQ("Value").title("Views / Streams"),
    vl.color().fieldN("Metric").title("Platform").scale({range:["#ff26d0","#26f8ff"]}),
    vl.tooltip([
      {field: "Artist", type: "nominal"},
      {field: "Track", type: "nominal"},
      {field: "TikTok Views", type: "quantitative"},
      {field: "TikTok Likes", type: "quantitative"}
    ])
  ),
  vl.markBar()
  .data(
    hozier
      .filter(d => d["TikTok Views"] && d["TikTok Likes"])
      .sort((a, b) => d3.descending(a["TikTok Views"], b["TikTok Views"]))
      .slice(0, 20)
      .flatMap(d => [
        { 
          Track: d["Track"], 
          Artist: d["Artist"], 
          Metric: "TikTok Views", 
          Value: d["TikTok Views"], 
          "TikTok Views": d["TikTok Views"], 
          
          "TikTok Likes": d["TikTok Likes"]
        },
        { 
          Track: d["Track"], 
          Artist: d["Artist"], 
          Metric: "TikTok Likes", 
          Value: d["TikTok Likes"], 
          "TikTok Views": d["TikTok Views"], 
    
          "TikTok Likes": d["TikTok Likes"]
        }
      ])
  )
  .encode(
    vl.y().fieldN("Track").sort("-x"),
    vl.yOffset().fieldN("Metric"),
    vl.x().fieldQ("Value").title("Views / Streams"),
    vl.color().fieldN("Metric").title("Platform").scale({range:["#ff26d0","#26f8ff"]}),
    vl.tooltip([
      {field: "Artist", type: "nominal"},
      {field: "Track", type: "nominal"},
      {field: "TikTok Views", type: "quantitative"},
      {field: "TikTok Likes", type: "quantitative"}
    ])
  ),
vl.markBar()
.data(
 sabrina
      .filter(d => d["TikTok Views"] && d["TikTok Likes"])
      .sort((a, b) => d3.descending(a["TikTok Views"], b["TikTok Views"]))
      .slice(0, 20)
      .flatMap(d => [
        { 
          Track: d["Track"], 
          Artist: d["Artist"], 
          Metric: "TikTok Views", 
          Value: d["TikTok Views"], 
          "TikTok Views": d["TikTok Views"], 
          "TikTok Likes": d["TikTok Likes"]
        },
       
        { 
          Track: d["Track"], 
          Artist: d["Artist"], 
          Metric: "TikTok Likes", 
          Value: d["TikTok Likes"], 
          "TikTok Views": d["TikTok Views"], 
          "TikTok Likes": d["TikTok Likes"]
        }
      ])
  )
  .encode(
    vl.y().fieldN("Track").sort("-x"),
    vl.yOffset().fieldN("Metric"),
    vl.x().fieldQ("Value").title("Views / Streams"),
    vl.color().fieldN("Metric").title("Platform").scale({range:["#ff26d0","#26f8ff"]}),
    vl.tooltip([
      {field: "Artist", type: "nominal"},
      {field: "Track", type: "nominal"},
     {field: "TikTok Views", type: "quantitative"},
      {field: "TikTok Likes", type: "quantitative"}
    ])
)
        )
        
        .background("transparent")
        .width("container")
        .title({
            text: "3 Artists TikTok Engagement",
            fontSize: 24,
            color:"#F3FACE",
            offset: 15 //space between title and chart
    })

        .config({

        axis: {
            domainColor: '#F3FACE',
            tickColor: '#F3FACE', 
            labelColor: '#F3FACE', 
            titleColor: '#F3FACE',
            
            labelFontSize: 16,
            titleFontSize: 18,
        },
        legend: {
            labelColor: '#F3FACE',
            titleColor: '#F3FACE',
        
        },
        header: {
            labelColor: '#F3FACE',
            titleColor: '#F3FACE'
        }
    })


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
    .layer(
        // Layer 1: pie
        vl.markArc({ outerRadius: 200}) 
            .encode(
                vl.theta().fieldQ("Value").title("Views / Streams"),
                vl.color().fieldN("Metric").scale({range:["#D8EA75","#5BE3C3","#EA7577",]}).legend(null), // Legend removed
                vl.tooltip([
                    {field: "Metric", type: "nominal", title: "Platform"},
                    {field: "Value", type: "quantitative", format: ",.0f", title: "Streams/Views"
                    },
                    {field: "percent_of_total", type: "quantitative", format: ".1%", title: "Percentage"} 
                ])  
            ),
        
        // layer 2: tiktok
        vl.markText({
            radius: 70,    
            align: 'left', 
            fontSize: 24,
            dy: 300,         
            dx: -70
        })

        .encode(
            vl.theta().fieldQ("Value"),
            vl.text().fieldN("combined_label"),
            vl.color().fieldN("Metric").scale({range:["#D8EA75","#5BE3C3","#EA7577",]})
        )
        .transform([
            vl.filter("datum.Metric === 'TikTok Views'") 
        ]),
        
        // Layer 3: spotify
        vl.markText({
            radius: 180,    
            align: 'left',  
            fontSize: 24,
            dx: -10,  
            dy: -45
        })
        .encode(
            vl.theta().fieldQ("Value"),
            vl.text().fieldN("combined_label"),
            vl.color().fieldN("Metric").scale({range:["#D8EA75","#5BE3C3","#EA7577",]})
        )
        .transform([
            vl.filter("datum.Metric === 'Spotify Streams'") 
        ]),
        
        // layer 4: Yyouytube label
        vl.markText({
            radius: 180,    
            align: 'center', 
            fontSize: 24,
            dx: -135,
            dy: -45 
        })

        .encode(
            vl.theta().fieldQ("Value"),
            vl.text().fieldN("combined_label"),
            vl.color().fieldN("Metric").scale({range:["#D8EA75","#5BE3C3","#EA7577",]})
        )
        .transform([
            vl.filter("datum.Metric === 'YouTube Views'") 
        ])
    )

    // Global Properties and Transforms Outside .layer()
    .transform([
        { aggregate: [{ op: "sum", field: "Value", as: "Value" }], groupby: ["Metric"] },
        { window: [{ op: "sum", field: "Value", as: "Total" }], frame: [null, null] },
        { calculate: "datum.Value / datum.Total", as: "percent_of_total" },
        { calculate: "datum.Metric + ' (' + format(datum.percent_of_total, '.1%') + ')'", as: "combined_label" }
    ])
    .data(bbno$FilteredPlatforms) 
    
    .width("container")
    .height(600)
    
    .title({
        text: "bbno$ Platform Metrics",
        fontSize: 42,
        color:"#F3FACE",
        offset: 0 //space between title and chart
    })
    .background("transparent")
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

    .layer(

        //layer 1 pie
        vl.markArc({ outerRadius: 200})
        
        .encode(
                vl.theta().fieldQ("Value").title("Views / Streams"),
                vl.color().fieldN("Metric").scale({range:["#D8EA75","#5BE3C3","#EA7577",]}).legend(null), // Legend removed
                vl.tooltip([
                    {field: "Metric", type: "nominal", title: "Platform"},
                    {field: "Value", type: "quantitative", format: ",.0f", title: "Streams/Views"},
                    {field: "percent_of_total", type: "quantitative", format: ".1%", title: "Percentage"} 
                ])  
            ),

             // layer 2: tiktok
        vl.markText({
            radius: 70,    
            align: 'left', 
            fontSize: 24,
            dy: 250,         
            dx: -360
        })

         .encode(
            vl.theta().fieldQ("Value"),
            vl.text().fieldN("combined_label"),
            vl.color().fieldN("Metric").scale({range:["#D8EA75","#5BE3C3","#EA7577",]})
        )
        .transform([
            vl.filter("datum.Metric === 'TikTok Views'") 
        ]),
        
        // Layer 3: spotify
        vl.markText({
            radius: 180,    
            align: 'left',  
            fontSize: 24,
            dx: 40,  
            dy: 70
        })
        .encode(
            vl.theta().fieldQ("Value"),
            vl.text().fieldN("combined_label"),
            vl.color().fieldN("Metric").scale({range:["#D8EA75","#5BE3C3","#EA7577",]})
        )
        .transform([
            vl.filter("datum.Metric === 'Spotify Streams'") 
        ]),
        
        // layer 4: Yyouytube label
        vl.markText({
            radius: 180,    
            align: 'center', 
            fontSize: 24,
            dx: -420,
            dy: -0 
        })

        .encode(
            vl.theta().fieldQ("Value"),
            vl.text().fieldN("combined_label"),
            vl.color().fieldN("Metric").scale({range:["#D8EA75","#5BE3C3","#EA7577",]})
        )
        .transform([
            vl.filter("datum.Metric === 'YouTube Views'") 
        ])
    )

        
         // Global Properties and Transforms Outside .layer()
    .transform([
        { aggregate: [{ op: "sum", field: "Value", as: "Value" }], groupby: ["Metric"] },
        { window: [{ op: "sum", field: "Value", as: "Total" }], frame: [null, null] },
        { calculate: "datum.Value / datum.Total", as: "percent_of_total" },
        { calculate: "datum.Metric + ' (' + format(datum.percent_of_total, '.1%') + ')'", as: "combined_label" }
    ])


    .data(hozierFilteredPlatforms)    
    .width("container")
    .height(600)
    
    .title({
        text: "Hozier Platform Metrics",
        fontSize: 42,
        color:"#F3FACE",
        offset: 0 //space between title and chart
    })
    .background("transparent")
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
       .layer(

        //layer 1 pie
        vl.markArc({ outerRadius: 200})
        
        .encode(
                vl.theta().fieldQ("Value").title("Views / Streams"),
                vl.color().fieldN("Metric").scale({range:["#D8EA75","#5BE3C3","#EA7577",]}).legend(null), // Legend removed
                vl.tooltip([
                    {field: "Metric", type: "nominal", title: "Platform"},
                    {field: "Value", type: "quantitative", format: ",.0f", title: "Streams/Views"},
                    {field: "percent_of_total", type: "quantitative", format: ".1%", title: "Percentage"} 
                ])  
            ),

             // layer 2: tiktok
        vl.markText({
            radius: 70,    
            align: 'left', 
            fontSize: 24,
            dy: 200,         
            dx: -50
        })

         .encode(
            vl.theta().fieldQ("Value"),
            vl.text().fieldN("combined_label"),
            vl.color().fieldN("Metric").scale({range:["#D8EA75","#5BE3C3","#EA7577",]})
        )
        .transform([
            vl.filter("datum.Metric === 'TikTok Views'") 
        ]),
        
        // Layer 3: spotify
        vl.markText({
            radius: 180,    
            align: 'left',  
            fontSize: 24,
            dx: -113,  
            dy: -230
        })
        .encode(
            vl.theta().fieldQ("Value"),
            vl.text().fieldN("combined_label"),
            vl.color().fieldN("Metric").scale({range:["#D8EA75","#5BE3C3","#EA7577",]})
        )
        .transform([
            vl.filter("datum.Metric === 'Spotify Streams'") 
        ]),
        
        // layer 4: Yyouytube label
        vl.markText({
            radius: 180,    
            align: 'center', 
            fontSize: 24,
            dx: -180,
            dy: -55 
        })

        .encode(
            vl.theta().fieldQ("Value"),
            vl.text().fieldN("combined_label"),
            vl.color().fieldN("Metric").scale({range:["#D8EA75","#5BE3C3","#EA7577",]})
        )
        .transform([
            vl.filter("datum.Metric === 'YouTube Views'") 
        ])
    )

        
         // Global Properties and Transforms Outside .layer()
    .transform([
        { aggregate: [{ op: "sum", field: "Value", as: "Value" }], groupby: ["Metric"] },
        { window: [{ op: "sum", field: "Value", as: "Total" }], frame: [null, null] },
        { calculate: "datum.Value / datum.Total", as: "percent_of_total" },
        { calculate: "datum.Metric + ' (' + format(datum.percent_of_total, '.1%') + ')'", as: "combined_label" }
    ])


    .data(sabrinaFilteredPlatforms)    
    .width("container")
    .height(600)
    
    .title({
        text: ["Sabrina Carpenter", "Platform Metrics"],
        fontSize: 42,
        color:"#F3FACE",
        offset: 0 //space between title and chart
    })
    .background("transparent")
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
