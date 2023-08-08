interface IEnvironment {
    production: boolean;
    useMocks: boolean;
    apiUrl: string;
    appName: string;
}

export const environment: IEnvironment = {
    production: false,
    useMocks: false,
    apiUrl: 'http://127.0.0.1:2999/api',
    appName: 'DIP Test server',
};
