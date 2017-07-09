// as per Wolfram eq. no 15. Maclaurin series
export default function inverf(x) {
    const sqpi = Math.sqrt(Math.PI),
        a1 = 1/2,
        a2 = 1*Math.PI/24,
        a3 = 7*Math.PI**2/960,
        a4 = 127*Math.PI**3/80640;
    return sqpi*(a1*x+a2*x**3+a3*x**5+a4*x**7)
}