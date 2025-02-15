const getDomainFromUrl = (url: string): string => {
  const urlObject = new URL(url);
  return urlObject.hostname;
};

export const getFaviconUrl = (url: string, size: number): string => {
  try {
    return `https://www.google.com/s2/favicons?domain=${getDomainFromUrl(url)}&sz=${size}`;
  } catch (error) {
    return '';
  }
};
