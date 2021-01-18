import { AppGateway } from './app.gateway';

describe('AppGateway', () => {
  let gateway: AppGateway;
  const mockServer = {
    emit: jest.fn(),
  };
  const mockClient: any = {
    id: 1,
  };

  beforeEach(async () => {
    gateway = new AppGateway();
    gateway['server'] = mockServer;
  });

  describe('Method handleConnection', () => {
    it('gateway connections must be increased', async () => {
      const spyEmit = jest.spyOn(gateway['server'], 'emit');

      await gateway.handleConnection(mockClient);
      expect(spyEmit).toHaveBeenCalledWith('history', gateway['messages']);
      expect(gateway['connections']).toEqual(1);
    });
  });

  describe('Method handleDisconnection', () => {
    it('gateway connections must be decreased', async () => {
      const spyEmit = jest.spyOn(gateway['server'], 'emit');

      await gateway.handleDisconnect(mockClient);
      expect(spyEmit).toHaveBeenCalledWith(
        'users',
        Array.from(gateway['users']),
      );
      expect(gateway['connections']).toEqual(-1);
    });
  });
});
