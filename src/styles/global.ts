import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

// 위에서 받은 `normalize`로 기본 css가 초기화 합니다.
const GlobalStyle = createGlobalStyle`
  ${normalize}

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

  *{
    font-family: 'Pretendard-Regular';
  }

  html,
  body {
    overflow: hidden;
    font-style: normal;
    overscroll-behavior: none;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
