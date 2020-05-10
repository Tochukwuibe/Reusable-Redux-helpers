import { call, put } from 'redux-saga/effects';




const async_worker = (type, config = {
    retry = 1,
}) => {

    const initialState = {
        fetching: false,
        success: false,
        error: null,
        retried: 0
    }

    const types = {
        setFetcing: `${type}_set_fetching`,
        setSuccess: `${type}_set_success`,
        setRetry: `${type}_set_retry`,
        setError: `${type}_set_error`
    }

    return {
        action: function* (cb) {
            let retry = config.retry;

            for (let i = 0; i < retry; i++) {
                try {

                    yield put({ type: types.setFetcing, payload: true });
                    yield call(cb);
                    yield put({ type: types.setSuccess, payload: true });
                    yield put({ type: types.setFetcing, payload: false });

                } catch (e) {

                    yield put({ type: types.setFetcing, payload: false });
                    yield put({ type: types.setSuccess, payload: false });
                    yield put({ type: types.setError, payload: e });

                }
            }

        },
        reducer: (state = initialState, action) => {
            switch (action.payload) {
                case types.setError: {
                    return { ...state, error: action.payload }
                }
                case types.setRetry: {
                    return { ...state, retried: action.payload }
                }
                case types.setSuccess: {
                    return { ...state, success: action.payload }
                }
                case types.setFetcing: {
                    return { ...state, fetching: action.payload }
                }
                default:
                    return state;
            }
        }
    }
}

export const async_worker;
