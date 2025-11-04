const API_BASE_URL = "https://polysolve-api.jono-rams.work";

self.onmessage = async (event) => {
  const { type, payload, id } = event.data;

  if (type === 'format') {
    try {
      const response = await fetch(`${API_BASE_URL}/format`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coeffs: payload }),
      });

      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
      
      const data = await response.json();
      // Pass the original ID back for the React component
      self.postMessage({ type: 'result', requestType: 'format', id: id, payload: data.formatted_string });

    } catch (error) {
      // Don't send an error for formatting
    }
    return;
  }

  let endpoint = type;
  let body = JSON.stringify(payload);

  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.detail || response.statusText);
    }

    const data = await response.json();
    self.postMessage({ type: 'result', requestType: type, payload: data.result });

  } catch (error) {
    self.postMessage({ type: 'error', payload: error.message });
  }
};