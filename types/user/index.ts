export enum RolesEnum {
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER"
}

export interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    email: string;
    role: RolesEnum
    password: string;
    created_at: Date;
    updated_at: Date;
    access_token?: string;
    refresh_token?: string;
}

export interface SignInData {
    data: UserData
}

export interface GetMeData {
    data: Omit<UserData, 'access_token' | 'refresh_token'>
}