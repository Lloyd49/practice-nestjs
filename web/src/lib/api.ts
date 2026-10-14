const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

export async function apiFetch(
  path: string,
  options: RequestInit = {},
) {
  return fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
}

export async function getErrorMessage(response: Response, fallback: string) {
  try {
    const data = (await response.json()) as { message?: string | string[] };
    return Array.isArray(data.message) ? data.message.join(', ') : (data.message ?? fallback);
  } catch {
    return fallback;
  }
}
