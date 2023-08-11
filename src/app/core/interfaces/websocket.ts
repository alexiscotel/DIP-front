// export interface Test {
// 	id: string;
// 	label: string;
// 	image: string;
// 	logFile?: string;
// 	steps: Step[];
// }

// export interface Step {
// 	id: number;
// 	label: string;
// 	commands?: string[];
// }


export interface SocketData {
	sender: string
	type: socketType;
	data?: any
}

export enum socketType {
	join = 'join',
	leave = 'leave',
	message = 'message',
	start = 'start',
	pause = 'pause',
	stop = 'stop',
	logFile = 'logFile',
	statusFile = 'statusFile',
	ioFile = 'ioFile',
}
