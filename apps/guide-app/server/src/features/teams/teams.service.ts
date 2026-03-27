import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JoinRequestStatus } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { ErrorCode } from '@mono/shared/api';
import { PrismaService } from '../../prisma/prisma.service';
import type { CreateTeamDto } from './dto/create-team.dto';
import type { SendJoinRequestDto } from './dto/send-join-request.dto';
import type { RespondJoinRequestDto } from './dto/respond-join-request.dto';

const TEAM_SELECT = {
  id: true,
  name: true,
  description: true,
  logoUrl: true,
  captainId: true,
  createdAt: true,
  _count: { select: { members: true } },
} as const;

@Injectable()
export class TeamsService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── 팀 생성 ────────────────────────────────────────────────────────────────

  async createTeam(captainId: string, dto: CreateTeamDto) {
    return this.prisma.$transaction(async (tx) => {
      let team;
      try {
        team = await tx.team.create({
          data: { ...dto, captainId },
          select: TEAM_SELECT,
        });
      } catch (e) {
        const isUniqueViolation = e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002';
        if (isUniqueViolation) {
          throw new ConflictException({ code: ErrorCode.NAME_ALREADY_EXISTS, message: '이미 사용 중인 팀 이름입니다.' });
        }
        throw e;
      }

      // 캡틴을 CAPTAIN 역할로 팀원 등록
      await tx.teamMember.create({
        data: { teamId: team.id, userId: captainId, role: 'CAPTAIN' },
      });

      return team;
    });
  }

  // ─── 팀 목록 조회 (검색) ────────────────────────────────────────────────────

  async findTeams(query?: string) {
    return this.prisma.team.findMany({
      where: query
        ? { name: { contains: query, mode: 'insensitive' } }
        : undefined,
      select: TEAM_SELECT,
      orderBy: { createdAt: 'desc' },
    });
  }

  // ─── 팀 단건 조회 ────────────────────────────────────────────────────────────

  async findTeamById(teamId: string) {
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
      select: {
        ...TEAM_SELECT,
        members: {
          select: {
            role: true,
            joinedAt: true,
            user: { select: { id: true, nickname: true, position: true, skillLevel: true } },
          },
        },
      },
    });
    if (!team) throw new NotFoundException({ code: ErrorCode.TEAM_NOT_FOUND, message: '팀을 찾을 수 없습니다.' });
    return team;
  }

  // ─── 내가 속한 팀 조회 ───────────────────────────────────────────────────────

  async findMyTeam(userId: string) {
    const member = await this.prisma.teamMember.findFirst({
      where: { userId },
      select: {
        role: true,
        team: {
          select: {
            ...TEAM_SELECT,
            members: {
              select: {
                role: true,
                joinedAt: true,
                user: { select: { id: true, nickname: true, position: true, skillLevel: true } },
              },
            },
          },
        },
      },
    });
    return member ?? null;
  }

  // ─── 가입 신청 ───────────────────────────────────────────────────────────────

  async sendJoinRequest(teamId: string, userId: string, dto: SendJoinRequestDto) {
    // 팀 존재 확인
    const team = await this.prisma.team.findUnique({ where: { id: teamId } });
    if (!team) throw new NotFoundException({ code: ErrorCode.TEAM_NOT_FOUND, message: '팀을 찾을 수 없습니다.' });

    // 이미 팀원인지 확인
    const isMember = await this.prisma.teamMember.findUnique({
      where: { teamId_userId: { teamId, userId } },
    });
    if (isMember) throw new ConflictException({ code: ErrorCode.ALREADY_MEMBER, message: '이미 팀에 소속되어 있습니다.' });

    // 중복 신청 확인
    const existing = await this.prisma.teamJoinRequest.findUnique({
      where: { teamId_userId: { teamId, userId } },
    });
    if (existing) {
      const isPendingRequest = existing.status === JoinRequestStatus.PENDING;
      if (isPendingRequest) {
        throw new ConflictException({ code: ErrorCode.JOIN_REQUEST_ALREADY_SENT, message: '이미 가입 신청 중입니다.' });
      }
      // REJECTED된 경우 재신청 허용 (기존 레코드 업데이트)
      return this.prisma.teamJoinRequest.update({
        where: { id: existing.id },
        data: { status: JoinRequestStatus.PENDING, message: dto.message },
        select: { id: true, teamId: true, userId: true, status: true, message: true, createdAt: true },
      });
    }

    return this.prisma.teamJoinRequest.create({
      data: { teamId, userId, message: dto.message },
      select: { id: true, teamId: true, userId: true, status: true, message: true, createdAt: true },
    });
  }

  // ─── 가입 신청 목록 조회 (캡틴 전용) ─────────────────────────────────────────

  async findJoinRequests(teamId: string, captainId: string) {
    const team = await this.prisma.team.findUnique({ where: { id: teamId } });
    if (!team) throw new NotFoundException({ code: ErrorCode.TEAM_NOT_FOUND, message: '팀을 찾을 수 없습니다.' });
    const isTeamCaptain = team.captainId === captainId;
    if (!isTeamCaptain) throw new ForbiddenException({ code: ErrorCode.NOT_CAPTAIN, message: '캡틴만 조회할 수 있습니다.' });

    return this.prisma.teamJoinRequest.findMany({
      where: { teamId, status: JoinRequestStatus.PENDING },
      select: {
        id: true,
        status: true,
        message: true,
        createdAt: true,
        user: { select: { id: true, nickname: true, position: true, skillLevel: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  // ─── 가입 신청 응답 (캡틴 전용) ──────────────────────────────────────────────

  async respondJoinRequest(teamId: string, requestId: string, captainId: string, dto: RespondJoinRequestDto) {
    const team = await this.prisma.team.findUnique({ where: { id: teamId } });
    if (!team) throw new NotFoundException({ code: ErrorCode.TEAM_NOT_FOUND, message: '팀을 찾을 수 없습니다.' });
    const isTeamCaptain = team.captainId === captainId;
    if (!isTeamCaptain) throw new ForbiddenException({ code: ErrorCode.NOT_CAPTAIN, message: '캡틴만 응답할 수 있습니다.' });

    const request = await this.prisma.teamJoinRequest.findUnique({ where: { id: requestId } });
    const isValidRequest = request !== null && request.teamId === teamId;
    if (!isValidRequest)
      throw new NotFoundException({ code: ErrorCode.JOIN_REQUEST_NOT_FOUND, message: '가입 신청을 찾을 수 없습니다.' });
    const isPendingRequest = request.status === JoinRequestStatus.PENDING;
    if (!isPendingRequest)
      throw new BadRequestException({ code: ErrorCode.JOIN_REQUEST_ALREADY_PROCESSED, message: '이미 처리된 신청입니다.' });

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.teamJoinRequest.update({
        where: { id: requestId },
        data: { status: dto.status },
        select: { id: true, status: true, updatedAt: true },
      });

      if (dto.status === JoinRequestStatus.ACCEPTED) {
        await tx.teamMember.create({
          data: { teamId, userId: request.userId, role: 'MEMBER' },
        });
      }

      return updated;
    });
  }

  // ─── 팀 탈퇴 ─────────────────────────────────────────────────────────────────

  async leaveTeam(teamId: string, userId: string) {
    const team = await this.prisma.team.findUnique({ where: { id: teamId } });
    if (!team) throw new NotFoundException({ code: ErrorCode.TEAM_NOT_FOUND, message: '팀을 찾을 수 없습니다.' });
    const isTeamCaptain = team.captainId === userId;
    if (isTeamCaptain)
      throw new BadRequestException({ code: ErrorCode.CAPTAIN_CANNOT_LEAVE, message: '캡틴은 팀을 탈퇴할 수 없습니다.' });

    const member = await this.prisma.teamMember.findUnique({
      where: { teamId_userId: { teamId, userId } },
    });
    if (!member) throw new NotFoundException({ code: ErrorCode.NOT_MEMBER, message: '팀원이 아닙니다.' });

    await this.prisma.teamMember.delete({ where: { teamId_userId: { teamId, userId } } });
  }
}
