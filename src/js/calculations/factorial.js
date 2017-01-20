export default function factorial(x) {
    let fac = 1;
    while (x > 0) {
        fac *= x;
        x--;
    }
    return fac;
}
