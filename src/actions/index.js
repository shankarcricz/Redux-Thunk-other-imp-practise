import jsonplaceholder from "../apis/jsonplaceholder";
import _ from 'lodash';


//without redux-thunk normal api call won't work in a action creator
// using thunk we are returning a function itself with async await feature , the rest will be taken care by our middleware thunk before dispatching to reducers!.

//Action creator 1

export const fetchPost = () => {
    return async (dispatch, getState) => {
        const response = await jsonplaceholder.get('/posts');
        dispatch({
            type: 'FETCH_POST',
            payload : response.data
        });
    };
};


//this dispatch(action creator is good so that we can call it separately)
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPost());

    //lodash map is used to get an array of uniq user id's
    const userIds = _.uniq(_.map(getState().posts, 'userId'));  //userIds = [1,2,3,4,...]
    userIds.forEach(id => dispatch(fetchUser(id)));
}

//Action cretor 2
export const fetchUser = id => async dispatch => {
    const response = await jsonplaceholder.get(`/users/${id}`);
    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    });
}


//this below tech is not nice!
//this _ is memoization method used to prevent the api call from happening more than once 

//Action creator 2
// export const fetchUser = (id) => async dispatch => {
//     _fetchUser(id, dispatch);
// };

// const _fetchUser = _.memoize(async(id, dispatch) => {
//     const response = await jsonplaceholder.get(`/users/${id}`);
//     dispatch({type: 'FETCH_USER', payload: response.data});
// });


//this is how a thunk involved action looks!