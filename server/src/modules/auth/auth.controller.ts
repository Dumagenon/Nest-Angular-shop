import {
  Controller,
  Body,
  Post,
  UseGuards,
  Request,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomerDto } from '../customers/dto/customer.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('signup')
  async signUp(@Body() user: CustomerDto) {
    return await this.authService.create(user);
  }

  @Post('facebook')
  async facebookLogin(@Body() user): Promise<any> {
    return this.authService.findOrCreate(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('verify')
  async verifyAuth() {
    return HttpStatus.OK;
  }
}
