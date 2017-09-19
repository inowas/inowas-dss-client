import React  from 'react';
import ConfiguredRadium from 'ConfiguredRadium';

const styles = {
    container: {
        height: '600px',
        maxWidth: '650px',
        overflow: 'auto',
        overflowX: 'scroll',
        whiteSpace: 'nowrap',
        backgroundColor: 'black',
        color: 'white',
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
