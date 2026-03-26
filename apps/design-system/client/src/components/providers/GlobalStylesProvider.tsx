/** @jsxImportSource @emotion/react */
'use client';

import { Global, css } from '@emotion/react';
import { globalStyles } from '@mono/ui';

export function GlobalStylesProvider() {
  return <Global styles={css`${globalStyles}`} />;
}
