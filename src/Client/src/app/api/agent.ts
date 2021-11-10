import axios, { AxiosResponse } from 'axios';
import { Sample } from '../models/sample/sample';

// Enter here the url of the api to contact
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: unknown) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: unknown) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Samples = {
    List: (): Promise<Sample[]> => requests.get<Sample[]>('WeatherForecast'),
};

const agent = {
    Samples,
};

export default agent;
