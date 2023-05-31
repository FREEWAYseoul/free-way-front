import axios from 'axios';

const KAKAO_REST_KEY = 'af61b95c8bffb045cb0d212e309d64cd';

export const fetchSubways = async () => {
  const res = await axios({
    method: 'get',
    url: '/api/subways',
  });

  return res;
};

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
  });

  return res;
};
