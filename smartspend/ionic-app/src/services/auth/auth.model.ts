export interface AuthModel {
    email: string;
    password: string;
}

export interface AuthenticatedUserModel {
    [x: string]: any;
    first_name: string;
    last_name: string;
    email: string;
}

export interface TokenObtainedModel{
    detail?: string
    refresh: string,
    access: string
}


export interface AuthenticationResponseModel {
    data: TokenObtainedModel;
    message: string;
}