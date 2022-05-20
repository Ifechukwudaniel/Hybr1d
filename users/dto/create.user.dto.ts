import { UserType } from "../../common/middleware/common.user.types.enum";

export interface CreateUserDto {
    email:string;
    password: string;
    userType:UserType
    name:string
}