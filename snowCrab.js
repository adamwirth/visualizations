import { require } from 'https://unpkg.com/d3-require@1?module';

export default async function (selector) {

    const d3 = await require('d3@5');

    const data = await d3.csv('./snowCrab.csv');

    const formatBiomass = d3.format(',.0f');

    const margin = { top: 10, right: 30, bottom: 30, left: 30 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        barWidth = Math.floor(width / (data.length * 1.1));

    const minMaxYears = d3.extent(Array.map(data, d => d.Year));
    
    // X
    const x = d3.scaleTime()
        .domain([new Date(minMaxYears[0], 0, 1), new Date(minMaxYears[1], 0, 1)])
        .rangeRound([0, width]);

    // Y
    const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, function(d) { return d.Biomass; })]);

    // Chart
    const svg = d3.select(selector).append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Axis
    svg.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

    // Bars
    const bar = svg.selectAll('.bar')
        .data(data)
        .enter().append('g')
        .attr('class', 'bar')
        .attr('transform', function (d, i) { return `translate(${i * barWidth},0)`; });

    bar.append('rect')
        .attr('y', function(d) { return y(d.Biomass); })
        .attr('width', barWidth - 1)
        .attr('height', function (d) { return height - y(d.Biomass); });

    bar.append('text')
        .attr('dy', '.75em')
        .attr('x', barWidth / 2)
        .attr('y', 8)
        .text(function (d) { return formatBiomass(d.Biomass); });

    return bar;
}
