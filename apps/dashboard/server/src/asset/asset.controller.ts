import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AssetService } from './asset.service';

@ApiTags('assets')
@Controller('assets')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Get()
  @ApiOperation({ summary: '보유 종목 목록 조회' })
  findAll() {
    return this.assetService.findAll();
  }

  @Get('summary')
  @ApiOperation({ summary: '총 자산 요약 조회' })
  getSummary() {
    return this.assetService.getSummary();
  }
}
