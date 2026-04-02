import { Controller, Get, Query, Res, Sse } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { Response } from 'express';
import { ReportService } from './report.service';
import { ProductType, ReportData, ReportQueryDto } from './report.types';

@ApiTags('report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('products')
  @ApiOperation({ summary: '상품 목록 조회' })
  @ApiResponse({ status: 200, description: '상품 목록 반환', type: [ProductType] })
  getProducts() {
    return this.reportService.getProducts();
  }

  @Get()
  @ApiOperation({ summary: '리포트 데이터 조회 (KPI, 가입자 추이, 시스템 지표)' })
  @ApiResponse({ status: 200, description: '리포트 데이터 반환', type: ReportData })
  getReportData(@Query() query: ReportQueryDto) {
    return this.reportService.getReportData(query);
  }

  @Sse('metrics/stream')
  @ApiOperation({ summary: '실시간 시스템 지표 SSE 스트림 (2초 간격)' })
  @ApiResponse({ status: 200, description: 'SSE 스트림으로 시스템 지표 실시간 전송' })
  streamMetrics(): Observable<MessageEvent> {
    return this.reportService.getMetricsStream();
  }

  @Get('export/csv')
  @ApiOperation({ summary: 'CSV 내보내기' })
  @ApiResponse({ status: 200, description: '가입자 추이 CSV 파일 다운로드', content: { 'text/csv': {} } })
  exportCSV(@Query() query: ReportQueryDto, @Res() res: Response) {
    const csv = this.reportService.exportCSV(query);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="report.csv"');
    res.send(csv);
  }
}
