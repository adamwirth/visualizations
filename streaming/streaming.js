import { require } from 'https://unpkg.com/d3-require@1?module';


function nap () { return setTimeout(function() {}, Math.random() * 3) && true }

/** Store a time then return the datum */
const pointMaker = async () => {
    const x = new Date().getTime()
    nap()
    return {
        data: {
            x,
            y: Math.random() * 100
        }
    }
}

export default async function chart(selector='body') {

    const d3 = await require('d3@5');

    const margin = { top: 10, right: 30, bottom: 30, left: 30 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        barWidth = Math.floor(width / 10);
    
    // X
    const x = d3.scaleTime()
        //.domain([new Date(2019, 0, 1), new Date(2019, 0, 1)]) TODO ???
        .rangeRound([0, width]);

    // Y
    const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 100]);

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
        .data([])
            .enter().append('g')
        .attr('class', 'bar')
        .attr('transform', function (d, i) { return `translate(${i * barWidth},0)`; });

    bar.append('rect')
        .attr('y', function(d) { return y(d.y); })
        .attr('width', barWidth - 1)
        .attr('height', function (d) { return height - y(d.y); });

    bar.append('text')
        .attr('x', barWidth / 2)
        .attr('dy', '.75rem')
        .attr('y', 8)
        .text(function (d) { return d.y; });

    for (let i = 0; i < 3; i += 1) {
        const point = pointMaker()
        console.log(point);
        bar.insert(point);
        nap();
    }
}
