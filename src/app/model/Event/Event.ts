import { User } from '../user';
import { label } from './Label';

export interface Event {
  eventId?: number;
  eventName: string;
  eventInfo: string;
  maxAttend: number;
  eventStart: Date;
  eventEnd: Date;
  responsable: User;
  attendies: User[];
  labels: label[];
}
