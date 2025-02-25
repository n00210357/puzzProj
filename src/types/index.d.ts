//the user type
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

//the auth context
export interface IAuthContext 
{
    signIn: (token:string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
    isIdLoad: boolean;
    id?: string | null;
}

//the token and id
export interface tokId {
    _id: string;
    token: string;
}

//the user id
export interface UserTypeID extends UserType {
    _id: string;
}

export type IResponseType = UserTypeID