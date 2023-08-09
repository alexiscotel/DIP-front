interface IEnvironment {
    production: boolean;
    useMocks: boolean;
    apiUrl: string;
	websocketURL: string;
    appName: string;
}

export const environment: IEnvironment = {
    production: false,
    useMocks: false,
    apiUrl: 'http://127.0.0.1:2999/api',
	websocketURL: 'ws://localhost:8080',
    appName: 'DIP Test server',
};
