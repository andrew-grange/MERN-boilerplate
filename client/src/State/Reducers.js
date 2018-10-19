import * as types from './ActionTypes'

const setInitialState = () => {
    return {
        representation: [],
        profile: [],
        selectedManuscriptID: '',
        manuscripts: [],
        currentManuscriptStrategy: [],
    }
}

export default function reducer(state, action) {
    const {type, payload} = action;
    state = state || setInitialState();
    const tempArray = state.representation;
    const tempProfile = state.profile;
    switch (type) {
        case types.UPDATE_FICTION_STATE:
            tempArray.Fiction[payload.index][1] = payload.array;
            return {
                ...state,
                representation: tempArray
            };
        case types.UPDATE_NON_FICTION_STATE:
            tempArray.NonFiction[payload.index][1] = payload.value;
            return {
                ...state,
                representation: tempArray
            };
        case types.UPDATE_NON_FICTION_CATEGORIES:
            tempArray.NonFiction[0][1] = payload.array;
            return {
                ...state,
                representation: tempArray
            };
        case types.UPDATE_NOTIFICATION_PARAMETERS:
            tempProfile.notifications[payload.index][1] = payload.value;
            return {
                ...state,
                profile: tempProfile
            };
        case types.GET_DATA_FROM_SERVER:
            return {
                ...state,
                representation: payload.representation,
                profile: payload.profile
            };
        case types.SAVE_FORM_DATA:
            return {
                ...state,
                representation: payload.representation,
                profile: { ...state.profile, bio: payload.bio, socialMedia: payload.socialMedia, bragBox: payload.bragBox}
            };
        case types.CHANGE_SELECTED_MANUSCRIPT:
            return {
                ...state,
                selectedManuscriptID: payload.manuscriptID,
                currentManuscriptStrategy: payload.currentManuscriptStrategy,
            };
        case types.GET_ALL_MANUSCRIPTS:
            return {
                ...state,
                manuscripts: payload.manuscripts,
                selectedManuscriptID: payload.manuscripts[0]._id,
            };
        case types.GET_SUBMISSION_STRATEGY:
            return {
                ...state,
                currentManuscriptStrategy: payload.currentManuscriptStrategy,
            };
        default:
            return state
    }
}