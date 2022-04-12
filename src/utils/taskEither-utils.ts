import {either, task} from 'fp-ts';
import {pipe} from 'fp-ts/lib/function';
import {TaskEither} from 'fp-ts/lib/TaskEither';

export function retry<A, B>(numberOfTimes: number) {
  let counter = numberOfTimes;

  return (t: TaskEither<A, B>): TaskEither<A, B> => {
    return pipe(
      t,
      task.chain(e => {
        const s = pipe(
          e,
          either.fold(
            () => {
              if (--counter > 0) return t;
              return task.of(e);
            },
            () => task.of(e),
          ),
        );
        return s;
      }),
    );
  };
}
