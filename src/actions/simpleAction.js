export const simpleAction = (search) => dispatch => {
    dispatch({
        type: 'SIMPLE_ACTION',
        search
    })
}
