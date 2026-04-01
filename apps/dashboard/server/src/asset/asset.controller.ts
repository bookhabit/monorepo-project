import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssetService } from './asset.service';

@ApiTags('assets')
@Controller('assets')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Get()
  @ApiOperation({ summary: '보유 종목 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '보유 종목 목록',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          symbol: { type: 'string' },
          name: { type: 'string' },
          quantity: { type: 'number' },
          avgPrice: { type: 'number' },
          currentPrice: { type: 'number' },
          value: { type: 'number' },
          profit: { type: 'number' },
          profitRate: { type: 'number' },
          weight: { type: 'number' },
        },
      },
    },
  })
  findAll() {
    return this.assetService.findAll();
  }

  @Get('summary')
  @ApiOperation({ summary: '총 자산 요약 조회' })
  @ApiResponse({
    status: 200,
    description: '총 자산 요약',
    schema: {
      type: 'object',
      properties: {
        totalValue: { type: 'number' },
        totalProfit: { type: 'number' },
        totalProfitRate: { type: 'number' },
        cash: { type: 'number' },
        stockValue: { type: 'number' },
      },
    },
  })
  getSummary() {
    return this.assetService.getSummary();
  }
}
