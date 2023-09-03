import { get } from '.';
import { SafetyAlertProps } from '../types/alertType';

export const fetchGetAlertList = async () => {
  return get<SafetyAlertProps[]>('/api/notifications');
};
