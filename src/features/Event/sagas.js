
/** 리덕스 사가의 메소드 불러오기 */
import { takeLatest, call, put } from "redux-saga/effects";
/** 비동기 처리시 사용할 api 불러오기 */
import api from "utils/api";
/** 데이터 처리를 위한 액션 불러오기 */
import { actions } from "./actions";
/** 데이터 처리를 위한 타입 불러오기 */
import { types as eventTypes } from "./types";
/** 제너레이터 함수를 이용한 액션 처리 */
// export function* getTypeDefineSaga(action) {
//   try {
//     const event = yield call(api.event.find, action.eventId);
//     yield put(actions.getEventSuccess(event));
//   } catch (error) {
//     yield put(actions.getEventFailure(error));
//   }
// }

// export function* setTitleStringSaga(action) {
//   try {
//     const event = yield call(api.event.title, action.title);
//     yield put(actions.setTitleString(event));
//   } catch (error) {
//     alert(error);
//   }
// }
/** 하나의 액션으로 데이터 처리 */
export function* watchEventsSaga() {
  // yield takeLatest(eventTypes.GET_TYPEDEFINE_REQUEST, getTypeDefineSaga)
  // yield takeLatest(eventTypes.SET_TITLE_STRING, setTitleStringSaga)
}