/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { colors } from '@mono/ui';
import { typography } from '@mono/ui';
import { spacing } from '@mono/ui';

const sidebarStyle = css`
  width: 240px;
  min-width: 240px;
  height: 100vh;
  position: sticky;
  top: 0;
  background-color: ${colors.grey900};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const logoStyle = css`
  padding: ${spacing[5]} ${spacing[5]} ${spacing[4]};
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const logoTitleStyle = css`
  ${typography.heading3};
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.3px;
`;

const logoSubtitleStyle = css`
  ${typography.caption};
  color: ${colors.grey500};
  margin-top: 2px;
`;

const navStyle = css`
  flex: 1;
  padding: ${spacing[4]} 0 ${spacing[6]};
  overflow-y: auto;
`;

const sectionStyle = css`
  margin-bottom: ${spacing[5]};
`;

const sectionLabelStyle = css`
  ${typography.captionBold};
  color: ${colors.grey600};
  text-transform: uppercase;
  letter-spacing: 0.8px;
  padding: 0 ${spacing[5]} ${spacing[2]};
  display: block;
`;

const navItemStyle = css`
  display: block;
  padding: ${spacing[2]} ${spacing[5]};
  ${typography.body2};
  color: ${colors.grey400};
  text-decoration: none;
  border-radius: 0;
  transition: color 0.15s ease, background-color 0.15s ease;

  &:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.06);
  }
`;

const activeNavItemStyle = css`
  color: #ffffff;
  background-color: rgba(49, 130, 246, 0.2);

  &:hover {
    background-color: rgba(49, 130, 246, 0.25);
  }
`;

const navGroups = [
  {
    label: 'Foundation',
    items: [
      { href: '/foundation/colors', label: 'Colors' },
      { href: '/foundation/typography', label: 'Typography' },
      { href: '/foundation/spacing', label: 'Spacing' },
    ],
  },
  {
    label: 'Layout',
    items: [
      { href: '/layout-components/flex', label: 'Flex' },
      { href: '/layout-components/box', label: 'Box' },
      { href: '/layout-components/grid', label: 'Grid' },
      { href: '/layout-components/spacing', label: 'Spacing' },
      { href: '/layout-components/mobile', label: 'MobileLayout' },
    ],
  },
  {
    label: 'General',
    items: [
      { href: '/general/button', label: 'Button' },
      { href: '/general/input', label: 'Input' },
      { href: '/general/select', label: 'Select' },
      { href: '/general/checkbox', label: 'Checkbox' },
      { href: '/general/switch', label: 'Switch' },
      { href: '/general/textfield', label: 'TextField' },
      { href: '/general/listrow', label: 'ListRow' },
    ],
  },
  {
    label: 'Feedback',
    items: [
      { href: '/feedback/toast', label: 'Toast' },
      { href: '/feedback/skeleton', label: 'Skeleton' },
      { href: '/feedback/modal', label: 'Modal' },
      { href: '/feedback/drawer', label: 'Drawer' },
      { href: '/feedback/dialog', label: 'Dialog' },
      { href: '/feedback/bottom-cta', label: 'BottomCTA' },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside css={sidebarStyle}>
      <div css={logoStyle}>
        <h1 css={logoTitleStyle}>Design System</h1>
        <p css={logoSubtitleStyle}>@mono/ui components</p>
      </div>
      <nav css={navStyle}>
        {navGroups.map((group) => (
          <div key={group.label} css={sectionStyle}>
            <span css={sectionLabelStyle}>{group.label}</span>
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                css={[navItemStyle, pathname === item.href && activeNavItemStyle]}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
