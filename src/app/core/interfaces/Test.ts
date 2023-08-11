export interface Test {
	id: string;
	label: string;
	image: string;
	logFile?: string;
	statusFile?: string;
}

export interface TestStatus {
	id: number;
	status: number | string; // <0 = stoped, 0 = paused, >0 = running
	progress: number;
	tests: StatusItem[];
}

export interface StatusItem {
	id: string;
	status: number | string; // <0 = stoped, 0 = paused, >0 = running
}