import PropTypes from 'prop-types';

const GP = [
    -0.949107912342759,
    -0.741531185599394,
    -0.405845151377397,
    0.0, 0.405845151377397,
    0.741531185599394,
    0.949107912342759
];

const WT = [
    0.129484966168870,
    0.279705391489277,
    0.381830050505119,
    0.417959183673469,
    0.381830050505119,
    0.279705391489277,
    0.129484966168870
];


const integrate = (f, lower, upper, stepSize) => {
    let result = 0;
    for (let x = lower; x < upper; x += stepSize) {
        result += f(x + (1 / 2 * stepSize));
    }
    return result;
};

integrate.propTypes = {
    f: PropTypes.func.isRequired,
    lower: PropTypes.number.isRequired,
    upper: PropTypes.number.isRequired,
    stepSize: PropTypes.number.isRequired,
};


export default integrate;
