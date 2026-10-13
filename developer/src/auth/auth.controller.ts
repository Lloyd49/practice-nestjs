import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'เข้าสู่ระบบ' })
    @ApiOkResponse({ description: 'เข้าสู่ระบบสำเร็จ' })

    async login(
        @Body() loginDto: LoginDto,
        @Res({ passthrough: true }) response: Response) {
        const { access_token } = await this.authService.login(loginDto);

        response.cookie('access_token', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24, // 1 วัน
        });

        return { message: 'เข้าสู่ระบบสำเร็จ' };
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('access_token', { path: '/' });
        return { message: 'ออกจากระบบสำเร็จ' };
    }
}