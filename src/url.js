export const appendQuery = (url, query, base) => {
  if (typeof query !== 'object') return url;
  const newUrl = new URL(url, base || window.location.origin);
  Object.entries(query).forEach(([key, value]) => {
    newUrl.searchParams.append(key, value)
  })
  return newUrl.toString();
}