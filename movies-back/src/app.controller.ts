import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { RegisterResponse, Creds } from './auth/creds.dto';

@Controller('/api')
export class AppController {
  constructor(private authService: AuthService) {}

  @Get()
  getHello(): string {
    return 'Hello';
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() creds: Creds): Promise<RegisterResponse> {
    return { success: true };
  }
}
