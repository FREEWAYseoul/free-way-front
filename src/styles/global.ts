import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

// 위에서 받은 `normalize`로 기본 css가 초기화 합니다.
const GlobalStyle = createGlobalStyle`
  ${normalize}

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  :root {
    --rsbs-backdrop-bg: rgba(0, 0, 0, 0.6);
    --rsbs-bg: #fff;
    --rsbs-handle-bg: hsla(0, 0%, 0%, 0.14);
    --rsbs-max-w: auto;
    --rsbs-ml: env(safe-area-inset-left);
    --rsbs-mr: env(safe-area-inset-right);
    --rsbs-overlay-rounded: 16px;
  }

  *{
    font-family: 'Pretendard';
    box-sizing: border-box;
  }

  html,
  body {
    overflow: hidden;
    font-style: normal;
    overscroll-behavior: none;
  }
`;

export default GlobalStyle;
