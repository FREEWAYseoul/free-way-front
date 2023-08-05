import { useQuery } from '@tanstack/react-query';
import { get } from '.';
import { StationDetailProps, StationProps } from '../types/stationType';

export type Coordinate = {
  latitude: string;
  longitude: string;
};

const fetchStations = async () => {
  const res = await get<StationProps[]>('/api/stations/search');
  return res.data;
};

export const useStation = () => {
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

const fetchStationInfo = async (stationId: string | number) => {
  try {
    const res = await get<StationDetailProps>(`/api/stations/${stationId}`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const useStationInfo = (stationId: number) => {
  return useQuery(['stationsInfo', stationId], () => fetchStationInfo(stationId), {
    onError: (e: Error) => console.log(e.message),
  });
};
