import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../../common/guards/jwt-auth.guard';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { SendJoinRequestDto } from './dto/send-join-request.dto';
import { RespondJoinRequestDto } from './dto/respond-join-request.dto';

@Controller('api/v1/teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  /** 팀 생성 */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTeam(@CurrentUser() user: JwtPayload, @Body() dto: CreateTeamDto) {
    return this.teamsService.createTeam(user.sub, dto);
  }

  /** 팀 목록 조회 / 검색 */
  @Get()
  async findTeams(@Query('q') query?: string) {
    return this.teamsService.findTeams(query);
  }

  /** 내 팀 조회 */
  @Get('me')
  async getMyTeam(@CurrentUser() user: JwtPayload) {
    return this.teamsService.findMyTeam(user.sub);
  }

  /** 팀 단건 조회 */
  @Get(':teamId')
  async findTeam(@Param('teamId') teamId: string) {
    return this.teamsService.findTeamById(teamId);
  }

  /** 가입 신청 */
  @Post(':teamId/join-requests')
  @HttpCode(HttpStatus.CREATED)
  async sendJoinRequest(
    @Param('teamId') teamId: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: SendJoinRequestDto,
  ) {
    return this.teamsService.sendJoinRequest(teamId, user.sub, dto);
  }

  /** 가입 신청 목록 조회 (캡틴) */
  @Get(':teamId/join-requests')
  async findJoinRequests(@Param('teamId') teamId: string, @CurrentUser() user: JwtPayload) {
    return this.teamsService.findJoinRequests(teamId, user.sub);
  }

  /** 가입 신청 응답 (캡틴) */
  @Patch(':teamId/join-requests/:requestId')
  async respondJoinRequest(
    @Param('teamId') teamId: string,
    @Param('requestId') requestId: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: RespondJoinRequestDto,
  ) {
    return this.teamsService.respondJoinRequest(teamId, requestId, user.sub, dto);
  }

  /** 팀 탈퇴 */
  @Delete(':teamId/members/me')
  @HttpCode(HttpStatus.NO_CONTENT)
  async leaveTeam(@Param('teamId') teamId: string, @CurrentUser() user: JwtPayload) {
    return this.teamsService.leaveTeam(teamId, user.sub);
  }
}
