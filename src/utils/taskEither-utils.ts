import {either, task} from 'fp-ts';
import {pipe} from 'fp-ts/lib/function';
import {TaskEither} from 'fp-ts/lib/TaskEither';

export function retry<A, B>(numberOfTimes: number) {
  return (t: TaskEither<A, B>): TaskEither<A, B> => {
    return pipe(
      t,
      task.chain(e => {
        const s = pipe(
          e,
          either.fold(
            () => {
              if (numberOfTimes > 0) {
                return retry(numberOfTimes - 1)(t) as TaskEither<A, B>;
              }
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
