import { ApiProperty } from '@nestjs/swagger';

export type NotificationType = 'price_alert' | 'execution' | 'news' | 'system';

export class NotificationMetadata {
  @ApiProperty({ required: false })
  stockSymbol?: string;

  @ApiProperty({ required: false })
  price?: number;

  @ApiProperty({ required: false })
  quantity?: number;

  @ApiProperty({ required: false })
  changeRate?: number;
}

export class Notification {
  @ApiProperty()
  id!: string;

  @ApiProperty({ enum: ['price_alert', 'execution', 'news', 'system'] })
  type!: NotificationType;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  message!: string;

  @ApiProperty()
  timestamp!: string;

  @ApiProperty()
  isRead!: boolean;

  @ApiProperty({ type: () => NotificationMetadata, required: false })
  metadata?: NotificationMetadata;
}

export class NotificationPage {
  @ApiProperty({ type: () => [Notification] })
  notifications!: Notification[];

  @ApiProperty({ nullable: true })
  nextCursor!: string | null;

  @ApiProperty()
  hasMore!: boolean;
}
