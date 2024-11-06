export const getGhostImgPath = (
  baseUrl: string,
  imgUrl: string,
  width = 0
): string => {
  if (!imgUrl) return "";

  const cleanedBaseUrl = baseUrl.replace(/\/+$/, ""); // Remove trailing slash from baseUrl
  const cleanedImgUrl = imgUrl.replace(/^\//, ""); // Remove leading slash from imgUrl if present

  if (!imgUrl.startsWith(cleanedBaseUrl)) {
    return imgUrl; // Return as-is if imgUrl isn't part of baseUrl
  }

  const relativePath = imgUrl.substring(
    `${cleanedBaseUrl}/content/images`.length
  );

  if (width > 0) {
    return `${cleanedBaseUrl}/content/images/size/w${width}/${relativePath}`;
  }
  return `${cleanedBaseUrl}/content/images/${relativePath}`;
};

export const truncate = (input: string, size: number): string =>
  input.length > size ? `${input.substring(0, size)}...` : input;

export const formatDate = (dateInput: string): string => {
  const dateObject = new Date(dateInput);
  return dateObject.toDateString();
};

export const uniqWith = <T>(
  arr: Array<T>,
  fn: (element: T, step: T) => number
): Array<T> =>
  arr.filter(
    (element, index) => arr.findIndex((step) => fn(element, step)) === index
  );
