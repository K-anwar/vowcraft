const DEFAULT_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

export interface RSVPSubmission {
  guest: string;
  attending: string;
  pax: number | string;
  message: string;
  slug?: string;
  [key: string]: unknown;
}

export interface SubmitResult {
  status: 'success' | 'error';
  message: string;
}

/**
 * Submit RSVP atau Check-in ke Google Sheets via Apps Script
 */
export async function submitRSVP(
  url: string,
  data: RSVPSubmission
): Promise<SubmitResult> {
  const scriptUrl = url || DEFAULT_SCRIPT_URL;
  if (!scriptUrl) {
    throw new Error('Google Script URL tidak dikonfigurasi');
  }

  // Filter data yang memiliki nilai
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  }

  const fullUrl = `${scriptUrl}?${params.toString()}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    // Langsung fetch tanpa menyimpan response karena mode 'no-cors'
    await fetch(fullUrl, {
      method: 'GET',
      mode: 'no-cors',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    return { status: 'success', message: 'Permintaan terkirim' };
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Timeout: Server tidak merespons');
      }
      throw error;
    }
    throw new Error('Gagal mengirim data');
  }
}

/**
 * Alias untuk submitRSVP, khusus check-in
 */
export async function submitCheckin(
  url: string,
  data: RSVPSubmission
): Promise<SubmitResult> {
  return submitRSVP(url, data);
}