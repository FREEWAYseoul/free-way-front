import { get } from '.';

export const fetchGetAlertList = async () => {
  const res = await get('/api/notifications');
  return res;
};
