export default (state = {}, action) => {
    switch (action.type) {
        case 'SIMPLE_ACTION':
            return {
                search: action.search
            }
        default:
            return state
    }
}
