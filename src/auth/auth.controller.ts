import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './localAuth.guard';

@Controller('auth')
export class AuthController {

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req){
        return req.user;
    }
}
