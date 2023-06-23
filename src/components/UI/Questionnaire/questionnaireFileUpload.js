import React, { useState, useRef } from 'react';
import { ReactSVG } from 'react-svg';
import { toast } from "react-toastify";
import Button from '../button';

import uploadIcon from 'images/svg/upload-file-icon.svg';
import deleteBinIcon from "images/svg/deleteBin.svg";
import fileIcon from 'images/svg/file-icon.svg';

const QuestionnaireFileUpload = (props) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const { onClick } = props;

  const handleDelete = () => {
    setUploadedFile(null);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };
  
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size exceeds the limit', { toastId: 'file' });
      } else if (file.type.startsWith('image/')) {
        console.log('Image selected:', file);
        setUploadedFile(file);
      } else {
        toast.error('Please upload image here');
      }
    }
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
        <div
        className={`questionnaire-file ${isDragOver ? 'drag-over' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={uploadedFile ? null : handleDrop}
        onClick={uploadedFile ? null : handleFileClick}
        >
            {uploadedFile ? (
                <div className="questionnaire-file__wrapper">
                    <ReactSVG src={fileIcon} className="questionnaire-file__icon" />
                    <p className="typography__p questionnaire-file__text">
                        File: {uploadedFile.name}
                        <button onClick={handleDelete} className="questionnaire-file__delete-icon">
                            <ReactSVG src={deleteBinIcon} />
                        </button>
                    </p>
                </div>
            ) : (
                <div className="questionnaire-file__wrapper">
                    <ReactSVG src={uploadIcon} className="questionnaire-file__icon" />
                    <p className="typography__p">Choose image or drag here</p>
                    <p className="typography__small--inter">
                        Size limit: 10MB 
                    </p>
                </div>
            )}
            <input
                type="file"
                id="fileInput"
                accept="image/*"
                className="questionnaire-file__input"
                onChange={handleFileInputChange}
                ref={fileInputRef}
            />
        </div>
        { uploadedFile && (
            <Button
                value="Continue"
                type="dark"
                isArrowShow={true}
                onClick={onClick}
            />
        )}
    </div>
  );
};

export default QuestionnaireFileUpload;
