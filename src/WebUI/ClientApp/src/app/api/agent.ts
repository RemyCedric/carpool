import axios, { AxiosResponse } from 'axios';
import { LoginDto, RegisterDto, UserDto } from './web-api-dtos';
//  import { toast } from 'react-toastify';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use((config) => {
    //   const { token } = store.commonStore;
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

/*
axios.interceptors.response.use(
    
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response) {
            const { data, status, config } = error.response;
            switch (status) {
                case 400:
                    if (typeof data === 'string') {
                        toast.error(data);
                    }
                    // eslint-disable-next-line no-prototype-builtins
                    else if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                        history.push('/not-found');
                    } //
                    else if (data.errors) {
                        const modalStateError = [];
                        // eslint-disable-next-line no-restricted-syntax
                        for (const key in data.errors) {
                            if (data.errors[key]) {
                                modalStateError.push(data.errors[key]);
                            }
                        }
                        throw modalStateError.flat();
                    }
                    break;
                case 401:
                    toast.error('Unauthorized');
                    break;
                case 404:
                    history.push('/not-found');
                    break;
                case 500:
                    store.commonStore.setServerError(data);
                    history.push('/server-error');
                    break;
                default:
                    break;
            }
        }
        return Promise.reject(error);
    },
);
*/

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: unknown) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: unknown) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Account = {
    login: (loginDto: LoginDto): Promise<UserDto> => requests.post<UserDto>('account/login', loginDto),
    register: (registerDto: RegisterDto): Promise<UserDto> => requests.post<UserDto>('account/register', registerDto),
    currentUser: (): Promise<UserDto> => requests.get<UserDto>('account'),
};

const agent = {
    Account,
};

export default agent;
