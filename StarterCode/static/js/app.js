const url="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
const datapromise = d3.json(url) 

function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
  
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  // Initialize the dashboard
  init();
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildMetadata(newSample);
    buildCharts(newSample);
   
  }
  
  // Demographics Panel
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
     
      // Use d3 to select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
    });
  }
  
  // Deliverable 1: 1. Create the buildChart function.
  function buildCharts(sample) { 

    // Deliverable 1: 2. Use d3.json to load the samples.json file
    d3.json("samples.json").then((data) => {
        let samples = data.samples;
        let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        let result = resultArray[0];
        
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values_array = result.sample_values;
        let washing_data = result.wfreq;

        //let samples_array = data.map(function(samplevalue){
        //    return samplevalue.samples

        //})
        console.log(result);
        console.log(washing_data)

        console.log(sample_values_array);
        //let bar_data = [otu_ids,sample_values_array]
        //console.log(bar_data)
      

        //let otu_ids_values_sorted = result.sort((a, b) => b.sample_values - a.sample_values);
        let sample_values_sorted = sample_values_array.sort(function decendingsort(a,b){
            return b-a;
        });
        let otu_ids_values_sorted_sliced = sample_values_sorted.slice(0, 10);
        let otu_ids_holder = [];
        let otu_ids_holder_large = [];
        for (let i = 1; i < 11; i++) {
            //row = row+1
            otu_ids_holder.push(`OTU ${i}`);
    
            // Store the position  at index `i` for evaluation
        }
        let trace1 = {
            x: otu_ids_values_sorted_sliced,
            y: otu_ids_holder,
            type: "bar",
            hovertext: otu_ids_holder,
            orientation: 'h'
          };
        let chartdata = [trace1];

        Plotly.newPlot("plot", chartdata);
        for (let i = 1; i < 101; i++) {
            otu_ids_holder_large.push(`OTU ${i}`);
        
        let num = 0
        let size = []
        for (let i = 1; i < 101; i++) {
            num = num+3
            size.push(num);
    
        };
        console.log(size);  
        var trace2 = {
          x: sample_values_sorted,
          y: otu_ids_holder_large,
          mode: 'markers',
          marker: {
            size: size
          }
        };
        
        var bubbledata = [trace2];
        
        var layout = {
          title: 'Marker Size',
          showlegend: false,
          height: 600,
          width: 600
        };
        
        Plotly.newPlot('myDiv', bubbledata, layout);
        var gaugedata = [
          {
            domain: { x: [0, 1], y: [0, 1] },
            value: washing_data,
            title: { text: "Washing Frequency" },
            type: "indicator",
            mode: "gauge+number"
          }
        ];
        
        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('mygaugeDiv', gaugedata, layout);
        //let trace2 = {
            //x: sample_values_sorted,
            //y: otu_ids_holder_large,
            //mode: 'markers',
            //marker: {
              //size: data[0].size,
              //color: data[0].color,
              //opacity: 0.7
            //},
            //type: "scatter",
            //hovertext: otu_ids_holder_large,
            //orientation: 'h'
          //};

      // Deliverable 1: 3. Create a variable that holds the samples array.
  
      // Deliverable 1: 4. Create a variable that filters the samples for the object with the desired sample number.
  
      // Deliverable 3: 1. Create a variable that filters the metadata array for the object with the desired sample number.
  
      // Deliverable 1: 5. Create a variable that holds the first sample in the array.
  
      // Deliverable 3: 2. Create a variable that holds the first sample in the metadata array.
  
      // Deliverable 1: 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
  
      // Deliverable 3: 3. Create a variable that holds the washing frequency.
  
  
      // Deliverable 1: 7. Create the yticks for the bar chart.
      // Hint: Get the the top 10 otu_ids and map them in descending order
      // so the otu_ids with the most bacteria are last.
      //var yticks =
  
      // Deliverable 1: 8. Create the trace for the bar chart.
      //var barData = [
  
      //];
  
      // Deliverable 1: 9. Create the layout for the bar chart.
      //var barLayout = {
  
      //};
  
      // Deliverable 1: 10. Use Plotly to plot the data with the layout.
  
      // Deliverable 2: 1. Create the trace for the bubble chart.
  
      // Deliverable 2: 2. Create the layout for the bubble chart.
  
      // Deliverable 2: 3. Use Plotly to plot the data with the layout.
     
      // Deliverable 3: 4. Create the trace for the gauge chart.
     
      // Deliverable 3: 5. Create the layout for the gauge chart.
  
      // Deliverable 3: 6. Use Plotly to plot the gauge data and layout.
  
    });
  }