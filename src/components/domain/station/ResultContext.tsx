import { createContext, useContext, useEffect, useState } from 'react';
import { StationDetailProps } from '../../../types/stationType';
import { SLIDER_RANGE } from '../../../constants/slide';
import { useStationInfo } from '../../../api/stations';

interface ResultContextProviderProps {
  children: React.ReactNode;
  initStation: StationDetailProps;
}

export interface ReactContextValueProps {
  station: StationDetailProps;
  activeTab: string;
  isShow: boolean;
  isTabPostion: boolean;
  isDragging: boolean;
  tabPosition: number;
  handleChangeTab: (arg1: string) => void;
  handleChangeStation: (arg1: string | number) => void;
  handleShowInfo: (arg1: boolean) => void;
  handleShowController: (arg1: boolean) => void;
  handleTouchStart: (event: React.TouchEvent<HTMLDivElement>) => void;
  handleTouchMove: (event: React.TouchEvent<HTMLDivElement>) => void;
  handleTouchEnd: () => void;
}

export const ResultContext = createContext<ReactContextValueProps | null>(null);

export const ResultContextProvider = ({ children, initStation }: ResultContextProviderProps) => {
  const [station, setStation] = useState<StationDetailProps>(initStation);
  const [isShow, setIsShow] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('엘리베이터');
  const [stationId, setStationId] = useState<number>(Number(initStation.stationId));
  const { data, isLoading } = useStationInfo(stationId);

  // 드래그 슬라이드 관련
  const [isTabPostion, setIsTabPosition] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [tabPosition, setTabPosition] = useState(0);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStartY(event.touches[0].clientY);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging) {
      const dragDistance = event.touches[0].clientY - dragStartY;
      // 숨겨졌을 경우
      if (isTabPostion) {
        // 노출되 있을 경우
        if (dragDistance <= -SLIDER_RANGE.min && dragDistance >= -SLIDER_RANGE.max) {
          setTabPosition(SLIDER_RANGE.max + dragDistance);
        }
      } else {
        if (dragDistance >= SLIDER_RANGE.min && dragDistance <= SLIDER_RANGE.max) {
          setTabPosition(dragDistance);
        }
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // 숨겨졌을 경우
    if (isTabPostion && tabPosition < SLIDER_RANGE.max - 20) {
      setTabPosition(SLIDER_RANGE.min);
      setIsTabPosition(false);
    } else if (!isTabPostion && tabPosition > SLIDER_RANGE.min + 20) {
      // 노출되 있을 경우
      setTabPosition(SLIDER_RANGE.max);
      setIsTabPosition(true);
    }
  };
  //

  const handleChangeTab = (title: string) => {
    setActiveTab(title);
  };

  const handleShowInfo = (flag: boolean) => {
    if (flag) {
      setTabPosition(SLIDER_RANGE.min);
    } else {
      setTabPosition(SLIDER_RANGE.max);
    }
    setIsTabPosition(!flag);
  };

  const handleShowController = (flag: boolean) => {
    setIsShow(flag);
  };

  const handleChangeStation = async (stationId: number | string) => {
    setStationId(Number(stationId));
  };

  useEffect(() => {
    if (!isLoading && data) {
      setStation(data);
      setIsTabPosition(false);
      setTabPosition(SLIDER_RANGE.min);
    }
  }, [isLoading, data]);

  const contextValue = {
    station,
    activeTab,
    isShow,
    isTabPostion,
    isDragging,
    tabPosition,
    handleChangeTab,
    handleChangeStation,
    handleShowInfo,
    handleShowController,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };

  return <ResultContext.Provider value={contextValue}>{children}</ResultContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useResultContext = () => {
  const context = useContext(ResultContext);

  if (!context) {
    throw new Error('not found ResultContext');
  }

  return context;
};
