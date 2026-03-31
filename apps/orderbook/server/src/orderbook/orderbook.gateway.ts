import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OrderbookService } from './orderbook.service';

@WebSocketGateway({
  cors: { origin: 'http://localhost:3002', credentials: true },
})
export class OrderbookGateway implements OnModuleInit, OnModuleDestroy {
  @WebSocketServer()
  private server!: Server;

  private intervalId: NodeJS.Timeout | null = null;

  constructor(private readonly orderbookService: OrderbookService) {}

  onModuleInit() {
    this.intervalId = setInterval(() => {
      this.server.emit('orderbook', this.orderbookService.generate());
    }, 500);
  }

  onModuleDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
