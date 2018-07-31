import BoundaryFactory from '../../../src/core/boundaries/BoundaryFactory';
import SsmBoundaryValues from '../../../src/core/modflow/mt3d/SsmBoundaryValues';

export const getSsmGhbBoundaryValues = () => {
    const ghbBoundary = BoundaryFactory.fromType('ghb');
    ghbBoundary.affectedLayers = [0, 2];
    ghbBoundary.activeCells = [[3, 4], [3, 5], [3, 6]];
    const ssmBoundaryValues = SsmBoundaryValues.create(ghbBoundary, 10);
    ssmBoundaryValues.stressPeriodValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    return ssmBoundaryValues;
};

export const getSsmWelBoundaryValues = () => {
    const welBoundary = BoundaryFactory.fromType('wel');
    welBoundary.affectedLayers = [2];
    welBoundary.activeCells = [[3, 4]];
    const ssmBoundaryValues = SsmBoundaryValues.create(welBoundary, 10);
    ssmBoundaryValues.stressPeriodValues = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    return ssmBoundaryValues;
};
