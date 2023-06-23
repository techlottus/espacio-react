
export const fileBase64 = (file,size,maxSize,texts) => {
  return new Promise(((resolve, reject) => {
      if(size <= maxSize) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.toString().split(',')[1]);
        reader.onerror = (error) => reject('Algo salio mal');
      }
      else {
        reject(texts?.procedures?.errorUpload || texts);
      }
      
    })
  );
};
