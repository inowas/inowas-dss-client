import PropTypes from 'prop-types';

const summation = ({f, lower, upper}) => {
    let result = 0;
    for (let n = lower; n <= upper; n++) {
        result += f(n);
    }
    return result;
};

summation.propTypes = {
    f: PropTypes.func.isRequired,
    lower: PropTypes.number.isRequired,
    upper: PropTypes.number.isRequired
};


export default summation;
