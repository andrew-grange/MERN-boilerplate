import * as types from './ActionTypes'
import axios from 'axios'
import {getUserData} from '../Util/localStorage';
import {Structure} from "../Util/RepresentationDataStructure";

export const getDataFromServer = () => {
    const _id = getUserData()._id;
    const token = getUserData().token;
    const url = `/api/getUserProfile?userID=${_id}`;
    const options = {
        method: 'get',
        url: url,
        headers: {
            Authorization: token
        }
    };
    return (dispatch) => {
        axios(options)
            .then(response => {
                const tempArray = response.data;
                if (response.status !== 200) {
                } else {
                    dispatch({
                        type: types.GET_DATA_FROM_SERVER,
                        payload: {representation: response.data.representation, profile: response.data}
                    })
                }
            });
    }
};

export const sendDataToServer = (payload) => {
    const tempArray = payload;
    const _id = getUserData()._id;
    const token = getUserData().token;
    const url = `/api/modifyAgentOptions?userID=${_id}`;
    let bool = false;
    payload.bragBox.map((array, i) => {
        const options = {
            method: 'post',
            url: `https://api.linkpreview.net?key=5ac3a74ae82d3607f117bcb3d5559011426ec5d9c42f9&q=${array[1]}`,
        };
        if(array[1] !== '' && array[2].title === '') {
            axios(options)
                .then(function (response) {
                    tempArray.bragBox[i][2] = {
                        title: response.data.title,
                        description: response.data.description,
                        image: response.data.image
                    };
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    });

    const profile = {
        representation: payload.representation,
        bio: payload.bio,
        socialMedia: payload.socialMedia,
        bragBox: tempArray.bragBox,
        notifications: payload.notifications
    };

    const options = {
        method: 'post',
        url: url,
        headers: {
            Authorization: token
        },
        data: {
            profile: profile
        }
    };
    return () => {
        axios(options)
            .then(response => {
                if (response.status !== 200) {

                }
            })
    }


};
export const updateFictionState = (payload) => {
    return (dispatch) => {
        dispatch({
            type: types.UPDATE_FICTION_STATE,
            payload: {index: payload.index, array: payload.array}
        })
    }
};
export const updateNonFictionState = (payload) => {
    return (dispatch) => {
        dispatch({
            type: types.UPDATE_NON_FICTION_STATE,
            payload: {index: payload.index, value: payload.value}
        })
    }
};
export const updateNonFictionCategories = (payload) => {
    return (dispatch) => {
        dispatch({
            type: types.UPDATE_NON_FICTION_CATEGORIES,
            payload: {array: payload.array}
        })
    }
};
export const updateNotificationParamaters = (payload) => {
    return (dispatch) => {
        dispatch({
            type: types.UPDATE_NOTIFICATION_PARAMETERS,
            payload: {index: payload.index, value: payload.value}
        })
    }
}
export const saveFormData = (payload) => {
    return (dispatch) => {
        dispatch({
            type: types.SAVE_FORM_DATA,
            payload: {representation: payload.representation, bio: payload.bio, socialMedia: payload.socialMedia, bragBox: payload.bragBox,}
        })
    }
};
export const addSubmissionStrategy = (payload) => {
    const _id = getUserData()._id;
    const token = getUserData().token;
    const options = {
        method: 'post',
        url: `/api/addSubmissionStrategy?agentID=${payload.agentID}&manuscriptID=${payload.manuscriptID}`,
        headers: {
            Authorization: token
        }
    };
    return (dispatch) => {
        axios(options)
            .then((response) => {

            })
            .catch((error) => {
                console.log(error);
            });
    }
};
export const getAllManuscripts = () => {
    const _id = getUserData()._id;
    const token = getUserData().token;
    const options = {
        method: 'get',
        url: `/api/getUserManuscripts?userID=${_id}`,
        headers: {
            Authorization: token
        }
    };
    return (dispatch) => {
        axios(options)
            .then((response) => {
                dispatch({
                    type: types.GET_ALL_MANUSCRIPTS,
                    payload: { manuscripts: response.data.manuscripts}
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

};
export const getSubmissionStrategy = (payload) => {
    const token = getUserData().token;
    const options = {
        method: 'post',
        url: `/api/getSubmissionStrategy?manuscriptID=${payload.manuscriptID}`,
        headers: {
            Authorization: token
        }
    };
    window.console.log(options);
    return (dispatch) => {
        axios(options)
            .then((response) => {
                window.console.log(response);
                dispatch({
                    type: types.GET_SUBMISSION_STRATEGY,
                    payload: { currentManuscriptStrategy: response.data.strategies}
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
};
export const changeSelectedManuscript = (payload) => {
    const token = getUserData().token;
    const options = {
        method: 'post',
        url: `/api/getSubmissionStrategy?manuscriptID=${payload.manuscriptID}`,
        headers: {
            Authorization: token
        }
    };
    return (dispatch) => {
        axios(options)
            .then((response) => {
                dispatch({
                    type: types.CHANGE_SELECTED_MANUSCRIPT,
                    payload: {manuscriptID: payload.manuscriptID, currentManuscriptStrategy: response.data.strategies}
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
};