

const simple = (type, initialState = null) => {

    return {
        action: (payload) => (dispatch) => dispatch(payload),
        reducer: (state = initialState, action) =>  {
            if(acton.type === type)  {
                return action.payload;
            } else {
                return state;
            }
        }
    }
}

export default simple;
