import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserRegisterRequestDto } from './dto/user-register.req.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}
    @Post('/register')
    async registerUser(@Body(new ValidationPipe) userData: UserRegisterRequestDto){
        return await this.userService.registerUser(userData)
    }
}
