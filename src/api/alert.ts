import axios from 'axios';

export const fetchGetAlertList = async () => {
  const res = await axios({
    method: 'get',
    url: '/api/notifications',
  }).catch((e) => console.log(e));

  return res;
};
