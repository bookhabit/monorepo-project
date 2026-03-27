import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MatchStatus } from '@prisma/client';
import { ErrorCode } from '../../common/constants/error-codes';
import { PrismaService } from '../../prisma/prisma.service';
import type { CreateMatchDto } from './dto/create-match.dto';

const MATCH_SELECT = {
  id: true,
  matchDate: true,
  location: true,
  status: true,
  note: true,
  createdAt: true,
  homeTeam: { select: { id: true, name: true, logoUrl: true } },
  awayTeam: { select: { id: true, name: true, logoUrl: true } },
} as const;

@Injectable()
export class MatchesService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── 경기 생성 (캡틴 전용) ───────────────────────────────────────────────────

  async createMatch(captainId: string, dto: CreateMatchDto) {
    // 캡틴이 속한 팀 확인
    const team = await this.prisma.team.findFirst({ where: { captainId } });
    if (!team) throw new BadRequestException({ code: ErrorCode.NOT_CAPTAIN, message: '팀 캡틴만 경기를 등록할 수 있습니다.' });

    return this.prisma.match.create({
      data: {
        homeTeamId: team.id,
        matchDate: new Date(dto.matchDate),
        location: dto.location,
        note: dto.note,
      },
      select: MATCH_SELECT,
    });
  }

  // ─── 경기 목록 조회 (OPEN 상태) ──────────────────────────────────────────────

  async findOpenMatches() {
    return this.prisma.match.findMany({
      where: { status: MatchStatus.OPEN },
      select: MATCH_SELECT,
      orderBy: { matchDate: 'asc' },
    });
  }

  // ─── 내 팀 경기 목록 ─────────────────────────────────────────────────────────

  async findMyTeamMatches(userId: string) {
    const member = await this.prisma.teamMember.findFirst({ where: { userId } });
    if (!member) return [];

    return this.prisma.match.findMany({
      where: {
        OR: [{ homeTeamId: member.teamId }, { awayTeamId: member.teamId }],
      },
      select: MATCH_SELECT,
      orderBy: { matchDate: 'asc' },
    });
  }

  // ─── 경기 단건 조회 ──────────────────────────────────────────────────────────

  async findMatchById(matchId: string) {
    const match = await this.prisma.match.findUnique({
      where: { id: matchId },
      select: MATCH_SELECT,
    });
    if (!match) throw new NotFoundException({ code: ErrorCode.MATCH_NOT_FOUND, message: '경기를 찾을 수 없습니다.' });
    return match;
  }

  // ─── 경기 신청 (상대팀 캡틴 전용) ────────────────────────────────────────────

  async applyMatch(matchId: string, captainId: string) {
    const match = await this.prisma.match.findUnique({ where: { id: matchId } });
    if (!match) throw new NotFoundException({ code: ErrorCode.MATCH_NOT_FOUND, message: '경기를 찾을 수 없습니다.' });
    const isMatchOpen = match.status === MatchStatus.OPEN;
    if (!isMatchOpen)
      throw new BadRequestException({ code: ErrorCode.MATCH_NOT_OPEN, message: '신청 가능한 경기가 아닙니다.' });

    const awayTeam = await this.prisma.team.findFirst({ where: { captainId } });
    const isCaptain = awayTeam !== null;
    if (!isCaptain) throw new BadRequestException({ code: ErrorCode.NOT_CAPTAIN, message: '팀 캡틴만 경기를 신청할 수 있습니다.' });
    const isSameTeam = awayTeam.id === match.homeTeamId;
    if (isSameTeam)
      throw new BadRequestException({ code: ErrorCode.SAME_TEAM, message: '자신의 팀과 경기를 신청할 수 없습니다.' });

    return this.prisma.match.update({
      where: { id: matchId },
      data: { awayTeamId: awayTeam.id, status: MatchStatus.MATCHED },
      select: MATCH_SELECT,
    });
  }

  // ─── 경기 취소 (홈팀 캡틴 전용) ──────────────────────────────────────────────

  async cancelMatch(matchId: string, captainId: string) {
    const match = await this.prisma.match.findUnique({ where: { id: matchId } });
    if (!match) throw new NotFoundException({ code: ErrorCode.MATCH_NOT_FOUND, message: '경기를 찾을 수 없습니다.' });

    const homeTeam = await this.prisma.team.findFirst({ where: { captainId } });
    const isHomeCaptain = homeTeam !== null && homeTeam.id === match.homeTeamId;
    if (!isHomeCaptain)
      throw new ForbiddenException({ code: ErrorCode.NOT_HOME_CAPTAIN, message: '홈팀 캡틴만 취소할 수 있습니다.' });

    const isMatchFinalized = match.status === MatchStatus.COMPLETED || match.status === MatchStatus.CANCELLED;
    if (isMatchFinalized)
      throw new BadRequestException({ code: ErrorCode.MATCH_ALREADY_FINALIZED, message: '이미 종료된 경기입니다.' });

    return this.prisma.match.update({
      where: { id: matchId },
      data: { status: MatchStatus.CANCELLED },
      select: MATCH_SELECT,
    });
  }
}
