import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}
    async validateUserCredentials(email:string, password:string){
        const user = await this.userService.getUserByEmail(email)
        if(!user){
            throw new BadRequestException()
        }
        if(!( await bcrypt.compare(password,user.password))){
            throw new UnauthorizedException()
        }
        return user
    }
}
