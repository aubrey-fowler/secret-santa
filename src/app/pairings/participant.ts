import { Name } from './name';

export class Participant {
	constructor(
		public guid: string,
		public name: Name,
		public email: string,
		public phone: string
	) {}
}