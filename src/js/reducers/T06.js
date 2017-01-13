function getInitialState() {
    return {
        conditions: [{
            name: 'Ephemeral Rivers',
            category: 'Source of water',
            selected: true,
            applicable_methods: ['Ponds', 'Flooding', 'Ditches', 'SS Dam', 'RD', 'Sand dam']
        }, {
            name: 'Perennial Rivers',
            category: 'Source of water',
            selected: false,
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
            name: 'High (> 0.1 m/d)',
            category: 'Soil infiltration capacity',
            selected: true,
            applicable_methods: ['Ponds', 'Flooding', 'Ditches', 'SAT', 'EI', 'IBF', 'IDF', 'SS Dam', 'RD', 'Bund', 'Trenches', 'Rooftop']
        }, {
            name: 'Low (<0.1 m/d)',
            category: 'Soil infiltration capacity',
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
            name: 'Infiltration Ponds',
            highCost: false,
            highLandNeed: true
        }, {
            slug: 'Flooding',
            name: 'Flooding',
            highCost: false,
            highLandNeed: true
        }, {
            slug: 'Ditches',
            name: 'Ditches and Furrows ',
            highCost: false,
            highLandNeed: true
        }, {
            slug: 'SAT',
            name: 'Soil Aquifer Treatment',
            highCost: true,
            highLandNeed: true
        }, {
            slug: 'EI',
            name: ' Excess Irrigation',
            highCost: false,
            highLandNeed: false
        }, {
            slug: 'IBF',
            name: 'River/lake bank filtration',
            highCost: false,
            highLandNeed: false
        }, {
            slug: 'IDF',
            name: 'Dune filtration',
            highCost: false,
            highLandNeed: true
        }, {
            slug: 'ASR',
            name: 'ASR',
            highCost: true,
            highLandNeed: false
        }, {
            slug: 'ASTR',
            name: 'ASTR',
            highCost: true,
            highLandNeed: false
        }, {
            slug: 'W-S-B',
            name: 'Shallow well/ shaft/ pit infiltration ',
            highCost: true,
            highLandNeed: false
        }, {
            slug: 'SS Dam',
            name: 'Sub-surface dams',
            highCost: true,
            highLandNeed: false
        }, {
            slug: 'RD',
            name: 'Recharge Dams',
            highCost: false,
            highLandNeed: false
        }, {
            slug: 'Sand dam',
            name: 'Sand dams',
            highCost: false,
            highLandNeed: false
        }, {
            slug: 'Bund',
            name: 'Barrier & Bunds',
            highCost: false,
            highLandNeed: true
        }, {
            slug: 'Trenches',
            name: 'Trenches',
            highCost: false,
            highLandNeed: true
        }, {
            slug: 'Rooftop',
            name: 'Rooftop harvesting',
            highCost: false,
            highLandNeed: false
        }]
    };
}
const T09CReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case 'CHANGE_TOOL_T06_CONDITION':
            {
                const changeCondition = action.payload;
                state = { ...state
                };
                state.conditions.find((c) => {
                    return (c.name == changeCondition.name)
                })
                .selected = changeCondition.selected;
                break;
            }
    }
    return state;
};
export default T09CReducer;
