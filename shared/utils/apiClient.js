const parseResponseBody = async response => {
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();
  return text ? { message: text } : null;
};

export const apiRequest = async (url, { method = 'GET', token, body, headers = {}, credentials = 'include' } = {}) => {
  const requestHeaders = new Headers(headers);

  if (token) {
    requestHeaders.set('Authorization', `Bearer ${token}`);
  }

  const requestInit = {
    method,
    credentials,
    headers: requestHeaders,
  };

  if (body !== undefined) {
    if (body instanceof FormData) {
      requestInit.body = body;
    } else {
      if (!requestHeaders.has('Content-Type')) {
        requestHeaders.set('Content-Type', 'application/json');
      }
      requestInit.body = JSON.stringify(body);
    }
  }

  const response = await fetch(url, requestInit);
  const data = await parseResponseBody(response);

  if (!response.ok) {
    const error = new Error(data?.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};
