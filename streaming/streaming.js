import { require } from 'https://unpkg.com/d3-require@1?module';


function nap () { return setTimeout(function() {}, Math.random() * 3) && true }

/** Store a time then return the datum */
// TODO function* ? other ways to approach
const pointMaker = async () => {
    const x = new Date().getTime();
    nap();
    return {
        data: {
            x,
            y: Math.random() * 100,
        }
    }
}

export default async function chart(selector='body') {

    const d3 = await require('d3@5');

    const margin = { top: 10, right: 30, bottom: 30, left: 30 },
        width = 960 - margin.left - margin.right,
        height = 440 - margin.top - margin.bottom,
        barWidth = Math.floor(width / 10);
    
    // X
    const x = d3.scaleTime()
        .domain([Date.now() - 100000, Date.now() + 1000000])
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

    const points = []
    for (let i = 0; i < 5; i += 1) {
        points.push(pointMaker());
    }
    
    // Bars
    const bar = svg.selectAll('.bar')
        .data(points, async function(key, i, j) { 
            console.log(key)
            const thing = await key;
            return thing.y;
        })
        .enter(points, async function(d) {
            console.log('enter', d);
            return await d;
         })
        .append('g')
        .attr('class', 'bar')
        .attr('transform', function (d, i) { return `translate(${i * barWidth},0)`; });

    bar.append('rect')
        .attr('y', async function(d) { return y(await d.y); })
        .attr('width', barWidth - 1)
        .attr('height', async function (d) { return height - y(await d.y); });

    bar.append('text')
        .attr('x', barWidth / 2)
        .attr('dy', '.75')
        .attr('y', 8)
        .text(async function (d) { return await d.y; });

}
