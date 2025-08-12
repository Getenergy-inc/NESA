"use client";

import React, { useState, useRef, forwardRef } from 'react';
import { Upload, X, FileText, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { FormFieldProps, FileUpload } from '@/lib/types/signup';

interface FormFileUploadProps extends Omit<FormFieldProps, 'type'> {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  maxFiles?: number;
  value?: FileUpload[];
  onChange?: (files: FileUpload[]) => void;
  onBlur?: () => void;
  allowedTypes?: string[];
  showPreview?: boolean;
}

const FormFileUpload = forwardRef<HTMLInputElement, FormFileUploadProps>(({
  label,
  name,
  placeholder = 'Click to upload or drag and drop',
  required = false,
  error,
  disabled = false,
  className = '',
  accept = 'image/*,.pdf',
  multiple = false,
  maxSize = 5 * 1024 * 1024, // 5MB default
  maxFiles = 1,
  value = [],
  onChange,
  onBlur,
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  showPreview = true,
  ...props
}, ref) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const labelClasses = `
    block text-sm font-medium mb-2 transition-colors duration-200
    ${error ? 'text-red-700' : 'text-gray-700'}
    ${required ? "after:content-['*'] after:text-red-500 after:ml-1" : ''}
  `;

  const validateFile = (file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return `File type ${file.type} is not allowed`;
    }
    
    if (file.size > maxSize) {
      return `File size must be less than ${formatFileSize(maxSize)}`;
    }
    
    return null;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const createFileUpload = (file: File): FileUpload => {
    const fileUpload: FileUpload = {
      file,
      uploadProgress: 0,
      uploaded: false
    };

    // Create preview for images
    if (file.type.startsWith('image/') && showPreview) {
      const reader = new FileReader();
      reader.onload = (e) => {
        fileUpload.preview = e.target?.result as string;
        onChange?.([...value.filter(f => f.file !== file), fileUpload]);
      };
      reader.readAsDataURL(file);
    }

    return fileUpload;
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newErrors: string[] = [];
    const newFiles: FileUpload[] = [];
    const currentFileCount = value.length;

    Array.from(files).forEach((file, index) => {
      if (currentFileCount + newFiles.length >= maxFiles) {
        newErrors.push(`Maximum ${maxFiles} file(s) allowed`);
        return;
      }

      const validationError = validateFile(file);
      if (validationError) {
        newErrors.push(`${file.name}: ${validationError}`);
        return;
      }

      newFiles.push(createFileUpload(file));
    });

    setUploadErrors(newErrors);

    if (newFiles.length > 0) {
      const updatedFiles = multiple ? [...value, ...newFiles] : newFiles;
      onChange?.(updatedFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (!disabled) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const removeFile = (index: number) => {
    const updatedFiles = value.filter((_, i) => i !== index);
    onChange?.(updatedFiles);
  };

  const openFileDialog = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <ImageIcon className="h-8 w-8 text-blue-500" />;
    }
    return <FileText className="h-8 w-8 text-red-500" />;
  };

  const dropzoneClasses = `
    relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 cursor-pointer
    ${isDragOver 
      ? 'border-orange-500 bg-orange-50' 
      : error 
        ? 'border-red-500 bg-red-50' 
        : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
    }
    ${disabled ? 'cursor-not-allowed opacity-50' : ''}
    ${className}
  `;

  return (
    <div className="mb-6">
      <label className={labelClasses}>
        {label}
      </label>

      <div
        className={dropzoneClasses}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            e.preventDefault();
            openFileDialog();
          }
        }}
        aria-label={`Upload ${label.toLowerCase()}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          onBlur={onBlur}
          className="hidden"
          disabled={disabled}
          aria-describedby={error ? `${name}-error` : undefined}
          {...props}
        />

        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-sm text-gray-600 mb-2">
            {placeholder}
          </p>
          <p className="text-xs text-gray-500">
            {allowedTypes.includes('image/jpeg') && 'Images: JPG, PNG, WebP'} 
            {allowedTypes.includes('application/pdf') && ' • PDF documents'}
            <br />
            Max size: {formatFileSize(maxSize)}
            {multiple && ` • Max files: ${maxFiles}`}
          </p>
        </div>
      </div>

      {/* File previews */}
      {value.length > 0 && (
        <div className="mt-4 space-y-2">
          {value.map((fileUpload, index) => (
            <div
              key={index}
              className="flex items-center p-3 bg-white border border-gray-200 rounded-lg"
            >
              <div className="flex-shrink-0 mr-3">
                {fileUpload.preview ? (
                  <img
                    src={fileUpload.preview}
                    alt="Preview"
                    className="h-10 w-10 object-cover rounded"
                  />
                ) : (
                  getFileIcon(fileUpload.file.type)
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {fileUpload.file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(fileUpload.file.size)}
                </p>
              </div>
              
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="flex-shrink-0 ml-2 p-1 text-gray-400 hover:text-red-500 focus:outline-none focus:text-red-500"
                aria-label={`Remove ${fileUpload.file.name}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload errors */}
      {uploadErrors.length > 0 && (
        <div className="mt-2 space-y-1">
          {uploadErrors.map((error, index) => (
            <p key={index} className="text-sm text-red-600 flex items-start">
              <AlertCircle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
              {error}
            </p>
          ))}
        </div>
      )}

      {/* General error */}
      {error && (
        <p 
          id={`${name}-error`}
          className="mt-2 text-sm text-red-600 flex items-start"
          role="alert"
        >
          <span className="inline-block w-4 h-4 mr-1 mt-0.5 flex-shrink-0">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </span>
          {error}
        </p>
      )}
    </div>
  );
});

FormFileUpload.displayName = 'FormFileUpload';

export default FormFileUpload;
