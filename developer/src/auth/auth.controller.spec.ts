import { AuthController } from './auth.controller';

describe('AuthController', () => {
  it('stores a successful login token in an HttpOnly cookie', async () => {
    const controller = new AuthController({
      login: jest.fn().mockResolvedValue({ access_token: 'token' }),
    } as never);
    const response = { cookie: jest.fn() };

    await expect(
      controller.login(
        { email: 'jane@example.com', password: 'password123' },
        response as never,
      ),
    ).resolves.toEqual({ message: 'เข้าสู่ระบบสำเร็จ' });
    expect(response.cookie).toHaveBeenCalledWith(
      'access_token',
      'token',
      expect.objectContaining({ httpOnly: true, sameSite: 'strict' }),
    );
  });
});
