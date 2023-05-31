/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { useMap } from '../../../hooks/useMap';
import ElevatorImg from '../../../assets/elevator.svg';
import styled from 'styled-components';
import axios from 'axios';
import { ElevatorProps, LocalProps, SubwayProps } from '../../../types/subwayType';
import { fetchLocalSubway } from '../../../apis/SubwayAPI';

const MapMarkerController = ({ title }: { title: string }) => {
  const { kakaoMap, subways } = useMap();
  const [keyword, setKeyword] = useState<string>('');
  const [searchResult, setSearchResult] = useState([]);
  const [subwayTitle, setSubwayTitle] = useState<string>(title);
  const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);
  const [localSubway, setLocalSubway] = useState([]);

  /**
   * subway marker move
   */
  const moveSubway = async (title: string, lat: number, lng: number) => {
    const moveLatLon = new kakao.maps.LatLng(lat, lng);
    kakaoMap.setLevel(3);
    kakaoMap.panTo(moveLatLon);
    setSubwayTitle(title);

    const res = await fetchLocalSubway(lng, lat);
    setLocalSubway(
      res.data.documents.sort((a: LocalProps, b: LocalProps) => a.distance - b.distance)
    );
  };

  const moveMap = useCallback(async () => {
    // 마커 초기화
    markers.forEach((marker) => {
      marker.setMap(null);
    });

    /* 역이름, id 검색
    const res = await axios({
      method: 'get',
      url: `/api/subways/elevator`,
      params: {
        title: subwayTitle,
      },
    }).catch((e) => console.log(e));
    */

    const sw = kakaoMap.getBounds().getSouthWest();
    const ne = kakaoMap.getBounds().getNorthEast();

    const res = await axios({
      method: 'post',
      url: `/api/subways/elevator`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        swLat: sw.getLat(),
        swLng: sw.getLng(),
        neLat: ne.getLat(),
        neLng: ne.getLng(),
      },
    }).catch((e) => console.log(e));

    if (res) {
      const imageSrc = ElevatorImg;
      const imageSize = new kakao.maps.Size(64, 69);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      const newMarkers = res.data.map((item: ElevatorProps) => {
        const markerPosition = new kakao.maps.LatLng(item.lat, item.lng);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });
        marker.setMap(kakaoMap);
        return marker;
      });
      setMarkers(newMarkers);
    }
  }, [markers]);

  useEffect(() => {
    if (keyword) {
      const searchSubway = subways.filter((item: SubwayProps) => item.title.includes(keyword));
      setSearchResult(searchSubway);
    } else {
      setSearchResult([]);
    }
  }, [keyword]);

  useEffect(() => {
    moveMap();
  }, [subwayTitle]);

  useEffect(() => {
    kakao.maps.event.addListener(kakaoMap, 'idle', moveMap);
    return () => {
      kakao.maps.event.removeListener(kakaoMap, 'idle', moveMap);
    };
  }, [markers]);

  return (
    <>
      <StyledTop>
        <input type='text' value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        {subways.length > 0 &&
          searchResult.map((item: SubwayProps) => (
            <SearchItem
              key={item.title}
              info={item}
              onClick={() => moveSubway(item.title, item.lat, item.lng)}
            />
          ))}
      </StyledTop>
      <StyledBottom>
        {localSubway.map((item: LocalProps) => (
          <LocalItem key={item.id} info={item} />
        ))}
      </StyledBottom>
    </>
  );
};

const SearchItem = ({ info, onClick }: { info: SubwayProps; onClick: () => void }) => {
  return <div onClick={() => onClick()}>{info.title}</div>;
};

const LocalItem = ({ info }: { info: LocalProps }) => {
  return (
    <div>
      {info.place_name} {info.distance}m
    </div>
  );
};

export default MapMarkerController;

const StyledTop = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 4px;
  top: 20px;
  left: 50%;
  width: 90%;
  height: 100px;
  background-color: #fff;
  transform: translateX(-50%);
  z-index: 99;

  & > div {
    cursor: pointer;
    background-color: lightgray;
  }
`;

const StyledBottom = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 4px;
  bottom: 20px;
  left: 50%;
  width: 90%;
  min-height: 140px;
  background-color: #fff;
  transform: translateX(-50%);
  z-index: 99;
  overflow: auto;

  & > div {
    background-color: lightgray;
  }
`;
