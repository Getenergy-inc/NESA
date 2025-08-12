"use client";

import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Image, Video, CheckCircle, AlertCircle } from 'lucide-react';

interface EndorsementFileUploadProps {
  label: string;
  name: string;
  accept: string;
  maxSize?: number; // in MB
  required?: boolean;
  error?: string;
  value?: File | null;
  onChange: (file: File | null) => void;
  description?: string;
  preview?: boolean;
}

const EndorsementFileUpload: React.FC<EndorsementFileUploadProps> = ({
  label,
  name,
  accept,
  maxSize = 5,
  required = false,
  error,
  value,
  onChange,
  description,
  preview = true
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setUploadError('');

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setUploadError(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Check file type
    const acceptedTypes = accept.split(',').map(type => type.trim());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    const mimeType = file.type;

    const isValidType = acceptedTypes.some(type => 
      type === mimeType || type === fileExtension || 
      (type.startsWith('.') && fileExtension === type)
    );

    if (!isValidType) {
      setUploadError(`File type not supported. Accepted types: ${accept}`);
      return;
    }

    onChange(file);
  };

  const handleRemove = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-8 h-8 text-blue-500" />;
    } else if (file.type.startsWith('video/')) {
      return <Video className="w-8 h-8 text-purple-500" />;
    } else {
      return <FileText className="w-8 h-8 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="mb-4">
      <label className={`block text-sm font-medium mb-2 text-gray-700 ${
        required ? "after:content-['*'] after:text-red-500 after:ml-1" : ''
      }`}>
        {label}
      </label>
      
      {description && (
        <p className="text-sm text-gray-600 mb-3">{description}</p>
      )}

      {!value ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 cursor-pointer ${
            dragActive 
              ? 'border-[#ea580c] bg-[#ea580c]/5' 
              : error || uploadError
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 hover:border-[#ea580c] hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            name={name}
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />
          
          <Upload className={`w-12 h-12 mx-auto mb-4 ${
            dragActive ? 'text-[#ea580c]' : 'text-gray-400'
          }`} />
          
          <p className="text-lg font-medium text-gray-900 mb-2">
            {dragActive ? 'Drop file here' : 'Click to upload or drag and drop'}
          </p>
          
          <p className="text-sm text-gray-600">
            {accept.includes('image') && 'SVG, PNG, JPG'}
            {accept.includes('video') && 'MP4, MOV, AVI'}
            {accept.includes('.pdf') && 'PDF'}
            {maxSize && ` (max ${maxSize}MB)`}
          </p>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getFileIcon(value)}
              <div>
                <p className="font-medium text-gray-900 truncate max-w-xs">
                  {value.name}
                </p>
                <p className="text-sm text-gray-600">
                  {formatFileSize(value.size)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <button
                type="button"
                onClick={handleRemove}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                title="Remove file"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
          
          {preview && value.type.startsWith('image/') && (
            <div className="mt-3">
              <img
                src={URL.createObjectURL(value)}
                alt="Preview"
                className="max-w-full h-32 object-contain rounded border"
              />
            </div>
          )}
        </div>
      )}

      {(error || uploadError) && (
        <div className="flex items-center gap-2 mt-2 text-red-600">
          <AlertCircle className="w-4 h-4" />
          <p className="text-sm">{error || uploadError}</p>
        </div>
      )}
    </div>
  );
};

export default EndorsementFileUpload;
