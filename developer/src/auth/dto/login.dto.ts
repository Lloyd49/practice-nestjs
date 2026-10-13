import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        example: 'arthit@example.com',
        description: 'อีเมลผู้ใช้',
    })
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @ApiProperty({
        example: 'password123',
        description: 'รหัสผ่านของผู้ใช้',
    })
    @IsString()
    @MinLength(8, { message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร' })
    @IsNotEmpty()
    password!: string;
}

