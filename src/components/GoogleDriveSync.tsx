import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { 
  HardDrive, 
  UploadCloud, 
  RefreshCw, 
  ExternalLink, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Download,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { DriveDocumentItem } from '../types';
import { listDriveFiles, uploadArchitectureDocToDrive } from '../services/driveService';
import { ARCHITECTURE_MARKDOWN_EXPORT } from '../data/architectureData';

interface GoogleDriveSyncProps {
  user: User | null;
  accessToken: string | null;
  needsAuth: boolean;
  onLoginClick: () => void;
}

export const GoogleDriveSync: React.FC<GoogleDriveSyncProps> = ({
  user,
  accessToken,
  needsAuth,
  onLoginClick,
}) => {
  const [driveFiles, setDriveFiles] = useState<DriveDocumentItem[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const fetchFiles = async () => {
    if (!accessToken) return;
    setLoadingFiles(true);
    setError(null);
    try {
      const files = await listDriveFiles(accessToken);
      setDriveFiles(files);
    } catch (err: any) {
      console.error('Fetch drive files error:', err);
      if (err?.message === 'UNAUTHORIZED_EXPIRED_TOKEN') {
        setError('Google Drive session expired. Please re-authenticate.');
      } else {
        setError('Failed to fetch files from Google Drive. Please verify your permissions.');
      }
    } finally {
      setLoadingFiles(false);
    }
  };

  const handleUploadBlueprint = async () => {
    if (!accessToken) return;
    setUploading(true);
    setError(null);
    setUploadSuccess(null);
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `Gharkasathi_Backend_Architecture_${timestamp}.md`;
      const uploaded = await uploadArchitectureDocToDrive(
        accessToken,
        filename,
        ARCHITECTURE_MARKDOWN_EXPORT,
        'text/markdown'
      );
      setUploadSuccess(`Successfully saved "${uploaded.name || filename}" directly to your Google Drive!`);
      // Refresh file list
      await fetchFiles();
    } catch (err: any) {
      console.error('Upload to Drive error:', err);
      setError(err?.message || 'Failed to sync architecture blueprint to Google Drive.');
    } finally {
      setUploading(false);
    }
  };

  const handleExportLocal = () => {
    const blob = new Blob([ARCHITECTURE_MARKDOWN_EXPORT], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Gharkasathi_Architecture_Blueprint_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div id="google-drive-sync-panel" className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
      <div className="p-6 border-b border-stone-200 bg-stone-50 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <HardDrive className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-stone-900 flex items-center gap-2">
              Google Drive Cloud Synchronization
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                Workspace Drive Active
              </span>
            </h3>
            <p className="text-xs text-stone-500">
              Synchronize, version, and archive Gharkasathi CTO architecture roadmaps and specifications to Google Drive.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {needsAuth || !user ? (
            <button
              id="google-drive-signin-btn"
              onClick={onLoginClick}
              className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <HardDrive className="w-4 h-4 text-emerald-400" />
              Connect Google Drive
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                id="refresh-drive-btn"
                onClick={fetchFiles}
                disabled={loadingFiles}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingFiles ? 'animate-spin' : ''}`} />
                Check Drive
              </button>
              <button
                id="upload-blueprint-btn"
                onClick={handleUploadBlueprint}
                disabled={uploading}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                <UploadCloud className={`w-4 h-4 ${uploading ? 'animate-pulse' : ''}`} />
                {uploading ? 'Exporting to Drive...' : 'Save Blueprint to Drive'}
              </button>
            </div>
          )}

          <button
            id="download-local-btn"
            onClick={handleExportLocal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-medium rounded-lg transition-colors cursor-pointer"
            title="Download local Markdown"
          >
            <Download className="w-3.5 h-3.5" />
            Local .MD
          </button>
        </div>
      </div>

      {/* Notifications banner */}
      {error && (
        <div className="mx-6 mt-4 p-3 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-800 text-xs">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">{error}</div>
        </div>
      )}

      {uploadSuccess && (
        <div className="mx-6 mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-emerald-800 text-xs">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{uploadSuccess}</div>
        </div>
      )}

      {/* Content Area */}
      <div className="p-6">
        {needsAuth || !user ? (
          <div className="bg-stone-50 rounded-lg p-6 border border-dashed border-stone-300 text-center max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-3">
              <HardDrive className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-stone-900 mb-1">
              Google Drive Cloud Storage Not Linked
            </h4>
            <p className="text-xs text-stone-600 mb-4 leading-relaxed">
              Connect your Google Workspace or Google Account to enable automatic versioned backups of Gharkasathi's microservice architecture roadmaps, API contracts, and schema blueprints directly in your Drive.
            </p>
            <button
              onClick={onLoginClick}
              className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Sign In to Authorize Google Drive
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-stone-700 uppercase tracking-wide">
                Linked Drive Architecture Documents ({driveFiles.length})
              </span>
              <span className="text-xs text-stone-500">
                Logged in as: <strong className="text-stone-700 font-medium">{user.email}</strong>
              </span>
            </div>

            {loadingFiles ? (
              <div className="py-8 text-center text-xs text-stone-500 flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-stone-400" />
                Querying Google Drive files...
              </div>
            ) : driveFiles.length === 0 ? (
              <div className="p-6 bg-stone-50 rounded-lg border border-stone-200 text-center">
                <p className="text-xs text-stone-600 mb-2">
                  No Gharkasathi architecture documents found in your Google Drive yet.
                </p>
                <button
                  onClick={handleUploadBlueprint}
                  disabled={uploading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Save First Blueprint to Drive
                </button>
              </div>
            ) : (
              <div className="divide-y divide-stone-100 border border-stone-200 rounded-lg overflow-hidden">
                {driveFiles.map((file) => (
                  <div key={file.id} className="p-3 bg-white hover:bg-stone-50 transition-colors flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-stone-900 truncate">
                          {file.name}
                        </div>
                        <div className="text-[11px] text-stone-400">
                          {file.modifiedTime ? new Date(file.modifiedTime).toLocaleString() : 'Recent'} &bull; {file.mimeType}
                        </div>
                      </div>
                    </div>
                    {file.webViewLink && (
                      <a
                        href={file.webViewLink}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-900 font-medium px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 transition-colors shrink-0"
                      >
                        Open in Drive
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
