import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as dotenv from "dotenv";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService, private readonly configService:ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_SECRET_KEY', 'placeholder'),
            ignoreExpiration: false,
        })
    }
    async validate(payload: any){
        return {
            id:payload.sub,
            name: payload.name
        }
    }
}