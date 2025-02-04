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
}

export interface UserTypeID extends UserType {
    _id: string;
}

export type IResponseType = UserTypeID