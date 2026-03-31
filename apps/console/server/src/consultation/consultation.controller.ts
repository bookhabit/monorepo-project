import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConsultationService } from './consultation.service';
import { ConsultationCategory, CreateConsultationDto } from './consultation.types';

@ApiTags('consultations')
@Controller()
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @Get('customers/:customerId/consultations')
  @ApiOperation({ summary: '고객 상담 이력 조회' })
  getByCustomer(@Param('customerId') customerId: string) {
    return this.consultationService.getByCustomer(customerId);
  }

  @Get('templates')
  @ApiOperation({ summary: '상담 템플릿 조회 (카테고리 필터)' })
  getTemplates(@Query('category') category?: ConsultationCategory) {
    return this.consultationService.getTemplates(category);
  }

  @Post('consultations')
  @ApiOperation({ summary: '상담 내용 저장' })
  create(@Body() dto: CreateConsultationDto) {
    return this.consultationService.create(dto);
  }
}
