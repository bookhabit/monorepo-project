import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConsultationService } from './consultation.service';
import {
  Consultation,
  ConsultationCategory,
  ConsultationTemplate,
  CreateConsultationDto,
} from './consultation.types';

@ApiTags('consultations')
@Controller()
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @Get('customers/:customerId/consultations')
  @ApiOperation({ summary: '고객 상담 이력 조회' })
  @ApiResponse({ status: 200, description: '고객 상담 이력 반환', type: [Consultation] })
  getByCustomer(@Param('customerId') customerId: string) {
    return this.consultationService.getByCustomer(customerId);
  }

  @Get('templates')
  @ApiOperation({ summary: '상담 템플릿 조회 (카테고리 필터)' })
  @ApiResponse({ status: 200, description: '상담 템플릿 목록 반환', type: [ConsultationTemplate] })
  getTemplates(@Query('category') category?: ConsultationCategory) {
    return this.consultationService.getTemplates(category);
  }

  @Post('consultations')
  @ApiOperation({ summary: '상담 내용 저장' })
  @ApiResponse({ status: 201, description: '상담 저장 완료', type: Consultation })
  create(@Body() dto: CreateConsultationDto) {
    return this.consultationService.create(dto);
  }
}
