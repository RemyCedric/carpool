/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.14.3.0 (NJsonSchema v10.5.2.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming



export interface UserDto {
    username: string;
    token: string;
}

export interface ProblemDetails {
    type: string | undefined;
    title: string | undefined;
    status: number | undefined;
    detail: string | undefined;
    instance: string | undefined;
}

export interface HttpValidationProblemDetails extends ProblemDetails {
    errors: { [key: string]: string[]; };
}

export interface ValidationProblemDetails extends HttpValidationProblemDetails {
    errors: { [key: string]: string[]; };
}

export interface LoginQuery {
    email: string;
    password: string;
}

export interface RegisterCommand {
    email: string;
    password: string;
    username: string;
}

export interface ResetPasswordCommand {
    email: string;
    token: string;
    password: string;
}

export interface EventDto {
    id: number;
    name: string;
    date: Date;
    url: string;
}

export interface FileParameter {
    data: any;
    fileName: string;
}