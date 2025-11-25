import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  private client = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: { host: 'localhost', port: 5002 }, // clinic-service port
  });

  getUsers(clinic: string, token: string) {
    const data = this.client.send('clinic_get_users', { clinic, token });
    // console.log(data);
    return data;
  }
}
