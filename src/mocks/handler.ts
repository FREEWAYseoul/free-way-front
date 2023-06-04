// src/mocks/handlers.js
import { rest } from 'msw';
import subwayDumy from './data/subwayDumy.json';
import elevatorDumy from './data/elevatorDumy.json';

export const handlers = [
  rest.get('/api/stations/search', async (req, res, ctx) => {
    await sleep(200);

    return res(ctx.status(200), ctx.json(subwayDumy));
  }),
  rest.get('/api/stations', async (req, res, ctx) => {
    const title = req.url.searchParams.get('title');

    const station = elevatorDumy.find((item) => item.subway === title);

    await sleep(200);

    return res(ctx.status(200), ctx.json(station));
  }),
  rest.post('/api/elevators', async (req, res, ctx) => {
    const body = await req.json();

    const newElevator = elevatorDumy.filter((item) => {
      if (
        body.sw.lat <= item.lat &&
        item.lat <= body.ne.lat &&
        body.sw.lng <= item.lng &&
        item.lng <= body.ne.lng
      ) {
        return item;
      }
    });

    return res(ctx.status(200), ctx.json(newElevator));
  }),
];

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
