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

export enum CommandStatus {
	UNDEFINED = "UNDEFINED", // 
	PAUSED = "PAUSED",       // 0
	STARTED = "STARTED",     // 1
	STOPED = "STOPED",       // -1
	END = "END",             // 
	ERROR = "ERROR",         //
}