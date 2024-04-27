export const fetcher = async (url: string, queryParams: string) => {
  console.log("Fetcher");
  let urlWithParams = url;
  if (queryParams) {
    urlWithParams = url + queryParams;
  }
  const response = await fetch(urlWithParams);
  if (response.status === 204) return null;
  return response.json();
};
