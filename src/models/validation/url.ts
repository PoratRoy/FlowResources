export const isValidURL = (url: string): boolean => {
  if (typeof url !== 'string' || url.trim() === '') {
    return false;
  }

  try {
    const urlObject = new URL(url);

    if (!['http:', 'https:'].includes(urlObject.protocol)) {
      return false;
    }

    if (!urlObject.hostname.includes('.') || urlObject.hostname.endsWith('.')) {
      return false;
    }

    if (url === `${urlObject.protocol}//${urlObject.hostname}`) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};
