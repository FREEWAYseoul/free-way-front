import { createContext, useContext, useState } from 'react';
import { StationProps } from '../../../types/stationType';

interface ResultContextProviderProps {
  children: React.ReactNode;
  initStation: StationProps;
}

export interface ReactContextValueProps {
  station: StationProps;
  activeTab: string;
  isDrag: boolean;
  isShow: boolean;
  handleChangeTab: (arg1: string) => void;
  handleChangeStation: (arg1: StationProps) => void;
  handleShowInfo: (arg1: boolean) => void;
  handleShowController: (arg1: boolean) => void;
}

export const ResultContext = createContext<ReactContextValueProps | null>(null);

export const ResultContextProvider = ({ children, initStation }: ResultContextProviderProps) => {
  const [station, setStation] = useState<StationProps>(initStation);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('엘리베이터');

  const handleChangeTab = (title: string) => {
    setActiveTab(title);
  };

  const handleShowInfo = (flag: boolean) => {
    setIsDrag(flag);
  };

  const handleShowController = (flag: boolean) => {
    setIsShow(flag);
  };

  const handleChangeStation = (data: StationProps) => {
    setStation({
      ...station,
      stationName: data.stationName,
      position: { lat: data.position.lat, lng: data.position.lng },
    });
    setIsDrag(false);
  };

  const contextValue = {
    station,
    activeTab,
    isDrag,
    handleChangeTab,
    handleChangeStation,
    handleShowInfo,
    isShow,
    handleShowController,
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
