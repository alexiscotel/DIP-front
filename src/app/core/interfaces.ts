export interface DIPTest {
	id: string;
	label: string;
	image: string;
	logFile?: string;
	steps: Step[];
}

export interface Step {
	id: number;
	label: string;
	commands?: string[];
}