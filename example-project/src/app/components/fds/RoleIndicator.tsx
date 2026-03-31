import styled from '@emotion/styled';
import { Shield, User, Crown } from 'lucide-react';
import { UserRole } from '../../types/fds';

const Container = styled.div<{ role: UserRole }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid;
  
  ${props => {
    switch (props.role) {
      case 'admin':
        return `
          background: rgba(139, 92, 246, 0.2);
          border-color: rgba(139, 92, 246, 0.5);
          color: #c4b5fd;
        `;
      case 'security_manager':
        return `
          background: rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.5);
          color: #93c5fd;
        `;
      default:
        return `
          background: rgba(100, 116, 139, 0.2);
          border-color: rgba(100, 116, 139, 0.5);
          color: #94a3b8;
        `;
    }
  }}
`;

const PermissionList = styled.div`
  font-size: 11px;
  color: #64748b;
  margin-left: 8px;
`;

interface RoleIndicatorProps {
  role: UserRole;
  showPermissions?: boolean;
}

export function RoleIndicator({ role, showPermissions = false }: RoleIndicatorProps) {
  const getRoleInfo = () => {
    switch (role) {
      case 'admin':
        return { 
          icon: Crown, 
          label: '관리자', 
          permissions: '모든 권한'
        };
      case 'security_manager':
        return { 
          icon: Shield, 
          label: '보안 팀장', 
          permissions: '조회 · 차단 · 차단 해제'
        };
      default:
        return { 
          icon: User, 
          label: '일반 모니터링 요원', 
          permissions: '조회 · 차단만 가능'
        };
    }
  };

  const { icon: Icon, label, permissions } = getRoleInfo();

  return (
    <Container role={role}>
      <Icon size={16} />
      {label}
      {showPermissions && (
        <PermissionList>({permissions})</PermissionList>
      )}
    </Container>
  );
}
