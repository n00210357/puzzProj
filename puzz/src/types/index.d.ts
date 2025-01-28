export interface CompanyType 
{
    _id: string;
    name: string;
    description: string;
    ceo_email: string;
    image_path: string | undefined;
}

export interface MineralType 
{
    _id: string;
    name: string;
    description: string;
    image_path: string | undefined;
}

export interface MineType 
{
    _id: string;
    name: string;
    latitude: string;
    longitude: string;
    manager_email: string;
    company_name: string;
    image_path: string | undefined;
}

export interface Work_hourType 
{
    _id: string;
    start: string;
    end: string;
    mine_id: string;
    worker_email: string;
}

export interface Mineral_mineType 
{
    _id: string;
    mine_id: string;
    mineral_id:string;
}

export interface WorkerType 
{
    _id: string;
    full_name: string;
    description: string;
    email: string;
    password: string;
    phone: string;
    image_path: string | undefined;
}

export interface IAuthContext 
{
    signIn: (token:string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}

export interface CompanyTypeID extends CompanyType {
    _id: string;
}

export interface MineralTypeID extends MineralType {
    _id: string;
}

export interface MineTypeID extends MineType {
    _id: string;
}

export interface Work_hourTypeID extends Work_hourType {
    _id: string;
}

export interface Mineral_mineTypeID extends Mineral_mineType {
    _id: string;
}

export type IResponseType = CompanyTypeID | MineralTypeID | MineTypeID | Work_hourTypeID | Mineral_mineTypeID