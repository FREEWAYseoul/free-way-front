// import { useState, useEffect } from 'react';
// import styled, { keyframes } from 'styled-components';

// type Props = {
//   value: string;
// };

// function TypeWriter({ value }: Props) {
//   const [text, setText] = useState('');

//   const typeWriter = (text: string, i = 0) => {
//     if (i < value.length) {
//       setText(text.slice(0, i + 1));
//       setTimeout(() => {
//         typeWriter(text, i + 1);
//       }, 100);
//     } else {
//       setTimeout(() => {
//         typeWriter(value);
//       }, 1000);
//     }
//   };

//   useEffect(() => {
//     typeWriter(value);
//   }, [typeWriter, value]);

//   return (
//     <Container>
//       {text}
//       <TextCursor />
//     </Container>
//   );
// }

// export default TypeWriter;

// const blinkTextCursor = keyframes`
//   from {border-right-color: rgba(0, 0, 0, .75);}
//   to {border-right-color: transparent}
// `;

// const TextCursor = styled.span`
//   border-right: 2px solid rgba(0, 0, 0, 0.75);
//   display: inline;
//   animation: ${blinkTextCursor} 0.7s steps(44) infinite normal;
// `;

// const Container = styled.p`
//   opacity: 0.7;

//   display: inline-block;
//   margin: 0;

//   font-family: 'Pretendard';
//   font-style: normal;
//   font-weight: 700;
//   font-size: 18px;
//   color: #ffffff;
// `;
