import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { PerformanceService } from './performance.service';

class PeriodQuery {
  @ApiProperty({ enum: ['1D', '1W', '1M'], description: '조회 기간' })
  @IsEnum(['1D', '1W', '1M'])
  period!: '1D' | '1W' | '1M';
}

@ApiTags('performance')
@Controller('performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @Get()
  @ApiOperation({ summary: '기간별 수익률 데이터 조회' })
  @ApiQuery({ name: 'period', enum: ['1D', '1W', '1M'], description: '조회 기간' })
  @ApiResponse({
    status: 200,
    description: '기간별 수익률 데이터',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          date: { type: 'string' },
          value: { type: 'number' },
          profit: { type: 'number' },
        },
      },
    },
  })
  getByPeriod(@Query() query: PeriodQuery) {
    return this.performanceService.getByPeriod(query.period);
  }
}
