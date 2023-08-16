export interface DIPTest {
	id: string;
	label: string;
	image: string;
	logFile?: string;
	statusFile?: string;
}

export interface StatusTest {
	id: number;
	label?: string;
	status: number;
	progress: number;
	steps: StepStatus[];
}

export interface StepStatus {
	key: string;
	status?: number;
	values: Command[];
}

export interface Command {
	id: string;
	status?: number;
}

export enum CommandStatus {
	UNDEFINED = "UNDEFINED",
	PAUSED = "PAUSED",
	STARTED = "STARTED",
	STOPED = "STOPED",
	END = "END",
	ERROR = "ERROR",
}