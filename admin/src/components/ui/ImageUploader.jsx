import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const API_BASE = 'http://localhost:5000';

const ImageUploader = ({ value, onChange, multiple = false }) => {
  const [uploading, setUploading] = useState(false);

  const images = Array.isArray(value) ? value : value ? [value] : [];

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadedUrls = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append('image', file);
        const { data } = await api.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        uploadedUrls.push(data.url);
      }

      if (multiple) {
        onChange([...images, ...uploadedUrls]);
      } else {
        onChange(uploadedUrls[0]);
      }
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (urlToRemove) => {
    if (multiple) {
      onChange(images.filter((url) => url !== urlToRemove));
    } else {
      onChange('');
    }
  };

  const getFullUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${API_BASE}${url}`;
  };

  return (
    <div className="space-y-4 w-full">
      {/* Upload Area */}
      {(!multiple && images.length === 0) || multiple ? (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-borderC rounded-xl cursor-pointer bg-background/30 hover:bg-background/50 transition-all group overflow-hidden relative">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            ) : (
              <>
                <Upload className="w-8 h-8 text-textMuted group-hover:text-primary transition-colors mb-2" />
                <p className="text-xs text-textMuted font-medium">
                  <span className="text-primary font-bold">Click to upload</span> or drag and drop
                </p>
                <p className="text-[10px] text-textMuted mt-1">PNG, JPG or WEBP (Max. 5MB)</p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            multiple={multiple}
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      ) : null}

      {/* Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((url, idx) => (
            <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-borderC shadow-sm bg-white">
              <img
                src={getFullUrl(url)}
                alt="Uploaded"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-navy-dark/0 group-hover:bg-navy-dark/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="bg-danger text-white p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
