import React from 'react';
import {Image} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {createGridData, min, max, rainbowFactory} from '../helpers';
import ColorLegend from '../../../t07/components/ColorLegend';

const styles = {
    canvas: {
        width: '100%',
        height: '100%'
    }
};

class RasterDataImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: createGridData(props.data, props.gridSize.n_x, props.gridSize.n_y),
            width: props.gridSize.n_x,
            height: props.gridSize.n_y,
            rainbowVis: rainbowFactory({
                min: min(props.data),
                max: max(props.data),
            })
        };
    }

    componentDidMount() {
        this.drawCanvas();
    }

    drawCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.state.width, this.state.height);
        this.state.data.forEach(d => {
            ctx.fillStyle = '#' + this.state.rainbowVis.colourAt(d.value);
            ctx.fillRect(d.x, d.y, 1, 1);
        });
    }

    drawLegend() {
        const { rainbowVis, data } = this.state;

        if (!rainbowVis || !data) {
            return null;
        }

        // slice() to make an immutable copy
        const gradients = rainbowVis
            .getGradients()
            .slice()
            .reverse();
        const lastGradient = gradients[gradients.length - 1];
        const legend = gradients.map(gradient => ({
            color: '#' + gradient.getEndColour(),
            value: Number(gradient.getMaxNum()).toFixed(2)
        }));

        legend.push({
            color: '#' + lastGradient.getStartColour(),
            value: Number(lastGradient.getMinNum()).toFixed(2)
        });

        return <ColorLegend legend={legend} orientation={'horizontal'}/>;
    }

    render() {
        return (
            <div>
                <Image fluid>
                    <canvas style={styles.canvas} ref="canvas" width={this.state.width} height={this.state.height}
                            data-paper-resize/>

                </Image>
                {this.drawLegend()}
            </div>
        );
    }
}

RasterDataImage.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.number]).isRequired,
    gridSize: PropTypes.object.isRequired,
};

export default RasterDataImage;
