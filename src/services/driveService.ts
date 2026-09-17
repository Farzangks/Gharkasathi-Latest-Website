import { DriveDocumentItem } from '../types';

const DRIVE_API_URL = 'https://www.googleapis.com/drive/v3/files';
const DRIVE_UPLOAD_URL = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';

/**
 * List files from the user's Google Drive matching architecture documents
 */
export async function listDriveFiles(accessToken: string): Promise<DriveDocumentItem[]> {
  try {
    const query = encodeURIComponent("trashed = false and (mimeType = 'application/json' or mimeType = 'text/markdown' or mimeType = 'text/plain' or name contains 'Gharkasathi' or name contains 'Architecture')");
    const fields = encodeURIComponent('files(id, name, mimeType, modifiedTime, size, webViewLink, iconLink)');
    const url = `${DRIVE_API_URL}?q=${query}&fields=${fields}&pageSize=20&orderBy=modifiedTime desc`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('UNAUTHORIZED_EXPIRED_TOKEN');
      }
      const errBody = await res.text();
      throw new Error(`Google Drive API error (${res.status}): ${errBody}`);
    }

    const data = await res.json();
    return data.files || [];
  } catch (error) {
    console.error('Failed to list files from Google Drive:', error);
    throw error;
  }
}

/**
 * Upload an architecture blueprint document to the user's Google Drive
 */
export async function uploadArchitectureDocToDrive(
  accessToken: string,
  filename: string,
  content: string,
  mimeType: string = 'text/markdown'
): Promise<DriveDocumentItem> {
  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const metadata = {
    name: filename,
    mimeType: mimeType,
    description: 'Gharkasathi Technical Architecture Strategy blueprint exported from CTO console.',
  };

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    `Content-Type: ${mimeType}; charset=UTF-8\r\n\r\n` +
    content +
    closeDelimiter;

  const res = await fetch(DRIVE_UPLOAD_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body: multipartRequestBody,
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('UNAUTHORIZED_EXPIRED_TOKEN');
    }
    const errBody = await res.text();
    throw new Error(`Failed to upload to Google Drive (${res.status}): ${errBody}`);
  }

  const uploadedFile = await res.json();
  return uploadedFile;
}
