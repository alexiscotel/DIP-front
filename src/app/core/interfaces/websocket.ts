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
	askLogFile = 'askLogFile',
	readLogFile = 'readLogFile',
	statusFile = 'statusFile',
	ioFile = 'ioFile',
}
