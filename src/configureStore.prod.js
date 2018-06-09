import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware, { END } from "redux-saga";
import createBrowserHistory from "history/createBrowserHistory";
import createMemoryHistory from "history/createMemoryHistory";

/** 리듀서 가져오기 */
import rootReducer from './rootReducer';
/** 사가 가져오기 */
import sagas from './rootSagas';
/** 히스토리 생성 */
export const history =
  typeof window !== "undefined"
    ? createBrowserHistory()
    : createMemoryHistory();
/** 사가 미들웨어 생성 */
const sagaMiddleware = createSagaMiddleware();

/** 미들웨어 생성 후 합치기 */
const enhancers = [];
const middlewares = [sagaMiddleware];
/** 리액트 데브툴 환경 설정 */
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const devToolsExtension = window.devToolsExtension;
  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}
/** 미들웨어 합치기 */
const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  ...enhancers
);

const configureStore = initialState =>{
  /** 스토어 생성 */
  const store = createStore(rootReducer, initialState, composedEnhancers);
  /** 사가 실행 */
  
  store.runSaga = sagaMiddleware.run;
  store.close = () => {
    store.dispatch(END);
  };
  return store;
}

/** 스토어 리턴 */
export default configureStore;