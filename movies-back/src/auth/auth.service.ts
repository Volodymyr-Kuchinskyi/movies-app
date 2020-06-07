import { Injectable } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

import { UserPayload, AuthResponse } from './creds.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(login);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserPayload): Promise<AuthResponse> {
    const payload = { username: user.username, sub: user.userId };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
