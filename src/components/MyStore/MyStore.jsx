import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function ImageUpload() {
  const [images, setImages] = useState([]);

  const onDrop = (acceptedFiles) => {
    const imageFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setImages(prevImages => [...prevImages, ...imageFiles]);
  };

  const uploadImages = async () => {
    try {
      const formData = new FormData();
      images.forEach(image => formData.append('images', image));
      
      // 이미지 업로드를 위한 서버 엔드포인트
      await axios.post('https://example.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Images uploaded successfully!');
      // 이미지 업로드 후 이미지 목록 초기화
      setImages([]);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*', multiple: true });

  return (
    <div>
      <section className="container">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <div>
          {images.map((image, index) => (
            <image
              key={index}
              src={image.preview}
              alt={`Uploaded Image ${index + 1}`}
              style={{ width: '100px', height: '100px', margin: '5px' }}
            />
          ))}
        </div>
        <button onClick={uploadImages}>Upload Images</button>
      </section>
    </div>
  );
}

export default ImageUpload;