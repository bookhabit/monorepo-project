/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useState } from 'react';
import { Menu, Button, colors, typography, spacing } from '@mono/ui';
import { PreviewBox } from '@/components/PreviewBox';
import { CodeBlock } from '@/components/CodeBlock';

const pageStyle = css`padding: ${spacing[8]};`;
const headingStyle = css`${typography.heading1}; color: ${colors.grey900}; margin: 0 0 ${spacing[2]};`;
const subheadingStyle = css`${typography.body1}; color: ${colors.grey500}; margin: 0 0 ${spacing[8]};`;
const rowStyle = css`display: flex; align-items: flex-start; gap: ${spacing[4]}; flex-wrap: wrap;`;

export function MenuSection() {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(1);

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Menu</h1>
      <p css={subheadingStyle}>
        드롭다운 메뉴를 사용해 항목을 선택하거나 상태를 확인하고 바꿀 수 있어요.
      </p>

      <PreviewBox title="Menu.Dropdown" description="기본 드롭다운 메뉴">
        <Menu.Dropdown header={<Menu.Header>편집</Menu.Header>}>
          <Menu.DropdownItem>첫 번째 메뉴</Menu.DropdownItem>
          <Menu.DropdownItem>두 번째 메뉴</Menu.DropdownItem>
          <Menu.DropdownItem>세 번째 메뉴</Menu.DropdownItem>
        </Menu.Dropdown>
      </PreviewBox>

      <CodeBlock
        code={`<Menu.Dropdown header={<Menu.Header>편집</Menu.Header>}>
  <Menu.DropdownItem>첫 번째 메뉴</Menu.DropdownItem>
  <Menu.DropdownItem>두 번째 메뉴</Menu.DropdownItem>
  <Menu.DropdownItem>세 번째 메뉴</Menu.DropdownItem>
</Menu.Dropdown>`}
      />

      <PreviewBox title="DropdownCheckItem" description="체크박스 포함 메뉴">
        <Menu.Dropdown header={<Menu.Header>편집</Menu.Header>}>
          <Menu.DropdownCheckItem checked={false}>첫 번째 메뉴</Menu.DropdownCheckItem>
          <Menu.DropdownCheckItem checked>두 번째 메뉴</Menu.DropdownCheckItem>
          <Menu.DropdownCheckItem checked={false}>세 번째 메뉴</Menu.DropdownCheckItem>
        </Menu.Dropdown>
      </PreviewBox>

      <CodeBlock
        code={`<Menu.Dropdown header={<Menu.Header>편집</Menu.Header>}>
  <Menu.DropdownCheckItem checked={false}>첫 번째 메뉴</Menu.DropdownCheckItem>
  <Menu.DropdownCheckItem checked={true}>두 번째 메뉴</Menu.DropdownCheckItem>
  <Menu.DropdownCheckItem checked={false}>세 번째 메뉴</Menu.DropdownCheckItem>
</Menu.Dropdown>`}
      />

      <PreviewBox title="Menu.Trigger" description="버튼 클릭으로 열리는 드롭다운">
        <div css={rowStyle}>
          {(['bottom', 'bottom-start', 'bottom-end', 'top'] as const).map((placement) => (
            <Menu.Trigger
              key={placement}
              placement={placement}
              dropdown={
                <Menu.Dropdown header={<Menu.Header>항목을 선택하세요</Menu.Header>}>
                  {[1, 2, 3].map((n) => (
                    <Menu.DropdownCheckItem
                      key={n}
                      checked={checked === n}
                      onCheckedChange={(c) => { if (c) setChecked(n); }}
                    >
                      {n}번째 메뉴
                    </Menu.DropdownCheckItem>
                  ))}
                </Menu.Dropdown>
              }
            >
              <Button variant="secondary" size="small">{placement}</Button>
            </Menu.Trigger>
          ))}
        </div>
      </PreviewBox>

      <CodeBlock
        code={`<Menu.Trigger
  open={open}
  onOpen={() => setOpen(true)}
  onClose={() => setOpen(false)}
  placement="bottom-start"
  dropdown={
    <Menu.Dropdown header={<Menu.Header>항목을 선택하세요</Menu.Header>}>
      <Menu.DropdownCheckItem checked={checked === 1} onCheckedChange={(c) => c && setChecked(1)}>
        첫 번째 메뉴
      </Menu.DropdownCheckItem>
    </Menu.Dropdown>
  }
>
  <Button>클릭해보세요</Button>
</Menu.Trigger>`}
      />
    </div>
  );
}
