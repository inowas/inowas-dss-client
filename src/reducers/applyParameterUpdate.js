export default function applyParameterUpdate(param, newParam) {
    param = validateAndSetNewProperty(param, newParam, 'min', 'validMin');
    param = validateAndSetNewProperty(param, newParam, 'max', 'validMax');

    // make sure min <= max
    if (param.hasOwnProperty('min') && newParam.hasOwnProperty('max') && param.max < param.min) {
        param.max = param.min;
    }

    //make sure min <= value <= max
    if (param.hasOwnProperty('value') && newParam.hasOwnProperty('value')) {
        let newValue = Number(newParam.value);

        let valid = true;

        if (param.hasOwnProperty('min') && newValue < param.min) {
            valid = false;
        }

        if (param.hasOwnProperty('max') && newValue > param.max) {
            valid = false;
        }
        // this part is not required anymore.
        // Out of range part is included /components/tools/parameters.jsx
        // if (valid) {
        //     param.value = newValue;
        // }
        param.value = newValue;
    }
    return param;
}

function validateAndSetNewProperty(param, newParam, property, validator) {
    // check if both parameters have this property
    if(param.hasOwnProperty(property) && newParam.hasOwnProperty(property)) {
        let newValue = Number(newParam[property]);
        //check if parameter has a validator for this property
        if(param.hasOwnProperty(validator)) {
            //use validator
            if(param[validator](newValue)) {
                //valid
                param[property] = newValue;
            } // not valid
        } else {
            // no validator
            param[property] = newValue;
        }
    }
    return param;
}
