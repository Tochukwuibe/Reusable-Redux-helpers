

const list = (type, initialState = []) => {

    const types = {
        add: `${type}_add`,
        remove: `${type}_remove`,
        update: `${type}_update`,
        clear: `${type}_clear`
    }

    return {
        actions: {
            add: (payload) => (dispatch) => dispatch({ type: types.add, payload }),
            remove: (payload) => dispatch => dispatch({ type: types.remove, payload }),
            update: (payload) => dispatch => dispatch({ type: types.update, payload }),
            clear: () => dispatch => dispatch({ type: types.clear })
        },
        reducer: (state = initialState, action) => {
            switch (action.type) {

                case types.add: {
                    return [...state, action.payload];
                }
                case types.remove: {
                    if(typeof action.payload === 'string') {
                        return state.filter(({id}) => id !== action.payload);
                    }
                    return state.filter(({id}) => id !== payload.id);
                }
                case types.update: {
                    return state.map((entity) => entity.id === action.payload.id ? action.payload : {...entity});
                }
                case types.clear: {
                    return [];
                }
                default:
                    return state;
            }
        }
    }
}

export default list;
