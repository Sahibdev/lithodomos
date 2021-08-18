import { History } from 'history';
import { SagaIterator } from 'redux-saga';
import {
  call,
  getContext,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { ROUTES } from '../../config/routes';
import { resetApolloCache } from '../../graphql/ApolloClient';
import { SagaContextKeys } from '../types';
import {
  ACTION_TYPES,
  LogoutRequestAction,
  logoutSuccess,
} from './actions';


export const sagas = [loginRequestsSaga];

function* loginRequestsSaga(): SagaIterator {
  yield takeLatest(ACTION_TYPES.LOGOUT_REQUEST, logoutSaga);
}



function* logoutSaga(action: LogoutRequestAction): SagaIterator {
  const history: History = yield getContext(SagaContextKeys.history);

  yield call(history.push, ROUTES.index as any);

  // if the user intentionally logged out, clear apollo cache
  if (!action.payload?.automatic) {
    yield call(resetApolloCache);
  }

  yield put(logoutSuccess());
}
