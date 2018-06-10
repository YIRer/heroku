/** 액션타입 불러오기 */
import { types } from "./types";

/** 액션 객체 반환 */
export const actions = {
  /* ---------- GET_TYPE_DEFINE ---------- */
  // 액션 타입의 상태에 따른 데이터 처리
  getTypeDefineRequest: eventId => ({
    type: types.GET_TPYE_DEFINE_REQUEST,
    eventId
  }),
  getTypeDefineSuccess: event => ({
    type: types.GET_TPYE_DEFINE_SUCCESS,
    event
  }),
  getTypeDefineFailure: error => ({
    type: types.GET_TPYE_DEFINE_FAILURE,
    error
  }),
  setTitleString : title =>({
    type: types.SET_TITLE_STRING,
    title
  })
};