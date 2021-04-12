import User from 'models/users.model';

describe('Listing Model', () => {
  it('can create a listing', async () => {
    const sampleUser = {
      email: 'sample_9934@gma.com',
      password: 'j343',
    };
    const user = await User.create(sampleUser);

    expect(user.email).toEqual(sampleUser.email);
  });
});
