import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const SERVER_API = `/api/stations/search?keyword=`;

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
      url: SERVER_API,
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
    // enabled: !!keywords,
    // select: (data) =>{ data.filter(0, 10)},
    onSuccess: (data) => console.log(data),
    onError: (e: Error) => console.log(e.message),
  });
};