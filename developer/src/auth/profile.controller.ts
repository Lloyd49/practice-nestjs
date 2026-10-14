import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './jwt-auth.guard';

type AuthenticatedRequest = Request & {
  user: { userId: string; email: string };
};

@ApiTags('profile')
@Controller()
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth('access_token')
  @ApiOperation({ summary: 'Get the current user profile' })
  @ApiOkResponse({ description: 'Current user profile' })
  getProfile(@Req() request: AuthenticatedRequest) {
    return this.usersService.findProfileById(request.user.userId);
  }
}
