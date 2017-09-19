import Console from '../../components/primitive/Console';
import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';

const logs = ({calculation}) => <Console>{calculation.message}</Console>;

export default ConfiguredRadium(logs);
