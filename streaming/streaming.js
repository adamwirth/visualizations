function nap () { setTimeout(function() {}, Math.random() * 3); }

/** Store a time then return the datum */
// TODO function* ? other ways to approach
export const pointMaker = async () => {
    const x = new Date().getTime();
    nap();
    return {
        data: {
            x,
            y: Math.random() * 100,
        }
    }
}

export default function chartArgs() {
    const margin = { top: 10, right: 30, bottom: 30, left: 30 },
        width = 960 - margin.left - margin.right,
        height = 440 - margin.top - margin.bottom,
        barWidth = Math.floor(width / 10);

    return { height, width, margin, barWidth };
}
