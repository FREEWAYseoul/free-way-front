import { ColorTypes } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: ColorTypes;
  }
}
