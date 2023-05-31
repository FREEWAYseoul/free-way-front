/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { SubwayProps, useMap } from '../../../hooks/useMap';
import ElevatorImg from '../../../assets/elevator.svg';
import styled from 'styled-components';
import axios from 'axios';

interface ElevatorProps {
  title: string;
  lat: number;
  lng: number;
}

const MapMarkerController = ({ title }: { title: string }) => {
  const { kakaoMap, subways } = useMap();
  const [keyword, setKeyword] = useState<string>('');
  const [searchResult, setSearchResult] = useState([]);
  const [subwayTitle, setSubwayTitle] = useState<string>(title);
  const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);

  /**
   * subway marker move
   */
  const moveSubway = (title: string, lat: number, lng: number) => {
    const moveLatLon = new kakao.maps.LatLng(lat, lng);
    kakaoMap.setLevel(3);
    kakaoMap.panTo(moveLatLon);
    setSubwayTitle(title);
  };

  const moveMap = useCallback(async () => {
    // 마커 초기화
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    /*
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
    <Container>
      <input type='text' value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      {subways.length > 0 &&
        searchResult.map((item: SubwayProps) => (
          <SearchItem
            key={item.title}
            info={item}
            onClick={() => moveSubway(item.title, item.lat, item.lng)}
          />
        ))}
    </Container>
  );
};

const SearchItem = ({ info, onClick }: { info: SubwayProps; onClick: () => void }) => {
  return <div onClick={() => onClick()}>{info.title}</div>;
};

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 4px;
  top: 20px;
  left: 50%;
  width: 90%;
  height: 100px;
  background-color: white;
  transform: translateX(-50%);
  z-index: 99;

  & > div {
    cursor: pointer;
    background-color: lightgray;
  }
`;

export default MapMarkerController;
