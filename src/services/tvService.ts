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
    taskEither.chain(hasDefault => {
      const toRegister: TV = {...tv, default: !hasDefault};
      return pipe(
        taskEither.tryCatch(
          () => AsyncStorage.setItem(tv.name, JSON.stringify(toRegister)),
          e =>
            new Error('Something went wrong saving the TV' + JSON.stringify(e)),
        ),
        taskEither.map(() => toRegister),
      );
    }),
  );
};

export const tvService = {
  registerTV,
  getRegisteredTVs,
};
