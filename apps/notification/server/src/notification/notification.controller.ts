import {
  Controller,
  Delete,
  Get,
  HttpCode,
  MessageEvent,
  Param,
  Patch,
  Query,
  Res,
  Sse,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { NotificationService } from './notification.service';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Sse('stream')
  @ApiOperation({ summary: '실시간 알림 SSE 스트림 (5~15초 주기)' })
  stream(@Res() res: Response): Observable<MessageEvent> {
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Accel-Buffering', 'no');

    return this.notificationService.getStream().pipe(
      map((notification) => ({ data: notification }) as MessageEvent),
    );
  }

  @Get()
  @ApiOperation({ summary: '알림 목록 조회 (커서 기반 페이지네이션, 10개씩)' })
  @ApiQuery({ name: 'cursor', required: false, description: '다음 페이지 커서' })
  findPage(@Query('cursor') cursor?: string) {
    return this.notificationService.findPage(cursor ?? null);
  }

  @Patch(':id/read')
  @HttpCode(200)
  @ApiOperation({ summary: '알림 읽음 처리 (5% 랜덤 실패)' })
  markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(id);
  }

  @Patch('read-all')
  @HttpCode(200)
  @ApiOperation({ summary: '전체 알림 읽음 처리 (5% 랜덤 실패)' })
  markAllAsRead() {
    this.notificationService.markAllAsRead();
    return { message: '전체 읽음 처리되었습니다.' };
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: '알림 삭제 (5% 랜덤 실패)' })
  remove(@Param('id') id: string) {
    this.notificationService.remove(id);
    return { message: '삭제되었습니다.' };
  }
}
