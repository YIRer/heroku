import configureStore from './configureStore';

/** 초기 상태 값 생성 */
const initialState = typeof window !== "undefined" && window && window.INITIAL_STATE;
// 클라이언트에서만 사용됨

export default configureStore(initialState);