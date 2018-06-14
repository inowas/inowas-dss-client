export const optimization = {
    'parameters': {
        'ngen': 5,
        'pop_size': 10,
        'mutpb': 0.1,
        'cxpb': 0.9,
        'eta': 20,
        'indpb': 0.2,
        'ncls': 3,
        'nlocal': 1,
        'maxf': 10,
        'qbound': 0.25,
        'diversity_flg': true,
        'local_opt_flg': true,
        'refpoint': [0, 0]
    },
    'objectives': [
        {
            'type': 'concentration',
            'conc_file_name': 'MT3D001.UCN',
            'summary_method': 'max',
            'weight': -1,
            'penalty_value': 999,
            'location': {
                'type': 'bbox',
                'ts': [0, 0],
                'lay': [0, 0],
                'row': [90, 90],
                'col': [90, 90]
            }
        },
        {
            'type': 'head',
            'summary_method': 'max',
            'weight': -1,
            'penalty_value': 999,
            'location': {
                'type': 'object',
                'objects': [0, 1]
            }
        }
    ],
    'constraints': [
        {
            'type': 'concentration',
            'conc_file_name': 'MT3D001.UCN',
            'summary_method': 'max',
            'operator': 'less',
            'value': 2,
            'location': {
                'type': 'bbox',
                'ts': [0, 0],
                'lay': [0, 0],
                'row': [90, 90],
                'col': [90, 90]
            }
        }
    ],
    'objects': [
        {
            'id': 0,
            'type': 'well',
            'position': {
                'row': [30, 150],
                'col': [30, 150],
                'lay': [0, 0]
            },
            'flux': {
                '0': [720, 720]
            },
            'concentration': {
                '0': [[0, 0]]
            }
        },
        {
            'id': 1,
            'type': 'well',
            'position': {
                'row': [30, 150],
                'col': [30, 150],
                'lay': [0, 0]
            },
            'flux': {
                '0': [720, 720]
            },
            'concentration': {
                '0': [[0, 0]]
            }
        },
        {
            'id': 2,
            'type': 'well',
            'position': {
                'row': [30, 150],
                'col': [30, 150],
                'lay': [0, 0]
            },
            'flux': {
                '0': [720, 720]
            },
            'concentration': {
                '0': [[0, 0]]
            }
        },
        {
            'id': 3,
            'type': 'well',
            'position': {
                'row': [109, 110],
                'col': [109, 110],
                'lay': [0, 0]
            },
            'flux': {
                '0': [-2160, -2160]
            }
        }
    ]
}
;
