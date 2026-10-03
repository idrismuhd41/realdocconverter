import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: string;      // user id
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.API_JWT_SECRET ?? 'dev-only-secret-change-me',
    });
  }

  async validate(payload: JwtPayload) {
    // Whatever we return here is attached to req.user
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}