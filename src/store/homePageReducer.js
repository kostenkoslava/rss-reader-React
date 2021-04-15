const UPDATE_NAME_TEXT_AREA = 'Update Name Text Area';
const UPDATE_LINK_TEXT_AREA = 'Update Link Text Area';
const ADD_FEED = 'Add Feed';
export const homePageReducer = (state, action) => {
    if (action.type === UPDATE_NAME_TEXT_AREA) {
        return { ...state, nameTextArea: action.name }
    }
    if (action.type === UPDATE_LINK_TEXT_AREA) {
        return { ...state, linkTextArea: action.link };
    }
    if (action.type === ADD_FEED) {
        return {
            ...state,
            feeds: [...state.feeds, { name: state.nameTextArea, url: state.linkTextArea }],
            nameTextArea: '',
            linkTextArea: '',
        }
    }
}

export const updateNameAC = (name) => ({ type: UPDATE_NAME_TEXT_AREA, name });
export const updateLinkAC = (link) => ({ type: UPDATE_LINK_TEXT_AREA, link });
export const addFeedAC = () => ({ type: ADD_FEED })
