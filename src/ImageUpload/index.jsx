import React, { useState } from 'react';
import Uppy from '@uppy/core';
import Webcam from '@uppy/webcam';
import ImageEditor from '@uppy/image-editor';
import { Dashboard } from '@uppy/react';
import Tus from '@uppy/tus';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/webcam/dist/style.min.css';
import '@uppy/image-editor/dist/style.min.css';

function UppyComponent({
  multiple,
  allowedExtensions = [],
  fileSize,
  imageOrientation,
  squareRatio = 1 
}) {
  const uploadPath = 'https://tusd.tusdemo.net/files/';

  const [uppy] = useState(() => 
    new Uppy({
      restrictions: {
        maxNumberOfFiles: multiple ? null : 1,
        allowedFileTypes: allowedExtensions.length > 0 ? allowedExtensions : null,
        maxFileSize: fileSize,
      }
    })
      .use(Webcam)
      .use(ImageEditor, {
        cropperOptions: {
          aspectRatio: imageOrientation === 'square' ? squareRatio : (imageOrientation === 'landscape' ? 16 / 9 : null),
          croppedFileType: 'image/jpeg',
          viewMode: 1, // Restrict the cropping area to within the image
          dragMode: 'move', // Allow moving the image within the crop box
          autoCropArea: 1, // Use the entire image area by default
          cropBoxResizable: false, // Disable resizing of the crop box
          cropBoxMovable: true, // Disable moving the crop box
          zoomable: false, // Disable zooming
          rotatable: false, // Disable rotation
        },
        actions: {
          revert: false,
          rotate: false, // Disable rotation
          granularRotate: false, // Disable granular rotation
          flip: false, // Disable flipping
          zoomIn: false, // Disable zoom in
          zoomOut: false, // Disable zoom out
          cropSquare: imageOrientation === 'square',
          cropWidescreen: imageOrientation === 'landscape',
          cropWidescreenVertical: false,
        },
      })
      .use(Tus, {
        endpoint: uploadPath,
        fieldName: 'file',
        formData: true,
        headers: {
          Authorization: 'Bearer your-token-here',
          Accept: 'application/json',
        },
      })
  );

  return (
    <Dashboard 
      uppy={uppy}
      plugins={['Webcam', 'ImageEditor']}
      proudlyDisplayPoweredByUppy={false}
    />
  );
}

export default UppyComponent;