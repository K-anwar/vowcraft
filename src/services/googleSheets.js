export async function submitRSVP(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' }, // ✅ ubah ke text/plain
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Network error');
  return response.json();
}

export async function submitCheckin(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Network error');
  return response.json();
}