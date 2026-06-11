import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

type JwtPayload = {
  sub: string;
  email: string;
  papel: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const secretOrKey = configService.getOrThrow<string>('JWT_SECRET');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey,
      algorithms: ['HS256'],
    });
  }

  validate(payload: JwtPayload) {
    return {
      id: payload.sub,
      email: payload.email,
      papel: payload.papel,
    }
  }
}