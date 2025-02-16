import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { LocalAuthGuard } from './localAuth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwtAuth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req){
        console.log(req.user)
        return this.authService.generateToken(req.user);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('user')
    async getUser(@Request() req){
        return req.user;
    }
}
