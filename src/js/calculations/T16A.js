export function calculatek(CH, T, d10) {
        return CH * d10 * d10 * (0.7 + 0.33 * T);
}

export function total(sieves) {
    this.props.info.total = this.props.info.total + sieves.value
}

export function calculateDiagramData(sieves, total) {
    var tot = 0;
    function calcPercentage(val) {
        tot = tot + val;
        return 100-tot*100/total
    }

    let data = [];
    sieves.map(param => {
        data.push({
            D: Number(param.id),
            Percentage: calcPercentage(param.value)
        });
    });
    return data;
}

export function calculated10(data) {
    for (let i = 0; i < data.length; i += 1) {
        if (data[i].Percentage <= 10 && data[i-1].Percentage >= 10){
            console.log(i);
            // return data[i-1].D+((data[i].D - data[i-1].D) (10-data[i-1].Percentage) /(data[i].Percentage - data[i-1].Percentage));
            return data[i-1].D+((data[i].D - data[i-1].D)*(10-data[i-1].Percentage) /(data[i].Percentage - data[i-1].Percentage));
        }
    }
}