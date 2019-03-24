function nap () { setTimeout(function() {}, Math.random() * 3); }

/** Store a time then return the datum */
// TODO function* ? other ways to approach
export const pointMaker = async function pM() {
    const v = await new Promise((resolve, reject) => {
        const x = new Date().getTime();
        const y = Math.random() * 16;
        nap();
        return resolve({ x, y });
    });
    return v;
}

export default function chartArgs() {
    const margin = { top: 10, right: 30, bottom: 30, left: 30 },
        width = 960 - margin.left - margin.right,
        height = 440 - margin.top - margin.bottom,
        barWidth = Math.floor(width / 10);

    return { height, width, margin, barWidth };
}
