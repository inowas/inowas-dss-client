import React from "react";

export default class SoilDiagram extends React.Component {

    renderSoilDiagram(type){

        if (type == 'rp'){
            return (
                <div className="soil-diagram">
                    <div className="soil-depth">0.00m</div>
                    <div className="soil-layer soil-5" style={{
                        flex: 100
                    }}>
                        <span className="layer-badge">Layer 1</span>
                    </div>
                    <div className="soil-depth">-71.90m</div>
                </div>
            )
        }

        return (
            <div className="soil-diagram">
                <div className="soil-depth">0.00m</div>
                <div className="soil-layer soil-1" style={{
                    flex: 10
                }}>
                    <span className="layer-badge">Layer 1</span>
                </div>
                <div className="soil-depth">-0.80m</div>
                <div className="soil-layer soil-2" style={{
                    flex: 10
                }}>
                    <span className="layer-badge">Layer 2</span>
                </div>
                <div className="soil-depth">-4.80m</div>
                <div className="soil-layer soil-3" style={{
                    flex: 30
                }}>
                    <span className="layer-badge">Layer 3</span>
                </div>
                <div className="soil-depth">-16.50m</div>
                <div className="soil-layer soil-4" style={{
                    flex: 25
                }}>
                    <span className="layer-badge">Layer 4</span>
                </div>
                <div className="soil-depth">-50.10m</div>
                <div className="soil-layer soil-5" style={{
                    flex: 25
                }}>
                    <span className="layer-badge">Layer 5</span>
                </div>
                <div className="soil-depth">-91.90m</div>
            </div>
        );
    }

    render() {
        return(
            <div>
                {this.renderSoilDiagram('rp')}
            </div>
        )
    }
}
