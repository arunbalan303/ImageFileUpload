import React from 'react';
import UppyComponent from './ImageUpload/index'; 
function App() {
  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/webp']; 
  const maxFileSize = 5 * 1024 * 1024; 
  const uploadEndpoint = 'https://your-server.com/upload'; 
  const isMultiple = true; 
  const imageOrientation = 'square'; 

  return (
    <div>
      <h1>File Upload Example</h1>
      <UppyComponent 
         multiple={isMultiple}
        allowedExtensions={allowedFileTypes}
        fileSize={maxFileSize}
        uploadPath={uploadEndpoint}
        imageOrientation={imageOrientation}
      />
    </div>
  );
}

export default App;
