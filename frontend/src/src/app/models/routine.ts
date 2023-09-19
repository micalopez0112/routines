import { Serie } from './serie';

export interface Routine {
  _id: string;
  name: string;
  dateCreated: Date;
  dateUpdated: Date;
  series: Serie[];
}
