import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  private client = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: { host: 'localhost', port: 5001 },
  });

  login(data) {
    return this.client.send('auth_login', data);
  }
}
