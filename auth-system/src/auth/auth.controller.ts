import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, ForgotPasswordDto, ResetPasswordDto, VerifyEmailDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('verify-email')
  async verifyEmail(@Query() verifyEmailDto: VerifyEmailDto) {
    return this.authService.verifyEmail(verifyEmailDto.token);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    // This route will redirect to Google OAuth
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@GetUser() user: User) {
    return this.authService.login({ email: user.email, password: '' });
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@GetUser() user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}