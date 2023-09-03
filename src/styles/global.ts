import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

// 위에서 받은 `normalize`로 기본 css가 초기화 합니다.
const GlobalStyle = createGlobalStyle`
  ${normalize}

  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css');

  *{
    font-family: 'Pretendard', sans-serif;
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
