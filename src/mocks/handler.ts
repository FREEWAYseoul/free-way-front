import { rest } from 'msw';
import subwayDumy from './data/subwayDumy.json';
import elevatorDumy from './data/elevatorDumy.json';

export const handlers = [
  rest.get('/api/stations/search', async (req, res, ctx) => {
    await sleep(200);
    return res(ctx.status(200), ctx.json(subwayDumy));
  }),
  rest.get('/api/stations/:id', async (req, res, ctx) => {
    await sleep(200);
    return res(ctx.status(200), ctx.json(elevatorDumy));
  }),
  rest.get('/api/notifications', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
];

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
