export interface CreateUserDto {
    email:string;
    password: string;
    userType:number,
    permissionLevel:number
    name:string
}