import axios from 'axios';
import { RectanglePositionProps } from '../types/subwayType';

const KAKAO_REST_KEY = 'af61b95c8bffb045cb0d212e309d64cd';

/**
 * subway list
 */
export const fetchSubways = async () => {
  const res = await axios({
    method: 'get',
    url: '/api/subways',
  }).catch((e) => console.log(e));

  return res;
};

/**
 * local subway list
 */
export const fetchLocalSubway = async (x: number, y: number) => {
  const res = await axios({
    method: 'get',
    url: 'https://dapi.kakao.com/v2/local/search/category.json',
    headers: {
      Authorization: `KakaoAK ${KAKAO_REST_KEY}`,
    },
    params: {
      category_group_code: 'SW8',
      radius: 1500,
      x: x,
      y: y,
    },
  }).catch((e) => console.log(e));

  return res;
};

/**
 * subway elevator list
 */
export const fetchElevators = async (lectanglePosition: RectanglePositionProps) => {
  const res = await axios({
    method: 'post',
    url: `/api/subways/elevator`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: lectanglePosition,
  }).catch((e) => console.log(e));

  return res;
};
