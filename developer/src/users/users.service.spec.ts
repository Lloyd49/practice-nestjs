import { ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';

describe('UsersService', () => {
  it('creates a user without returning the password', async () => {
    const model = Object.assign(
      jest.fn().mockImplementation((data) => ({
        ...data,
        _id: 'user-1',
        save: jest.fn().mockResolvedValue(undefined),
      })),
      { findOne: jest.fn().mockResolvedValue(null) },
    );
    const service = new UsersService(model as never);

    await expect(
      service.create({
        name: 'Jane',
        email: 'jane@example.com',
        password: 'password123',
      }),
    ).resolves.toEqual({
      id: 'user-1',
      name: 'Jane',
      email: 'jane@example.com',
    });
  });

  it('rejects a duplicate email with HTTP 409 semantics', async () => {
    const model = Object.assign(jest.fn(), {
      findOne: jest.fn().mockResolvedValue({}),
    });
    const service = new UsersService(model as never);

    await expect(
      service.create({
        name: 'Jane',
        email: 'jane@example.com',
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
