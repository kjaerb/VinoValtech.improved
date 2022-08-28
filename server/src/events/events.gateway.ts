import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  ConnectedSocket,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomEntity } from '../interface/RoomEntity';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

const HOUR = 60 * 60 * 1000;

@WebSocketGateway({
  cors: {
    origin: function (origin, callback) {
      if (
        origin === process.env.FRONTEND_URL ||
        process.env.NODE_ENV !== 'production'
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  },
})
@Injectable()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  roomService: InMemoryDBService<RoomEntity> =
    new InMemoryDBService<RoomEntity>({ featureName: 'rooms' });
  private readonly logger = new Logger(EventsGateway.name);

  @Cron('*/5 * * * *')
  handleCron(): void {
    this.logger.debug('Running cleanup cron');
    const time = new Date();
    const rooms = this.roomService.query((room) => {
      return room.createdAt.getTime() + HOUR < time.getTime();
    });
    if (rooms.length > 0) {
      this.logger.debug(
        'Deleting rooms',
        rooms.map((room) => room.id),
      );
      this.roomService.deleteMany(rooms.map((room) => room.id));
      rooms.forEach((room) => {
        room.users.forEach((user) => {
          this.server.to(user.id).emit('expire', {
            event: 'expire',
            data: room,
          });
        });
      });
    }
  }

  broadcastRoomUpdate = (updatedRoom: RoomEntity) => {
    updatedRoom.users.forEach((user) => this.emitUpdate(user.id, updatedRoom));
  };

  emitUpdate = (userId: string, updatedRoom: RoomEntity) => {
    this.server.to(userId).emit('updated', {
      event: 'updated',
      data: updatedRoom,
    });
  };

  findRoom = (hash) => {
    const matchingRooms = this.roomService.query(
      (record) => record.hash === hash,
    );
    return matchingRooms[0] || null;
  };

  join = (client, { id }) => {
    const room = this.findRoom(id);
    let updatedRoom = null;

    if (room) {
      updatedRoom = {
        ...room,
        users: [...room.users, client.id],
      };
      this.roomService.update(updatedRoom);
    } else {
      updatedRoom = this.roomService.create({
        owner: client.id,
        users: [{ id: client.id }],
        hash: id,
        createdAt: new Date(),
      });
    }
    this.broadcastRoomUpdate(updatedRoom);
  };

  // vote = (client, { id, option }) => {
  //   const room = this.findRoom(id);
  //   if (room) {
  //     const updatedRoom = {
  //       ...room,
  //       status: 'updated',
  //       selectedOptions: [
  //         ...room.selectedOptions.filter((option) => option.id !== client.id),
  //         {
  //           id: client.id,
  //           value: option,
  //         },
  //       ],
  //       membersInfo: room.membersInfo.map((member) => {
  //         if (member.clientId === client.id) {
  //           return {
  //             ...member,
  //             voted: true,
  //           };
  //         }
  //         return member;
  //       }),
  //     };
  //     this.roomService.update(updatedRoom);
  //     this.broadcastRoomUpdate(updatedRoom);
  //   }
  // };

  // reveal = (client, { id }) => {
  //   const room = this.findRoom(id);
  //   if (room && room.owner === client.id) {
  //     const updatedRoom = {
  //       ...room,
  //       status: 'updated',
  //       revealed: !room.revealed,
  //     };
  //     this.roomService.update(updatedRoom);
  //     this.broadcastRoomUpdate(updatedRoom);
  //   }
  // };

  // changeOption = (client, { id, option }) => {
  //   const room = this.findRoom(id);
  //   if (room && room.owner === client.id) {
  //     const updatedRoom = {
  //       ...room,
  //       status: 'updated',
  //       options: optionPacks[option] || optionPacks[0],
  //     };
  //     this.roomService.update(updatedRoom);
  //     this.broadcastRoomUpdate(updatedRoom);
  //   }
  // };

  updateName = (client, { id, name, roomId }) => {
    const room = this.findRoom(id);
    if (room) {
      const updatedRoom = {
        ...room,
        users: [
          ...room.users,
          {
            id: client.id,
            name: name,
            room: roomId,
          },
        ],
      };
      this.roomService.update(updatedRoom);
      this.server.to(client.id).emit('joined', {
        event: 'joined',
        data: { name },
      });
      this.broadcastRoomUpdate(updatedRoom);
    }
  };

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    const matchingRooms = this.roomService.query((record) =>
      record.users.includes(client.id),
    );
    const room = matchingRooms[0] || null;
    if (room) {
      if (room.owner === client.id) {
        room.users.forEach((user) => {
          this.server.to(user.id).emit('expire', {
            event: 'expire',
            data: room,
          });
        });
        this.roomService.delete(room.id);
      } else {
        console.log(room);
        const updatedRoom = {
          ...room,
          users: room.users.filter((user) => user.id !== client.id),
        };
        console.log(updatedRoom);
        this.roomService.update(updatedRoom);
        this.broadcastRoomUpdate(updatedRoom);
      }
    }
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('events')
  findAll(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): WsResponse<string> {
    switch (data.type) {
      case 'join':
        this.join(client, data.payload);
        break;
      // case 'vote':
      //   this.vote(client, data.payload);
      //   break;
      // case 'reset':
      //   this.resetPool(client, data.payload);
      //   break;
      // case 'reveal':
      //   this.reveal(client, data.payload);
      //   break;
      // case 'options':
      //   this.changeOption(client, data.payload);
      //   break;
      case 'update_name':
        this.updateName(client, data.payload);
        break;
    }
    return { event: 'error', data: 'unknown type' };
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
