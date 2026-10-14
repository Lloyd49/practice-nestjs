import { UsersController } from './users.controller';

describe('UsersController', () => {
  it('delegates user creation to the service', () => {
    const usersService = {
      create: jest.fn().mockReturnValue({ id: 'user-1' }),
    };
    const controller = new UsersController(usersService as never);

    expect(
      controller.create({
        name: 'Jane',
        email: 'jane@example.com',
        password: 'password123',
      }),
    ).toEqual({
      id: 'user-1',
    });
    expect(usersService.create).toHaveBeenCalledWith({
      name: 'Jane',
      email: 'jane@example.com',
      password: 'password123',
    });
  });
});
