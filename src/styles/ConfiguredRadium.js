import { Plugins } from 'inline-style-linter';
import Radium from 'radium';
import lintStyles from 'radium-plugin-linter';
// import prefixAll from 'radium-plugin-prefix-all';
import validityPseudosPlugin from 'radium-plugin-validity-pseudos';

function ConfiguredRadium( component ) {
    return Radium( {
        plugins: [
            Radium.Plugins.mergeStyleArray,
            Radium.Plugins.checkProps,
            Radium.Plugins.resolveMediaQueries,
            Radium.Plugins.resolveInteractionStyles,
            lintStyles,
            validityPseudosPlugin,
            Radium.Plugins.prefix,
            // prefixAll,
            Radium.Plugins.checkProps
        ],
        linter: {
            plugins: [
                Plugins.preferNumber,
                Plugins.shorthandLonghand,
                Plugins.noInitialValue
            ]
        }
    } )( component );
}

export default ConfiguredRadium;
