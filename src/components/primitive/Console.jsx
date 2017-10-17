import React  from 'react';
import ConfiguredRadium from 'ConfiguredRadium';

const styles = {
    container: {
        height: 600,
        maxWidth: 650,
        overflow: 'auto',
        overflowX: 'scroll',
        whiteSpace: 'nowrap',
        backgroundColor: 'black',
        color: 'white',
        paddingTop: 5,
        paddingLeft: 15
    },
};

const console = ({children}) => {
    return (
        <div style={[styles.container]}>
            <pre>
            {children}
            </pre>
        </div>
    );
};

export default ConfiguredRadium(console);
