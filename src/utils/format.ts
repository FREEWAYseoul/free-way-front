export const titleEclipse = (title: string, length: number) => {
  if (title.length > length) {
    return [...title].splice(0, length).join('') + '...';
  }
  return title;
};

export const dateFormat = (value: string) => {
  const nowDate = format(new Date());
  const { year, month, date, dayOfWeek } = format(new Date(value));

  if (nowDate.year === year && nowDate.month === month && nowDate.date === date) {
    return `(오늘) ${year}년 ${month}월 ${date}일 ${dayOfWeek}요일`;
  }
  return `${year}년 ${month}월 ${date}일 ${dayOfWeek}요일`;
};

export const nowDateFormat = () => {
  const now = new Date();
  return format(now);
};

export const timeFormat = (value: string) => {
  const time = value.split(':');
  return `${Number(time[0]) < 12 ? '오전' : '오후'} ${time[0]}:${time[1]}`;
};

const format = (value: Date) => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  const year = value.getFullYear();
  const month = value.getMonth() + 1 < 10 ? '0' + (value.getMonth() + 1) : value.getMonth() + 1;
  const hours = value.getHours() < 10 ? '0' + value.getHours() : value.getHours();
  const minutes = value.getMinutes() < 10 ? '0' + value.getMinutes() : value.getMinutes();
  const date = value.getDate() < 10 ? '0' + value.getDate() : value.getDate();
  const dayOfWeek = week[value.getDay()];

  return { year, month, date, hours, minutes, dayOfWeek };
};
