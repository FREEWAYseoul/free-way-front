export interface CoordinateProps {
  latitude: number;
  longitude: number;
}

export interface FacilitiesProps {
  [key: string]: boolean;
  elevator: boolean;
  wheelchairLift: boolean;
  disabledToilet: boolean;
  transitParkingLot: boolean;
  unmannedCivilApplicationIssuingMachine: boolean;
  currencyExchangeKiosk: boolean;
  trainTicketOffice: boolean;
  feedingRoom: boolean;
}

export interface ElevatorProps {
  elevatorId: number;
  elevatorCoordinate: CoordinateProps;
  elevatorStatus: '사용 가능' | '공사 중' | '보수 중' | '확인 불가';
  exitNumber: number;
}

export interface StationProps {
  lineId: number;
  stationId: number;
  stationName: string;
  stationStatus: string;
  availableElevatorsNumber?: number;
  coordinate: CoordinateProps;
}

export interface StationInfoProps {
  stationId: number;
  stationName: string;
}

export interface StationDetailProps extends StationInfoProps {
  lineId: number;
  lineName: string;
  stationCoordinate: CoordinateProps;
  stationStatus: string;
  stationContact: string;
  stationImageUrl: string;
  nextStation: StationInfoProps;
  previousStation: StationInfoProps;
  branchStation?: StationInfoProps;
  facilities: FacilitiesProps;
  elevators: ElevatorProps[];
  transferStations: {
    stationId: number;
    lineId: string;
  }[];
}

export interface RectangleCoordinateProps {
  sw: CoordinateProps;
  ne: CoordinateProps;
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

export interface StationTitleProps {
  title: string;
  line: number;
  color: string;
  type?: string;
}

export interface StationMakerProps {
  info: StationProps;
  isActive: boolean;
  level: number;
}
