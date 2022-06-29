import {task, taskEither} from 'fp-ts';
import {pipe} from 'fp-ts/lib/function';
import {Task} from 'fp-ts/lib/Task';
import {TaskEither} from 'fp-ts/lib/TaskEither';
import {useQuery} from 'react-query';
import {tvService} from './tvService';

const throwWhenLeft = <Error, A>(t: TaskEither<Error, A>): Task<A> => {
  return pipe(
    t,
    taskEither.fold(err => {
      throw err;
    }, task.of),
  );
};

export const REGISTERED_TVS_QUERY = 'registeredTVs';
export const useRegisteredTVs = () =>
  useQuery(REGISTERED_TVS_QUERY, throwWhenLeft(tvService.getRegisteredTVs));
