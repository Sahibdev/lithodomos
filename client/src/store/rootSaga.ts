import { SagaIterator } from 'redux-saga';
import { all, spawn, call } from 'redux-saga/effects';
import { sagas as appSagas } from './app/sagas';

export function* rootSaga(): SagaIterator {
  const sagas: any = [
    ...appSagas,
  ];

  // Boilerplate that allows for throws in sagas to be restarted
  // as per https://redux-saga.js.org/docs/advanced/RootSaga.html
  yield all(
    sagas.map((saga: any) =>
      spawn(function* spawned() {
        while (true) {
          try {
            yield call(saga);

            break;
          } catch (error) {
            console.error(error)
          }
        }
      })
    )
  );
}
