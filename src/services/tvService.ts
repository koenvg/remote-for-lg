import AsyncStorage from '@react-native-async-storage/async-storage';
import {readonlyArray, taskEither} from 'fp-ts';
import {pipe} from 'fp-ts/lib/function';

export interface TV {
  name: string;
  ip: string;
  clientKey: string;
  default: boolean;
  mac?: string;
}

const getRegisteredTVs = pipe(
  taskEither.tryCatch(
    () => AsyncStorage.getAllKeys(),
    e => new Error(JSON.stringify(e)),
  ),
  taskEither.chain(tvs =>
    taskEither.tryCatch(
      () => AsyncStorage.multiGet(tvs as any),
      e => new Error(JSON.stringify(e)),
    ),
  ),
  taskEither.map(
    readonlyArray.map(
      ([_, value]) => JSON.parse(value as string) as unknown as TV,
    ),
  ),
);

const isDefaultTV = (tv: TV) => tv.default;

const registerTV = (tv: Omit<TV, 'default'>) => {
  return pipe(
    getRegisteredTVs,
    taskEither.map(readonlyArray.some(isDefaultTV)),
    taskEither.map(hasDefault => ({...tv, default: !hasDefault})),
    taskEither.chain(save),
  );
};

function saveAll(tvs: ReadonlyArray<TV>) {
  return pipe(
    tvs,
    readonlyArray.map(tv => [tv.name, JSON.stringify(tv)] as const),
    keyPairs =>
      taskEither.tryCatch(
        () => AsyncStorage.multiSet(keyPairs as any),
        e =>
          new Error('Something went wrong saving the TVs' + JSON.stringify(e)),
      ),
  );
}

function save(tv: TV) {
  return pipe(
    taskEither.tryCatch(
      () => AsyncStorage.setItem(tv.name, JSON.stringify(tv)),
      e => new Error('Something went wrong saving the TV' + JSON.stringify(e)),
    ),
    taskEither.map(() => tv),
  );
}

function setDefaultTV(tv: TV) {
  return pipe(
    getRegisteredTVs,
    taskEither.map(
      readonlyArray.map(registered => ({...registered, default: false})),
    ),
    taskEither.chain(saveAll),
    taskEither.chain(() => save({...tv, default: true})),
  );
}

function deleteTV(tv: TV) {
  return taskEither.tryCatch(
    () => AsyncStorage.removeItem(tv.name),
    e => new Error('Something went wrong deleting the TV' + JSON.stringify(e)),
  );
}

export const tvService = {
  registerTV,
  getRegisteredTVs,
  setDefaultTV,
  deleteTV,
};
