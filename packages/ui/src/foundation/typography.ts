// ─── 타이포그래피 스케일 ────────────────────────────────────────────────────
// fontSize / lineHeight 단위: px
// 값을 직접 하드코딩하지 말고 CSS 변수를 통해 참조하세요.
// 접근성(더 큰 텍스트) 대응 시 CSS 변수만 교체하면 됩니다.
export const typographyScale = {
  t1:    { fontSize: 30,   lineHeight: 40   },  // 매우 큰 제목
  sub1:  { fontSize: 29,   lineHeight: 38   },
  sub2:  { fontSize: 28,   lineHeight: 37   },
  sub3:  { fontSize: 27,   lineHeight: 36   },
  t2:    { fontSize: 26,   lineHeight: 35   },  // 큰 제목
  sub4:  { fontSize: 25,   lineHeight: 34   },
  sub5:  { fontSize: 24,   lineHeight: 33   },
  sub6:  { fontSize: 23,   lineHeight: 32   },
  t3:    { fontSize: 22,   lineHeight: 31   },  // 일반 제목
  sub7:  { fontSize: 21,   lineHeight: 30   },
  t4:    { fontSize: 20,   lineHeight: 29   },  // 작은 제목
  sub8:  { fontSize: 19,   lineHeight: 28   },
  sub9:  { fontSize: 18,   lineHeight: 27   },
  t5:    { fontSize: 17,   lineHeight: 25.5 },  // 일반 본문
  sub10: { fontSize: 16,   lineHeight: 24   },
  t6:    { fontSize: 15,   lineHeight: 22.5 },  // 작은 본문
  sub11: { fontSize: 14,   lineHeight: 21   },
  t7:    { fontSize: 13,   lineHeight: 19.5 },  // 보조 텍스트
  sub12: { fontSize: 12,   lineHeight: 18   },
  sub13: { fontSize: 11,   lineHeight: 16.5 },
} as const;

export type TypographyScaleKey = keyof typeof typographyScale;

// ─── CSS 변수 생성 ──────────────────────────────────────────────────────────
// GlobalStyle에 주입할 :root CSS 변수 문자열
export const typographyCssVariables: string = (
  Object.entries(typographyScale) as [TypographyScaleKey, { fontSize: number; lineHeight: number }][]
)
  .map(([key, { fontSize, lineHeight }]) =>
    `--ty-${key}-fs: ${fontSize / 16}rem; --ty-${key}-lh: ${lineHeight / 16}rem;`,
  )
  .join('\n  ');

// ─── 스케일 토큰 (plain CSS string) ─────────────────────────────────────────
// @emotion/react 를 import하지 않아 Next.js RSC 번들 충돌 방지
// Emotion css 태그드 템플릿 내 interpolation으로 그대로 사용 가능
function makeScale(key: TypographyScaleKey): string {
  const { fontSize, lineHeight } = typographyScale[key];
  return `font-size: var(--ty-${key}-fs, ${fontSize / 16}rem); line-height: var(--ty-${key}-lh, ${lineHeight / 16}rem);`;
}

export const scale: Record<TypographyScaleKey, string> = {
  t1:    makeScale('t1'),
  sub1:  makeScale('sub1'),
  sub2:  makeScale('sub2'),
  sub3:  makeScale('sub3'),
  t2:    makeScale('t2'),
  sub4:  makeScale('sub4'),
  sub5:  makeScale('sub5'),
  sub6:  makeScale('sub6'),
  t3:    makeScale('t3'),
  sub7:  makeScale('sub7'),
  t4:    makeScale('t4'),
  sub8:  makeScale('sub8'),
  sub9:  makeScale('sub9'),
  t5:    makeScale('t5'),
  sub10: makeScale('sub10'),
  t6:    makeScale('t6'),
  sub11: makeScale('sub11'),
  t7:    makeScale('t7'),
  sub12: makeScale('sub12'),
  sub13: makeScale('sub13'),
};

// ─── 폰트 웨이트 ────────────────────────────────────────────────────────────
export const fontWeight = {
  regular:  'font-weight: 400;',
  medium:   'font-weight: 500;',
  semiBold: 'font-weight: 600;',
  bold:     'font-weight: 700;',
} as const;

// ─── 시맨틱 타이포그래피 (plain CSS string) ──────────────────────────────────
// 컴포넌트에서 자주 쓰이는 스케일 + 웨이트 조합
export const typography = {
  // 제목
  heading1: `${scale.t3} font-weight: 700;`,    // 22px Bold
  heading2: `${scale.t4} font-weight: 700;`,    // 20px Bold
  heading3: `${scale.sub9} font-weight: 700;`,  // 18px Bold

  // 본문
  body1:     `${scale.sub10} font-weight: 400;`, // 16px Regular
  body1Bold: `${scale.sub10} font-weight: 600;`, // 16px SemiBold
  body2:     `${scale.sub11} font-weight: 400;`, // 14px Regular
  body2Bold: `${scale.sub11} font-weight: 600;`, // 14px SemiBold

  // 보조
  caption:     `${scale.sub12} font-weight: 400;`, // 12px Regular
  captionBold: `${scale.sub12} font-weight: 600;`, // 12px SemiBold
  label:       `${scale.t7} font-weight: 500;`,    // 13px Medium
} as const;

export type TypographyToken = keyof typeof typography;
