export interface UserType 
{
    _id: string;
    rank: string;
    username: string;
    email: string;
    password: string;
    about: string;
    image_path: string | undefined;
}

export interface IAuthContext 
{
    signIn: (token:string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
    isIdLoad: boolean;
    id?: string | null;
}

export interface tokId {
    _id: string;
    token: string;
}

export interface UserTypeID extends UserType {
    _id: string;
}

export type IResponseType = UserTypeID