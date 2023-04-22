d3.csv('./datos.csv', d => {
    d.Denuncias = +d.Denuncias;
    return d;
  }).then(lineChart);
  
  function lineChart(data) {
    const margin = { top: 20, right: 20, bottom: 100, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
  
    const svg = d3.select("#svg-barras")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    const x = d3.scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(data.map(function(d) { return d.Parametro; }));
  
    const y = d3.scaleLinear()
      .range([height, 0]);
  
    const line = d3.line()
      .x(function(d) { return x(d.Parametro) + x.bandwidth() / 2; })
      .y(function(d) { return y(d.Denuncias); });
  
    data.sort(function(a, b) {
      return d3.ascending(a.Parametro, b.Parametro);
    });
  
    y.domain([0, d3.max(data, function(d) { return d.Denuncias; })]);
  
    svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", function(d) { return x(d.Parametro) + x.bandwidth() / 2; })
      .attr("cy", function(d) { return y(d.Denuncias); })
      .attr("r", 3);
      
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  
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
