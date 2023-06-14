export const titleEclipse = (title: string, length: number) => {
  if (title.length > length) {
    return [...title].splice(0, length).join('') + '...';
  }
  return title;
};
