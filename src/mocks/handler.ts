import { rest } from 'msw';
import { stations } from './data/stations';

const getStationsInfo = async (_req, res, ctx) => {
  await sleep(200);

  // 쿼리 키워드 테스트
  // const keywords = req.url.searchParams.get('keywords');
  // console.log(keywords);

  return res(ctx.status(200), ctx.json([...stations]));
};

export const handlers = [rest.get('/search', getStationsInfo)];

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
