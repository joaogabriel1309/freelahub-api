import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.getOrThrow<string>('JWT_SECRET');
        const expiresIn = configService.get<StringValue>('JWT_EXPIRES_IN') ?? '1d';
        return {
          secret,
          signOptions: {
            expiresIn,
            algorithm: 'HS256',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }