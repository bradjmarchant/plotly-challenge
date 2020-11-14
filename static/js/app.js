d3.json("samples.json").then(function(data) {
    // console.log(data);
    var select = d3.select("#selDataset")
    data.names.forEach (function (name) {
        // console.log(name);

       select.append("option").text(name);
  
      })
  dashbaord(data.names[0])
  });
  

function optionChanged(id) {
  console.log(id);  
  dashbaord(id)
  };



function dashbaord(newName){
  d3.json("samples.json").then(function(data){
    var Filter_Name = data.samples.filter(d => d.id == newName)[0]
    
    var Filter_Table = data.metadata.filter(x => x.id == newName)[0]
    
    

    var panel=d3.select("#sample-metadata")
 
    panel.html("")
    Object.entries(Filter_Table).forEach(([key,value]) => {
      panel.append("h5").text(`${key}; ${value}`)
    });

    var sample_values = Filter_Name.sample_values
    var otu_ids = Filter_Name.otu_ids
    var otu_labels = Filter_Name.otu_labels
    console.log(sample_values)
    var sample_10 = sample_values.slice(0, 10).reverse();
    var trace1 = {
      x: sample_10,
      y: otu_ids.slice(0, 10).map(d=>`OTU ${d}`).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      name: "Greek",
      type: "bar",
      orientation: "h"
    };
    

    // data
    var data = [trace1];
    
    // Apply the group bar mode to the layout
    var layout = {
      title: "Greek gods search results",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };
    
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", data, layout);
    
    // bubble chart
    var trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        colorscale: "Earth",
        size: sample_values
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'Marker Size and Color',
      showlegend: false,
      height: 600,
      width: 600
    };
    
    Plotly.newPlot('bubble', data, layout);
    
    
  
    

  // info table

  })
   


}


