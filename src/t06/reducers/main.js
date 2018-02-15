import infiltrationPond from '../images/Infiltration_pond.png';
import ASTR from '../images/ASTR.png';
import ASR from '../images/ASR.png';
import IDF from '../images/Dune filtration.png';
import SAT from '../images/Soil Aquifer treatment.png';
import Rooftop from '../images/Rainwater harvesting.png';
import IBF from '../images/Bank filtration.png';
import RD from '../images/Recharge release.png';
import SSDam from '../images/Underground dam.png';
import Ponds from '../images/Percolation pond.png';
import Sanddam from '../images/Sand dam.png';
import Bounds from '../images/Bounds.png';
import EI from '../images/Excess_irrigation.png';
import Ditches from '../images/Ditches.png';
import Trenches from '../images/Trenches.png';
import WSB from '../images/WSB.png';
import Flooding from '../images/Flooding.png';
import {find} from 'lodash';

export const getInitialState = () => {
    return {
        conditions: [{
            name: 'Ephemeral Rivers',
            category: 'Source of water',
            selected: true,
            applicable_methods: ['Ponds', 'Flooding', 'Ditches', 'SS Dam', 'RD', 'Sand dam']
        }, {
            name: 'Perennial Rivers',
            category: 'Source of water',
            selected: true,
            applicable_methods: ['Ponds', 'Flooding', 'Ditches', 'EI', 'IBF', 'ASR', 'ASTR', 'W-S-B', 'SS Dam', 'RD', 'Sand dam']
        }, {
            name: 'Storage Dams/ Reservoir',
            category: 'Source of water',
            selected: false,
            applicable_methods: ['Ponds', 'Flooding', 'Ditches', 'EI', 'ASR', 'ASTR', 'W-S-B']
        }, {
            name: 'Floods/ Runoff/ Rain water',
            category: 'Source of water',
            selected: false,
            applicable_methods: ['Ponds', 'Ditches', 'IDF', 'ASR', 'ASTR', 'W-S-B', 'SS Dam', 'RD', 'Sand dam', 'Bund', 'Trenches', 'Rooftop']
        }, {
            name: 'Urban Storm Water',
            category: 'Source of water',
            selected: false,
            applicable_methods: ['Ponds', 'Ditches', 'IDF', 'ASR', 'ASTR', 'W-S-B', 'SS Dam', 'RD', 'Sand dam', 'Bund', 'Trenches', 'Rooftop']
        }, {
            name: 'Ground Water',
            category: 'Source of water',
            selected: false,
            applicable_methods: ['Ponds', 'Ditches', 'EI', 'ASR', 'ASTR', 'W-S-B', 'SS Dam']
        }, {
            name: 'Treated Waste Water (Industrial/ Domestic/ Desalination)',
            category: 'Source of water',
            selected: false,
            applicable_methods: ['Ponds', 'Flooding', 'SAT', 'EI', 'IDF', 'ASR', 'ASTR', 'W-S-B']
        }, {
            name: 'Sandy loams, silt loams',
            category: 'Soil type',
            selected: true,
            applicable_methods: ['Ponds', 'Flooding', 'Ditches', 'SAT', 'EI', 'IBF', 'IDF', 'SS Dam', 'RD', 'Bund', 'Trenches', 'Rooftop']
        }, {
            name: 'Deep sands, well aggregated soils',
            category: 'Soil type',
            selected: true,
            applicable_methods: ['Ponds', 'Flooding', 'Ditches', 'SAT', 'EI', 'IBF', 'IDF', 'SS Dam', 'RD', 'Bund', 'Trenches', 'Rooftop']
        }, {
            name: 'Highly clayey soils',
            category: 'Soil type',
            selected: false,
            applicable_methods: ['ASR', 'ASTR', 'W-S-B', 'Sand dam']
        }, {
            name: 'Shallow soils, clay soils, soils low in organic matter',
            category: 'Soil type',
            selected: false,
            applicable_methods: ['ASR', 'ASTR', 'W-S-B', 'Sand dam']
        }, {
            name: 'Residential',
            category: 'Land Use',
            selected: false,
            applicable_methods: ['IBF', 'ASR', 'ASTR', 'W-S-B', 'Rooftop']
        }, {
            name: 'Industrial',
            category: 'Land Use',
            selected: false,
            applicable_methods: ['IBF', 'ASR', 'ASTR', 'W-S-B', 'Rooftop']
        }, {
            name: 'Recreational Lands/ Parks',
            category: 'Land Use',
            selected: false,
            applicable_methods: ['Ponds', 'Ditches', 'SAT', 'EI', 'IBF', 'IDF', 'ASR', 'ASTR', 'W-S-B', 'Bund', 'Trenches']
        }, {
            name: 'Agricultural Land',
            category: 'Land Use',
            selected: false,
            applicable_methods: ['Ponds', 'Flooding', 'Ditches', 'SAT', 'EI', 'IBF', 'ASR', 'ASTR', 'W-S-B', 'Bund', 'Trenches']
        }, {
            name: 'Streambed',
            category: 'Land Use',
            selected: false,
            applicable_methods: ['SS Dam', 'RD', 'Sand dam']
        }, {
            name: 'Barren Lands/ Range Land',
            category: 'Land Use',
            selected: false,
            applicable_methods: ['Ponds', 'Flooding', 'Ditches', 'SAT', 'EI', 'IBF', 'IDF', 'ASR', 'ASTR', 'W-S-B', 'Bund', 'Trenches']
        }, {
            name: 'Max Natural Storage Capacity',
            category: 'Purpose',
            selected: false,
            applicable_methods: ['Ponds', 'Flooding', 'Ditches', 'SAT', 'EI', 'ASR', 'ASTR', 'W-S-B', 'SS Dam', 'RD', 'Sand dam', 'Bund', 'Trenches', 'Rooftop']
        }, {
            name: 'Prevent Salt Water Intruesion',
            category: 'Purpose',
            selected: false,
            applicable_methods: ['Ponds', 'Ditches', 'EI', 'ASR', 'W-S-B', 'SS Dam']
        }, {
            name: 'Restoration of Ground Water',
            category: 'Purpose',
            selected: false,
            applicable_methods: ['Ponds', 'Flooding', 'Ditches', 'SAT', 'EI', 'ASR', 'W-S-B', 'SS Dam', 'Bund', 'Trenches']
        }, {
            name: 'Water Quality Improvement',
            category: 'Purpose',
            selected: false,
            applicable_methods: ['Ponds', 'Flooding', 'SAT', 'EI', 'IBF', 'IDF', 'ASR', 'ASTR', 'W-S-B', 'Bund', 'Trenches', 'Rooftop']
        }, {
            name: 'Agricultural Uses/ Irrigation',
            category: 'Purpose',
            selected: false,
            applicable_methods: ['Ponds', 'Flooding', 'Ditches', 'SAT', 'EI', 'IBF', 'IDF', 'ASR', 'ASTR', 'W-S-B', 'SS Dam', 'RD', 'Sand dam', 'Bund', 'Trenches', 'Rooftop']
        }, {
            name: 'Domestic',
            category: 'Purpose',
            selected: false,
            applicable_methods: ['Ponds', 'Flooding', 'Ditches', 'SAT', 'EI', 'IBF', 'ASR', 'ASTR', 'W-S-B', 'SS Dam', 'RD', 'Sand dam', 'Bund', 'Trenches', 'Rooftop']
        }, {
            name: 'Ecological Benefit',
            category: 'Purpose',
            selected: false,
            applicable_methods: ['Flooding', 'Ditches', 'IDF', 'EI', 'ASR', 'W-S-B', 'Bund', 'Trenches', 'Rooftop']
        }, {
            name: 'Small (Household)',
            category: 'Typical Scale',
            selected: false,
            applicable_methods: ['EI', 'Sand dam', 'Bund', 'Trenches', 'Rooftop']
        }, {
            name: 'Medium (Village)',
            category: 'Typical Scale',
            selected: true,
            applicable_methods: ['Ponds', 'Flooding', 'Ditches', 'SAT', 'EI', 'IBF', 'IDF', 'ASR', 'ASTR', 'W-S-B', 'SS Dam', 'RD', 'Sand dam', 'Bund', 'Trenches', 'Rooftop']
        }, {
            name: 'Large (Town)',
            category: 'Typical Scale',
            selected: false,
            applicable_methods: ['Ponds', 'SAT', 'IBF', 'IDF', 'ASR', 'ASTR', 'SS Dam', 'RD']
        }],
        methods: [{
            slug: 'Ponds',
            name: 'infiltrationPond',
            highCost: false,
            highLandNeed: true,
            image: infiltrationPond,
            href: 'https://wiki.inowas.hydro.tu-dresden.de/'
        }, {
            slug: 'Flooding',
            name: 'Flooding',
            highCost: false,
            highLandNeed: true,
            image: Flooding,
            href: 'https://wiki.inowas.hydro.tu-dresden.de/'
        }, {
            slug: 'Ditches',
            name: 'Ditches and Furrows ',
            highCost: false,
            highLandNeed: true,
            image: Ditches,
            href: 'https://wiki.inowas.hydro.tu-dresden.de/'
        }, {
            slug: 'SAT',
            name: 'Soil Aquifer Treatment',
            highCost: true,
            highLandNeed: true,
            image: SAT,
            href: 'https://wiki.inowas.hydro.tu-dresden.de/'
        }, {
            slug: 'EI',
            name: ' Excess Irrigation',
            highCost: false,
            highLandNeed: false,
            image: EI,
            href: 'https://wiki.inowas.hydro.tu-dresden.de/'
        }, {
            slug: 'IBF',
            name: 'River/lake bank filtration',
            highCost: false,
            highLandNeed: false,
            image: IBF,
            href: 'https://wiki.inowas.hydro.tu-dresden.de/'
        }, {
            slug: 'IDF',
            name: 'Dune filtration',
            highCost: false,
            highLandNeed: true,
            image: IDF,
            href: 'https://wiki.inowas.hydro.tu-dresden.de/'
        }, {
            slug: 'ASR',
            name: 'ASR',
            highCost: true,
            highLandNeed: false,
            image: ASR,
            href: 'https://wiki.inowas.hydro.tu-dresden.de/'
        }, {
            slug: 'ASTR',
            name: 'ASTR',
            highCost: true,
            highLandNeed: false,
            image: ASTR,
            href: 'https://wiki.inowas.hydro.tu-dresden.de/'
        }, {
            slug: 'W-S-B',
            name: 'Shallow well/ shaft/ pit infiltration ',
            highCost: true,
            highLandNeed: false,
            image: WSB,
            href: 'https://wiki.inowas.hydro.tu-dresden.de/'
        }, {
            slug: 'SS Dam',
            name: 'Sub-surface dams',
            highCost: true,
            highLandNeed: false,
            image: SSDam,
            href: 'https://wiki.inowas.hydro.tu-dresden.de/'
        }, {
            slug: 'RD',
            name: 'Recharge Dams',
            highCost: false,
            highLandNeed: false,
            image: RD,
            href: 'https://wiki.inowas.hydro.tu-dresden.de/'
        }, {
            slug: 'Sand dam',
            name: 'Sand dams',
            highCost: false,
            highLandNeed: false,
            image: Sanddam,
            href: 'https://wiki.inowas.hydro.tu-dresden.de/'
        }, {
            slug: 'Bund',
            name: 'Barrier & Bunds',
            highCost: false,
            highLandNeed: true,
            image: Bounds,
            href: 'https://wiki.inowas.hydro.tu-dresden.de/'
        }, {
            slug: 'Trenches',
            name: 'Trenches',
            highCost: false,
            highLandNeed: true,
            image: Trenches,
            href: 'https://wiki.inowas.hydro.tu-dresden.de/'
        }, {
            slug: 'Rooftop',
            name: 'Rooftop harvesting',
            highCost: false,
            highLandNeed: false,
            image: Rooftop,
            href: 'https://wiki.inowas.hydro.tu-dresden.de/'
        }]
    };
};

const createReducer = tool => {
    return (state = getInitialState(), action) => {
        if (action.tool !== tool) {
            return state;
        }

        return state;
    };
};

export default createReducer;
