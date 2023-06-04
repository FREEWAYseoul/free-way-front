export interface PositionProps {
  lat: number;
  lng: number;
}

export interface StationProps {
  lineId: number;
  stationId: number;
  stationName: string;
  stationStatus: string;
  position: PositionProps;
}

export interface ElevatorProps extends PositionProps {
  title: string;
}

export interface RectanglePositionProps {
  sw: PositionProps;
  ne: PositionProps;
}

export interface LocalProps {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: number;
  id: number;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: number;
  y: number;
}
