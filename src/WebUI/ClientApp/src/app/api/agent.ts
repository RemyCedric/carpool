/* eslint-disable no-debugger */
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { store } from '../store';
import { LoginDto, RegisterDto, UserDto } from './web-api-dtos';
//  import { toast } from 'react-toastify';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
    const token = store.getState().account.user?.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axios.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response) {
            const { data, status } = error.response;
            switch (status) {
                case 400:
                    toast.error(data.title);
                    break;
                case 401:
                    if (data) toast.error(data.title);
                    //  Todo Replace with a proper way to handle Unauthorized requests
                    else toast.error('Unauthorized');
                    break;
                case 404:
                    break;
                case 500:
                    toast.error('An error happened');
                    break;
                default:
                    break;
            }
        }
        return Promise.reject(error.response);
    },
);

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
