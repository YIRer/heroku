import { all } from "redux-saga/effects";
import { watchEventsSaga } from 'features/Event/sagas';
/** takeLatest나 takeEvery 상태인 사가의 객체 넣기 */

export default function* sagas() {
  yield all([
    //사가 객체 삽입
    watchEventsSaga()
  ]);
}