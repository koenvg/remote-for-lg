import {nonEmptyArray, record, string} from 'fp-ts';
import {pipe} from 'fp-ts/lib/function';
import {NonEmptyArray} from 'fp-ts/lib/NonEmptyArray';

export function keepFirst<A>(fn: (a: A) => string) {
  return (list: A[]): A[] => {
    return pipe(
      list,
      nonEmptyArray.groupBy(fn),
      record.reduce(string.Ord)([] as any as NonEmptyArray<A>, (acc, item) => {
        acc.push(item[0]);
        return acc;
      }),
    );
  };
}
