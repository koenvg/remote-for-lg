import AsyncStorage from '@react-native-async-storage/async-storage';
import {readonlyArray, taskEither} from 'fp-ts';
import {flow, pipe} from 'fp-ts/lib/function';

export interface TV {
  name: string;
  ip: string;
  clientKey: string;
  mac?: string;
}

const tvKeyPrefix = 'tv_';

function createKeyForTV(tv: TV) {
  return `${tvKeyPrefix}${tv.name}`;
}

const getRegisteredTVs = pipe(
  taskEither.tryCatch(
    () => AsyncStorage.getAllKeys(),
    e => new Error(JSON.stringify(e)),
  ),
  taskEither.map(readonlyArray.filter(key => key.startsWith(tvKeyPrefix))),
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

const registerTV = save;

function save(tv: TV) {
  return pipe(
    taskEither.tryCatch(
      () => AsyncStorage.setItem(createKeyForTV(tv), JSON.stringify(tv)),
      e => new Error('Something went wrong saving the TV' + JSON.stringify(e)),
    ),
    taskEither.map(() => tv),
  );
}

function deleteTV(tv: TV) {
  return taskEither.tryCatch(
    () => AsyncStorage.removeItem(createKeyForTV(tv)),
    e => new Error('Something went wrong deleting the TV' + JSON.stringify(e)),
  );
}

export const tvService = {
  registerTV,
  getRegisteredTVs,
  deleteTV,
};
