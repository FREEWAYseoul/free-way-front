// src/mocks/handlers.js
import { rest } from 'msw';
import subwayDumy from './data/subwayDumy.json';
import elevatorDumy from './data/elevatorDumy.json';

export const handlers = [
  rest.get('/api/subways', async (req, res, ctx) => {
    await sleep(200);

    return res(ctx.status(200), ctx.json(subwayDumy));
  }),
  rest.get('/api/subways/elevator', async (req, res, ctx) => {
    const title = req.url.searchParams.get('title');

    const newElevator = elevatorDumy.filter((item) => item.subway === title);

    await sleep(200);

    return res(ctx.status(200), ctx.json(newElevator));
  }),
  rest.post('/api/subways/elevator', async (req, res, ctx) => {
    const body = await req.json();

    const newElevator = elevatorDumy.filter((item) => {
      if (
        body.swLat <= item.lat &&
        item.lat <= body.neLat &&
        body.swLng <= item.lng &&
        item.lng <= body.neLng
      ) {
        return item;
      }
    });

    await sleep(200);

    return res(ctx.status(200), ctx.json(newElevator));
  }),
];

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
