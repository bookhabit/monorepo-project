/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useState } from 'react';
import { Switch, colors, typography, spacing } from '@mono/ui';
import { PreviewBox } from '@/components/PreviewBox';
import { CodeBlock } from '@/components/CodeBlock';

const pageStyle = css`
  padding: ${spacing[8]};
`;

const headingStyle = css`
  ${typography.heading1};
  color: ${colors.grey900};
  margin: 0 0 ${spacing[2]};
`;

const subheadingStyle = css`
  ${typography.body1};
  color: ${colors.grey500};
  margin: 0 0 ${spacing[8]};
`;

export function SwitchSection() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Switch</h1>
      <p css={subheadingStyle}>
        Toggle switch component. Blue when on, grey when off. Animated thumb transition.
      </p>

      <PreviewBox title="Basic Switches" description="Unchecked and checked states">
        <Switch label="Off" />
        <Switch label="On" defaultChecked />
      </PreviewBox>

      <CodeBlock code={`<Switch label="Off" />\n<Switch label="On" defaultChecked />`} />

      <PreviewBox title="Controlled Switches" description="Click to toggle">
        <div css={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Switch
            label={`알림 ${notifications ? 'ON' : 'OFF'}`}
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
          <Switch
            label={`다크 모드 ${darkMode ? 'ON' : 'OFF'}`}
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
          <Switch
            label={`자동 저장 ${autoSave ? 'ON' : 'OFF'}`}
            checked={autoSave}
            onChange={(e) => setAutoSave(e.target.checked)}
          />
        </div>
      </PreviewBox>

      <CodeBlock
        code={`const [on, setOn] = useState(false);\n\n<Switch\n  label="알림"\n  checked={on}\n  onChange={(e) => setOn(e.target.checked)}\n/>`}
      />

      <PreviewBox title="Disabled State">
        <Switch label="비활성화 (Off)" disabled />
        <Switch label="비활성화 (On)" checked disabled onChange={() => {}} />
      </PreviewBox>
    </div>
  );
}
