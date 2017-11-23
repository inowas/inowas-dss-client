import color from 'color';

const styleGlobals = {
    colors: {
        primary: '#1EB1ED',
        accent: '#ED8D05',
        font: '#4C4C4C',
        background: '#FEFEFE',
        backgroundWrapper: '#EFF3F6',

        grayDark: '#404040',
        graySemidark: '#808080',
        graySemilight: '#D0D0D0',
        grayLight: '#F5F5F5',
        redDark: '#D50E00',
    },

    dimensions: {
        appWidth: 1280,
        gridGutter: 20,
        gridColumn: 224,
        navBarHeight: 28,
        spacing: {
            large: 20,
            medium: 10,
            small: 5
        },
        borderRadius: 3
    },

    boxShadow: '0 0 2px ' + color('#404040').fade(0.3)
};

export default styleGlobals;
