import { useEffect, useState } from 'react';
import { StationProps } from '../../types/stationType';
import { fetchSearchStations } from '../../apis/stationAPI';
import { useResultContext } from './station/ResultContext';

const TestSearchBar = () => {
  const { station, handleChangeStation } = useResultContext();
  const [keyword, setKeyword] = useState<string>(String(station.stationName));
  const [stations, setStations] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (keyword) {
      const searchStation = stations.filter((item: StationProps) =>
        item.stationName.includes(keyword)
      );
      setSearchResult(searchStation);
    } else {
      setSearchResult([]);
    }
  }, [keyword, stations]);

  useEffect(() => {
    setTimeout(
      () =>
        (async () => {
          const res = await fetchSearchStations();
          if (res) {
            setStations(res.data);
          }
        })(),
      100
    );
  }, []);

  return (
    <>
      <input type='text' value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      {searchResult.length > 0 &&
        searchResult.map((item: StationProps) => (
          <SearchItem
            key={item.stationName}
            info={item}
            handleOnClickStation={handleChangeStation}
          />
        ))}
    </>
  );
};

const SearchItem = ({
  info,
  handleOnClickStation,
}: {
  info: StationProps;
  handleOnClickStation: (arg1: StationProps) => void;
}) => {
  return <div onClick={() => handleOnClickStation(info)}>{info.stationName}</div>;
};

export default TestSearchBar;
