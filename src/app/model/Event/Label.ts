import { User } from '../user';

export interface label {
  labelId?: number;
  value?: string;
  subscribers: User[];
}
