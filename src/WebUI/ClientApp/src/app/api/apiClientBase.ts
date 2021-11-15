// Don't touch this, it's used by nswag auto generation
import { AxiosRequestConfig as requestConfig } from 'axios';

export default class ApiClientBase {
    protected transformOptions = (options: requestConfig): Promise<requestConfig> => {
        options.transformResponse = (data) => data;
        return Promise.resolve(options);
    };
}
