export const optimization = {
    'id': '085b3c98-b60b-400c-9528-fd9ea4c8b75f',
    'input': {
        'id': '085b3c98-b60b-400c-9528-fd9ea4c8b75f',
        'parameters': {
            'method': 'ga',
            'ngen': 100,
            'pop_size': 53,
            'mutpb': 1,
            'cxpb': 1,
            'eta': 20,
            'indpb': 0.1,
            'ncls': 1,
            'maxf': 42,
            'qbound': 0.25,
            'xtol': 0.0001,
            'ftol': 0.0001,
            'diversity_flg': true
        },
        'constraints': [{
            'id': '1e334123-b97f-4553-93a3-081ff7cea5d1',
            'name': 'Constraint 1',
            'type': 'flux',
            'conc_file_name': 'MT3D001.UCN',
            'summary_method': 'max',
            'value': 20,
            'operator': 'less',
            'location': {
                'type': 'bbox',
                'ts': {'min': 0, 'max': 0},
                'lay': {'min': 0, 'max': 0},
                'row': {'min': 8, 'max': 24},
                'col': {'min': 12, 'max': 30},
                'objects': []
            },
            'location_1': {
                'type': 'bbox',
                'ts': {'min': 0, 'max': 0},
                'lay': {'min': 0, 'max': 0},
                'row': {'min': 0, 'max': 0},
                'col': {'min': 0, 'max': 0},
                'objects': []
            },
            'location_2': {
                'type': 'bbox',
                'ts': {'min': 0, 'max': 0},
                'lay': {'min': 0, 'max': 0},
                'row': {'min': 0, 'max': 0},
                'col': {'min': 0, 'max': 0},
                'objects': []
            }
        }],
        'objectives': [{
            'id': '46fa1bb5-7553-4151-89ae-b10101eb4eed',
            'name': 'Min Well Distance 1',
            'type': 'distance',
            'conc_file_name': 'MT3D001.UCN',
            'summary_method': 'min',
            'weight': -1,
            'penalty_value': 999,
            'location': {
                'type': 'bbox',
                'ts': {'min': 0, 'max': 0},
                'lay': {'min': 0, 'max': 0},
                'row': {'min': 0, 'max': 0},
                'col': {'min': 0, 'max': 0},
                'objects': ['374b0d0d-d20c-4025-ac8e-e77169fe8403']
            },
            'location_1': {
                'type': 'object',
                'ts': {'min': 0, 'max': 0},
                'lay': {'min': 0, 'max': 0},
                'row': {'min': 0, 'max': 0},
                'col': {'min': 0, 'max': 0},
                'objects': ['f4b98ae9-98a9-4c49-94b6-59c691bfe91e']
            },
            'location_2': {
                'type': 'object',
                'ts': {'min': 0, 'max': 0},
                'lay': {'min': 0, 'max': 0},
                'row': {'min': 0, 'max': 0},
                'col': {'min': 0, 'max': 0},
                'objects': ['baafc985-4739-4106-b8be-54d6c129ade2']
            }
        }, {
            'id': '7e259433-80c7-4aa6-bb77-08ac98a947d6',
            'name': 'Max Flux Pumping',
            'type': 'flux',
            'conc_file_name': 'MT3D001.UCN',
            'summary_method': 'max',
            'weight': -1,
            'penalty_value': 999,
            'location': {
                'type': 'object',
                'ts': {'min': 0, 'max': 0},
                'lay': {'min': 0, 'max': 0},
                'row': {'min': 0, 'max': 0},
                'col': {'min': 0, 'max': 0},
                'objects': ['baafc985-4739-4106-b8be-54d6c129ade2']
            },
            'location_1': {
                'type': 'bbox',
                'ts': {'min': 0, 'max': 0},
                'lay': {'min': 0, 'max': 0},
                'row': {'min': 0, 'max': 0},
                'col': {'min': 0, 'max': 0},
                'objects': []
            },
            'location_2': {
                'type': 'bbox',
                'ts': {'min': 0, 'max': 0},
                'lay': {'min': 0, 'max': 0},
                'row': {'min': 0, 'max': 0},
                'col': {'min': 0, 'max': 0},
                'objects': []
            }
        }, {
            'id': '2b42c589-3165-48de-8e55-6b44038d82f3',
            'name': 'Min Well Distance 2',
            'type': 'distance',
            'conc_file_name': 'MT3D001.UCN',
            'summary_method': 'min',
            'weight': -1,
            'penalty_value': 999,
            'location': {
                'type': 'bbox',
                'ts': {'min': 0, 'max': 0},
                'lay': {'min': 0, 'max': 0},
                'row': {'min': 0, 'max': 0},
                'col': {'min': 0, 'max': 0},
                'objects': []
            },
            'location_1': {
                'type': 'object',
                'ts': {'min': 0, 'max': 0},
                'lay': {'min': 0, 'max': 0},
                'row': {'min': 0, 'max': 0},
                'col': {'min': 0, 'max': 0},
                'objects': ['194dfc5e-b23f-4261-986b-bc1f650df50a']
            },
            'location_2': {
                'type': 'object',
                'ts': {'min': 0, 'max': 0},
                'lay': {'min': 0, 'max': 0},
                'row': {'min': 0, 'max': 0},
                'col': {'min': 0, 'max': 0},
                'objects': ['baafc985-4739-4106-b8be-54d6c129ade2']
            }
        }, {
            'id': 'f7f49393-df99-431f-b5ea-b3ac6e4c172d',
            'name': 'Min Well Distance 3',
            'type': 'distance',
            'conc_file_name': 'MT3D001.UCN',
            'summary_method': 'min',
            'weight': -1,
            'penalty_value': 999,
            'location': {
                'type': 'bbox',
                'ts': {'min': 0, 'max': 0},
                'lay': {'min': 0, 'max': 0},
                'row': {'min': 0, 'max': 0},
                'col': {'min': 0, 'max': 0},
                'objects': []
            },
            'location_1': {
                'type': 'object',
                'ts': {'min': 0, 'max': 0},
                'lay': {'min': 0, 'max': 0},
                'row': {'min': 0, 'max': 0},
                'col': {'min': 0, 'max': 0},
                'objects': ['98775a8b-d7f7-458d-bef2-888066b29a5a']
            },
            'location_2': {
                'type': 'object',
                'ts': {'min': 0, 'max': 0},
                'lay': {'min': 0, 'max': 0},
                'row': {'min': 0, 'max': 0},
                'col': {'min': 0, 'max': 0},
                'objects': ['baafc985-4739-4106-b8be-54d6c129ade2']
            }
        }],
        'objects': [{
            'id': 'f4b98ae9-98a9-4c49-94b6-59c691bfe91e',
            'name': 'Infiltration 1',
            'type': 'wel',
            'position': {
                'type': 'bbox',
                'ts': {'min': 0, 'max': 0},
                'lay': {'min': 0, 'max': 0},
                'row': {'min': 7, 'max': 7},
                'col': {'min': 10, 'max': 10},
                'objects': []
            },
            'flux': {
                '0': {'min': 0, 'max': 0, 'result': null}
            },
            'concentration': {
                '0': {
                    'NaCl': {'min': 0, 'max': 0, 'result': null}
                }
            },
            'substances': [],
            'numberOfStressPeriods': 13
        }, {
            'id': '194dfc5e-b23f-4261-986b-bc1f650df50a',
            'name': 'Infiltration 2',
            'type': 'wel',
            'position': {
                'type': 'bbox',
                'ts': {'min': 0, 'max': 0},
                'lay': {'min': 0, 'max': 0},
                'row': {'min': 12, 'max': 12},
                'col': {'min': 7, 'max': 7},
                'objects': []
            },
            'flux': {
                '0': {'min': 0, 'max': 0, 'result': null}
            },
            'concentration': {
                '0': {
                    'NaCl': {'min': 0, 'max': 0, 'result': null}
                }
            },
            'substances': [],
            'numberOfStressPeriods': 13
        }, {
            'id': '98775a8b-d7f7-458d-bef2-888066b29a5a',
            'name': 'Infiltration 3',
            'type': 'wel',
            'position': {
                'type': 'bbox',
                'ts': {'min': 0, 'max': 0},
                'lay': {'min': 0, 'max': 0},
                'row': {'min': 16, 'max': 16},
                'col': {'min': 20, 'max': 20},
                'objects': []
            },
            'flux': {
                '0': {'min': 0, 'max': 0, 'result': null}
            },
            'concentration': {
                '0': {
                    'NaCl': {'min': 0, 'max': 0, 'result': null}
                }
            },
            'substances': [],
            'numberOfStressPeriods': 13
        }, {
            'id': 'baafc985-4739-4106-b8be-54d6c129ade2',
            'name': 'Pumping Well',
            'type': 'wel',
            'position': {
                'type': 'bbox',
                'ts': {'min': 0, 'max': 0},
                'lay': {'min': 0, 'max': 0},
                'row': {'min': 21, 'max': 21},
                'col': {'min': 19, 'max': 19},
                'objects': []
            },
            'flux': {
                '0': {'min': 0, 'max': 0, 'result': null}
            },
            'concentration': {
                '0': {
                    'NaCl': {'min': 0, 'max': 0, 'result': null}
                }
            },
            'substances': []
        }]
    },
    'state': 11,
    'progress': [],
    'results': []
}
;
