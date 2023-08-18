export interface DIPTest {
	id: string;
	label: string;
	image: string;
	logFile?: string;
	statusFile?: string;
	ioFile?: string;
	scripts: {
		[scriptName: string]: string;
	};
}

export interface TestStatus {
	id: number;
	label?: string;
	status: number;
	progress: number;
	steps: StepStatus[];
}

export interface StepStatus {
	label: string;
	status?: number;
	commands: Command[];
}

export interface Command {
	label: string;
	status?: number;
}

export enum ExecutionStatus {
	UNDEFINED = "undefined", // 
	PAUSED = "pause",       // 0
	STARTED = "start",     // 1
	STOPED = "stop",       // -1
	ERROR = "error",         //
}