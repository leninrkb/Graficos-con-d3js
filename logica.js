// let svgw = 500;
// let svgh = 400;
// let margen = {
//     izq:20, der:20, sup:40, inf:40
// }
// let grafw = svgw - margen.izq - margen.der;
// let grafh = svgh - margen.sup - margen.inf;

// d3.csv('./datos.csv',d=>{
//     d.Denuncias = +d.Denuncias
//     return d;
// }).then(histograma)

// function histograma(datos){
//     console.log(datos);
//     let svg = d3.select('#misvg')
//     .attr('width',svgw)
//     .attr('height',svgh)

//     let dominiox = [0, 200]
//     let escalax = d3.scaleLinear()
//     .domain([0, 100])
//     .range([0, grafw])

//     svg.append('g')
//     .attr('transform',`translate(${margen.izq},${grafh+margen.sup})`)
//     .call(d3.axisBottom(escalax))

//     let contadorFreq = d3.histogram()
//     .value(d => d.Denuncias)
//     .domain(dominiox)

//     let bins = contadorFreq(datos);
//     console.log(bins);

//     let escalay = d3.scaleLinear()
//     .domain([0, d3.max(bins, d=>d.length)])
//     .range([0, grafh])

//     svg.append('g')
//     .attr('transform',`translate(${margen.izq},${margen.sup})`)
//     .selectAll('rect')
//     .data(bins)
//     .enter().append('rect')
//     .attr('x',d=>escalax(d.x1))
//     .attr('y',d=>escalay(d.length))
//     .attr('width',30)
//     .attr('height',d=>grafh-escalay(d.length))
//     .attr('fill','blue')
// }


// const data = [
//     { category: "2018,Trimestre 4,Agresión sexual con penetración", value: 1.7 },
//     { category: "2018,Trimestre 4,Homicidios dolosos y asesinatos consumados", value: 289 },
//     { category: "2018,Trimestre 4,Hurtos", value: 706072 }
//   ];
  

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
