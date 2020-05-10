

const entity = (type, initialState = {}) => {

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

                    const entity = action.payload;
                    const ids = new Set(state.ids || []);
                    ids.add(entity.id);
                    const entities = { [action.payload.id]: action.paylaod };

                    return { ...state, ids, entities };
                }
                case types.remove: {

                    const entity = action.payload;
                    const entities = { ...state.entities };
                    const ids = new Set(state.ids || []);

                    if (typeof entity === 'string') {

                        ids.delete(entity)
                        delete entities[entity];
                    } else {

                        ids.delete(entity.id)
                        delete entities[entity.id];
                    }

                    return { ...state, entities, ids };
                }
                case types.update: {

                    const entity = action.payload;
                    const entities = { ...state.entities, [entity.id]: entity };
                    const ids = new Set(state.ids || []);

                    return { ...state, entities, ids };
                }
                case types.clear: {

                    return {};
                }
                
                default:
                    return state;
            }
        }
    }
}

export default entity;
