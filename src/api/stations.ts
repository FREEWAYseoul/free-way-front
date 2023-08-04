import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type Coordinate = {
  latitude: string;
  longitude: string;
};

export type Station = {
  availableElevatorsNumber: number;
  coordinate: Coordinate;
  lineId: string;
  stationId: string;
  stationName: string;
  stationStatus: string;
};

export const fetchStations = async () => {
  try {
    const res = await axios({
      method: 'get',
      url: '/api/stations/search',
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const useStationInfo = () => {
  return useQuery(['stations'], () => fetchStations(), {
    refetchOnWindowFocus: false,
    retry: 0,
    staleTime: Infinity,
    // enabled: !!keywords,
    // select: (data) =>{ data.filter(0, 10)},
    // onSuccess: (data) => console.log(data),
    onError: (e: Error) => console.log(e.message),
  });
};

export const fetchGetStation = async (stationId: string | number) => {
  try {
    const res = await axios({
      method: 'get',
      url: `/api/stations/${stationId}`,
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};
