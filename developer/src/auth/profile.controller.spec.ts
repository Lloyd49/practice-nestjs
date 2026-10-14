import { ProfileController } from './profile.controller';

describe('ProfileController', () => {
  it('returns the profile of the authenticated user', async () => {
    const usersService = {
      findProfileById: jest.fn().mockResolvedValue({
        id: 'user-1',
        name: 'Jane',
        email: 'jane@example.com',
      }),
    };
    const controller = new ProfileController(usersService as never);

    await expect(
      controller.getProfile({ user: { userId: 'user-1', email: 'jane@example.com' } } as never),
    ).resolves.toEqual({ id: 'user-1', name: 'Jane', email: 'jane@example.com' });
    expect(usersService.findProfileById).toHaveBeenCalledWith('user-1');
  });
});
