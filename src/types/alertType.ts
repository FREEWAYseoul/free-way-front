export interface SafetyAlertItemProps {
  date: string;
  title: string;
  description: string;
}

export interface SafetyAlertProps {
  date: string;
  contents: SafetyAlertItemProps[];
}
