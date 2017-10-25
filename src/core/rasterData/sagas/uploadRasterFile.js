import {put, take, call} from 'redux-saga/effects';
import {Action, Command, Event} from '../actions/index';
import {WebData} from '../../../core';

export default function* uploadRasterFileFlow() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const {type, file, width, height} = yield take(
            Command.UPLOAD_RASTER_FILE
        );

        const uploadData = new FormData();
        uploadData.append('file', file);

        const uploadResponse = yield call(WebData.Saga.singleAjaxRequest, {
            url: 'rasterfile',
            provokingActionType: type,
            method: 'post',
            data: uploadData
        });

        if (uploadResponse !== null) {
            const hash = uploadResponse.hash;
            const url = uploadResponse.url;

            yield put(Event.rasterFileWasUploaded(hash, url));

            let queryParams = '';
            if (width && height) {
                queryParams = '?width=' + width + '&height=' + height;
            }

            const rasterData = yield call(WebData.Saga.singleAjaxRequest, {
                url: 'rasterfile/' + hash + queryParams,
                provokingActionType: type,
                method: 'get'
            });

            if (rasterData !== null) {
                const {data, metadata} = rasterData;
                yield put(Action.setRasterFile(hash, metadata, data));
            }
        }
    }
}
