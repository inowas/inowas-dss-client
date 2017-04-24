// see http://montessorimuddle.org/2013/04/20/programming-numerical-integration-with-python/
export default function numericallyIntegrate( a, b, dx, f ) {
    // define the variable for area
    let Area = 0;
    // loop to calculate the area of each trapezoid and sum.
    for ( let x1 = a + dx; x1 <= b; x1 += dx ) {
        // the x locations of the left and right side of each trapezpoid
        const x0 = x1 - dx;
        // the area of each trapezoid
        const Ai = dx * ( f( x0 ) + f( x1 ) ) / 2.0;
        // cumulatively sum the areas
        Area += Ai;
    }
    return Area;
}
