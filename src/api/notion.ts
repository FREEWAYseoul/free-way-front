import { useQuery } from '@tanstack/react-query';
import { get } from '.';
import { BlockMapType } from 'react-notion';

const getNotionPageData = async <T>(pageId: string) => {
  const res = await get<T>(`https://notion-api.splitbee.io/v1/page/${pageId}`);
  return res.data;
};

export const useNotionPage = (pageId: string) => {
  return useQuery<BlockMapType>({
    queryKey: ['notion', pageId],
    queryFn: () => getNotionPageData<BlockMapType>(pageId),
    retry: 1,
    retryDelay: 3000,
  });
};
