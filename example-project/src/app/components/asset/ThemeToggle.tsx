import { Sun, Moon } from 'lucide-react';
import styled from '@emotion/styled';
import { useTheme } from '../../contexts/ThemeContext';

const ToggleButton = styled.button`
  padding: 10px;
  background: ${(props) => props.theme.color.backgroundSecondary};
  border: 1px solid ${(props) => props.theme.color.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  color: ${(props) => props.theme.color.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.color.backgroundTertiary};
    border-color: ${(props) => props.theme.color.borderHover};
  }
`;

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleButton onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </ToggleButton>
  );
}
