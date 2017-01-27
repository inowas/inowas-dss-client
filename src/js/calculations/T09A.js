
export default class T09A {

    calculateDiagramData = function(h, z, df, ds, xMin, xMax, xSteps) {
        const xRange = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
        const valuesZ = xRange.map( (x) => {
            return (df)/(ds-df)*h*x;
        });

        const valuesH = xRange.map( (x) => {
            return (ds-df)/(df)*z*x;
        });

        let data = [];
        for (let i = 0; i < xRange.length; i++ ){
            data[i] = {
                x: xRange[i],
                h: valuesH[i],
                z: valuesZ[i]
            }
        }

        return data;
    };

    calculateH = function(z, df, ds) {
        return (ds-df)/(df)*z;
    };

    calculateZ = function(h, df, ds) {
        return (df)/(ds-df)*h;
    }
}