import { useQuery } from '@tanstack/react-query';
import { fetchGetAlertList } from '../api/alert';
import { useEffect, useState } from 'react';
import { SafetyAlertProps } from '../types/alertType';
import { nowDateFormat } from '../utils/format';

export const useAlert = () => {
  const { data, isLoading } = useQuery(['SafetyAlerts'], fetchGetAlertList, {
    staleTime: Infinity,
  });
  const [alerts, setAlerts] = useState<SafetyAlertProps[]>([]);
  const [toastMessage, setToastMessage] = useState<string>();

  const toastAlertMessage = () => {
    if (!isLoading) {
      const now = nowDateFormat();
      const findAlert: SafetyAlertProps | undefined = alerts.find((item: SafetyAlertProps) => {
        const date = item.date.split('-');
        if (
          date[0] === String(now.year) &&
          date[1] === String(now.month) &&
          date[2] === String(now.date)
        ) {
          return item;
        }
      });

      setToastMessage(findAlert?.notifications[0].summary);
      // setToastMessage(alerts[0]?.notifications[0].summary);
    }
  };

  useEffect(() => {
    if (alerts.length > 0) toastAlertMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alerts]);

  useEffect(() => {
    if (!isLoading) {
      const alertData: SafetyAlertProps[] = data?.data ?? [];
      setAlerts(alertData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return { alerts, toastMessage };
};
