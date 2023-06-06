import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type Elevator = {
  exit: string;
  isAvailable: boolean;
};

export type Station = {
  id: number;
  name: string;
  status: string; //'사용가능' | '일부가능' | '사용불가능';
  line: string; //'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
};

export const fetchStations = async (keywords: string) => {
  try {
    const res = await axios({
      method: 'get',
      url: `/search/?keywords=${keywords}`, // <- 후에 서버주소로 변경
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const useStationInfo = (keywords: string) => {
  return useQuery(['stations', keywords], () => fetchStations(keywords), {
    refetchOnWindowFocus: false,
    retry: 0,
    enabled: !!keywords,
    select: (data) => data.slice(0, 10),
    onSuccess: (data) => console.log(data),
    onError: (e: Error) => console.log(e.message),
  });
};
