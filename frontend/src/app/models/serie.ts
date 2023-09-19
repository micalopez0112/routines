import { Exercise } from './excersice';

export interface Serie {
  _id: string;
  exercises: Exercise[];
  repetitions: number;
  completed: boolean;
}
