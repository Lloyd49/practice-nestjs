import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  it('returns an access token for valid credentials', async () => {
    const password = 'password123';
    const usersService = {
      findByEmailWithPassword: jest.fn().mockResolvedValue({
        _id: { toString: () => 'user-1' },
        email: 'jane@example.com',
        password: await bcrypt.hash(password, 4),
      }),
    };
    const jwtService = { sign: jest.fn().mockReturnValue('signed-token') };
    const service = new AuthService(usersService as never, jwtService as never);

    await expect(
      service.login({ email: 'jane@example.com', password }),
    ).resolves.toEqual({
      access_token: 'signed-token',
    });
    expect(jwtService.sign).toHaveBeenCalledWith({
      sub: 'user-1',
      email: 'jane@example.com',
    });
  });

  it('rejects an unknown email with HTTP 401 semantics', async () => {
    const service = new AuthService(
      { findByEmailWithPassword: jest.fn().mockResolvedValue(null) } as never,
      { sign: jest.fn() } as never,
    );

    await expect(
      service.login({ email: 'missing@example.com', password: 'password123' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
