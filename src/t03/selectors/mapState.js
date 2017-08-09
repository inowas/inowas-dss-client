import { createSelector } from 'reselect'
import { webData } from '../../core/webData/selectors'
import { boundary } from '../selectors';
import {makeGetBoundaries} from "../../core/dataTable/selectors";

export const makeGetWebData = () => {
    return createSelector(
        [webData.getRequestStatus],
        (status) => status
    );
};

export const makeMapStateToProps = () => {

    const boundaries = makeGetBoundaries();
    const webData = makeGetWebData();

    return (state, props) => {
        return {
            boundaries: boundary.getBoundaries( boundaries(state, props) ),
            webData: webData(state, props),
        }
    };
};
