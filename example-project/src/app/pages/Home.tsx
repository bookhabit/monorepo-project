import { Link } from 'react-router';
import styled from '@emotion/styled';
import { motion } from 'motion/react';
import {
  Activity,
  PieChart,
  ClipboardList,
  Bell,
  Shield,
  AlertTriangle,
  Headphones,
  BarChart3,
  ArrowRight,
  Palette,
} from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #0f172a, #1e293b);
  padding: 48px 24px;
`;

const Header = styled.header`
  max-width: 1200px;
  margin: 0 auto 48px;
  text-align: center;
`;

const DesignSystemBanner = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border-radius: 16px;
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 32px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(59, 130, 246, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 900;
  color: #f9fafb;
  margin: 0 0 16px 0;
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #9ca3af;
  margin: 0;
`;

const Grid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 24px;
`;

const ProjectCard = styled(Link)`
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #374151;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    border-color: #3b82f6;
    box-shadow: 0 12px 24px rgba(59, 130, 246, 0.2);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(to right, #3b82f6, #8b5cf6);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const IconWrapper = styled.div<{ color: string }>`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const ProjectTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #f9fafb;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProjectDescription = styled.p`
  font-size: 14px;
  color: #9ca3af;
  margin: 0 0 16px 0;
  line-height: 1.6;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  padding: 4px 10px;
  background: #374151;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Motion components
const MotionHeader = motion.create(Header);
const MotionDesignSystemBanner = motion.create(DesignSystemBanner);
const MotionProjectCard = motion.create(ProjectCard);

interface Project {
  id: number;
  title: string;
  description: string;
  icon: any;
  iconColor: string;
  path: string;
  status: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: '실시간 시세 호가창 & 미니 주문 보드',
    description: 'WebSocket Mock 스트리밍과 Emotion 동적 렌더링을 활용한 고성능 시세 보드',
    icon: Activity,
    iconColor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    path: '/orderbook',
    status: 'completed',
  },
  {
    id: 2,
    title: '인터랙티브 보유 자산 분석 대시보드',
    description: 'Emotion + React-Query 기반 고성능 데스크탑 대시보드',
    icon: PieChart,
    iconColor: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    path: '/asset-dashboard',
    status: 'completed',
  },
  {
    id: 3,
    title: '선언적 Funnel 기반 주식 계좌 개설 워크플로우',
    description: 'Jotai + Storage 데이터 퍼시스턴스 및 ErrorBoundary 선언적 에러 처리',
    icon: ClipboardList,
    iconColor: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    path: '/account-opening',
    status: 'completed',
  },
  {
    id: 4,
    title: '실시간 알림 센터',
    description: 'SSE + React-Query 무한 스크롤 및 낙관적 업데이트 기반 알림 시스템',
    icon: Bell,
    iconColor: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    path: '/notification-center',
    status: 'completed',
  },
  {
    id: 5,
    title: '대규모 대출 심사 승인 대시보드',
    description: 'URL 필터링 + Zustand + 가상화 + RBAC 권한 제어 기반 Admin 대시보드',
    icon: Shield,
    iconColor: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    path: '/loan-approval',
    status: 'completed',
  },
  {
    id: 6,
    title: '실시간 이상 거래 탐지(FDS) 리포트 시스템',
    description: '실시간 스트리밍 + 가상화 + 복합 필터링 + RBAC 기반 이상 거래 모니터링',
    icon: AlertTriangle,
    iconColor: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    path: '/fds-report',
    status: 'completed',
  },
  {
    id: 7,
    title: '고객 상담 통합 콘솔',
    description: '상담사 전용 고객 정보 조회 및 상담 이력 관리 통합 시스템',
    icon: Headphones,
    iconColor: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
    path: '/cs-console',
    status: 'completed',
  },
  {
    id: 8,
    title: '은행 상품 운영 통합 리포트 및 성능 관제 대시보드',
    description: '전사 상품 성과 지표 및 시스템 성능 모니터링 관제 센터',
    icon: BarChart3,
    iconColor: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
    path: '/performance-dashboard',
    status: 'completed',
  },
];

export function Home() {
  return (
    <Container>
      <MotionHeader
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <MotionDesignSystemBanner 
          to="/design-system"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Palette size={20} />
          디자인 시스템
        </MotionDesignSystemBanner>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Title>금융 서비스 UI/UX 프로젝트</Title>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Subtitle>
            React + TypeScript 기반 고성능 금융 애플리케이션 포트폴리오
          </Subtitle>
        </motion.div>
      </MotionHeader>

      <Grid>
        {projects.map((project, index) => {
          const Icon = project.icon;
          return (
            <MotionProjectCard 
              key={project.id} 
              to={project.path}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.5 + (index * 0.1),
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.6 + (index * 0.1)
                }}
              >
                <IconWrapper color={project.iconColor}>
                  <Icon size={28} color="white" strokeWidth={2.5} />
                </IconWrapper>
              </motion.div>
              <ProjectTitle>
                {project.title}
                <motion.div
                  initial={{ x: -5, opacity: 0 }}
                  animate={{ x: 0, opacity: 0.5 }}
                  transition={{ delay: 0.7 + (index * 0.1) }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <ProjectTags>
                {project.status === 'completed' && <Tag>Completed</Tag>}
                {project.status === 'placeholder' && <Tag>Placeholder</Tag>}
              </ProjectTags>
            </MotionProjectCard>
          );
        })}
      </Grid>
    </Container>
  );
}