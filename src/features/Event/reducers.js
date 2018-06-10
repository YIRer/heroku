/** 액션 타입에 따라 리듀서 처리를 위해 리덕스 액션을 사용하여 바인딩 */
import { handleActions } from "redux-actions";
//액션타입 불러오기
import { types } from "./types";

//초기 상태값 설정. 나중에 combineReducers로 묶어서 사용함
const initialState = {
  loading:false,
  title:"set title",
  current:{}
};

// 액션타입에 따라 데이터 반영
export default handleActions(
  {
    /* ---------- GET_ENVET ---------- */
    [types.GET_TPYE_DEFINE_REQUEST]: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    [types.GET_TPYE_DEFINE_SUCCESS]: (state, action) => {
      return {
        ...state,
        loading: false,
        current: action.event
      };
    },
    [types.GET_TPYE_DEFINE_FAILURE]: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    },
    [types.SET_TITLE_STRING] : (state,action) =>{
      return {
        ...state,
        title : action.title
      }
    }
  },
  initialState
);