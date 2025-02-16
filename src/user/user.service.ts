import { Injectable } from '@nestjs/common';
import { UserRegisterRequestDto } from './dto/user-register.req.dto';
import { UserRepository } from './user.repository';
import { User } from './user.interface';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}
    async registerUser(userData: UserRegisterRequestDto) {
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(userData.password,salt)
        const user = <User>{
            username: userData.username,
            email: userData.email,
            password: password,
        }
        return await this.userRepository.registerUser(user)
    }

    async getUserByEmail(email:string){
        return await this.userRepository.getUserByEmail(email)
    }
}
