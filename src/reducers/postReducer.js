//A reducer can never ever return undefined obj .shld return something!

export default (state=[], action) => {
    if(action.type === "FETCH_POST") {
        return action.payload;
    }
    return state;
};

//good to use switch in reducer when there are too many types

//Rules for reducers
// 1.Must not mutate state ever (can but not mostly) -> coz even if you return the same state the react app doesn't rerender
// 2.Reducers are pure . returns just some computational onbject nothning more than that
//3. evertime a reducer runs it gets the input as the previous state the same reducer returned along with the action
//Reducer can never return undefined value


//Follow safe state update methods in reducer ed-> filter, map, spread, etc...