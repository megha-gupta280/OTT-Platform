import {showDetail} from "./actionTypes";

const initialState = {
    id: undefined,
  };


const showDetailsReducer = (state = initialState, action) => {
    switch (action?.type) {
     
      case showDetail:
        return {
          ...state,
          id: action.payload?.id,
        };
      default:
        return state;
    }
  };

  export default showDetailsReducer;