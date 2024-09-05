export const baseUrls = {
  admin: "http://localhost:9001/admin/",
  compute: "http://localhost:9002/compute/",

  // admin: "http://xykinehrs.com/admin/",
  // compute: "http://xykinehrs.com/compute/",
};

export const getQueryMethod = async (urlPath, service = "admin") => {
  const headers = getHeader();
  const response = await fetch(`${baseUrls[service]}${urlPath}`, {
    method: "GET",
    headers,
  });
  return await response.json();
};

export const getMutationMethod = async (
  method,
  urlPath,
  body,
  service = "admin"
) => {
  const headers = getHeader();
  const response = await fetch(`${baseUrls[service]}${urlPath}`, {
    method,
    headers,
    body: JSON.stringify(body),
  });

  return await response.json();
};
