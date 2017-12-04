import React from 'react';

const Info = () => {
    // Calculate z and zCrit here
    const z = 1;
    const zCrit = 2;
    const q = 100;

    if (Number(z) > Number(zCrit)) {
        return (
            <div className="padding-30">
                <h2>
                    Warning
                    <i className="glyphicon glyphicon-warning-sign pull-right"/>
                </h2>

                <div className="center-vertical center-horizontal">
                    <p>
                        The calculated upconing level of <strong>{z}m </strong>
                        is higher than the critical elevation of <strong>{zCrit}m</strong>.
                        At the current pumping rate, saltwater might enter the well.
                        We recommend a maximum pumping rate of <strong>{q}m<sup>3</sup>/d</strong>.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="padding-30">
            <h2>
                OK
                <i className="glyphicon glyphicon-ok-circle pull-right"/>
            </h2>

            <div className="center-vertical center-horizontal">
                <p>
                    The calculated upconing level of <strong>{z} m </strong>
                    is lower than the critical elevation of <strong>{zCrit} m </strong>
                    so saltwater shouldn't enter the well. However, we recommend a maximum
                    pumping rate of <strong>{q} m<sup>3</sup>/d</strong>.
                </p>
            </div>
        </div>
    );
};

export default Info;
