import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './jwt.strategy';

dotenv.config();

@Module({
  imports: [UserModule, JwtModule.register({
    secret: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: '1h' },
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
