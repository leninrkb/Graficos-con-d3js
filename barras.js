d3.csv('./datos.csv',d=>{
    d.Denuncias = +d.Denuncias
    return d;
}).then(histograma2)

function histograma2(data){
  const margin = { top: 20, right: 20, bottom: 100, left: 40 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  
  const svg = d3.select("#misvg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  const x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
  
  const y = d3.scaleLinear()
    .range([height, 0]);
  
  x.domain(data.map(function(d) { return d.Parametro; }));
  y.domain([0, d3.max(data, function(d) { return d.Denuncias; })]);
  
  svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.Parametro); })
    .attr("width", x.bandwidth())
    .attr("y", function(d) { return y(d.Denuncias); })
    .attr("height", function(d) { return height - y(d.Denuncias); });
  
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -10)
    .attr("y", 0)
    .attr("dy", ".35em")
    .style("text-anchor", "end");
  
  svg.append("g")
    .call(d3.axisLeft(y));
}
