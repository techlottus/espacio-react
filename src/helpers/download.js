export const downloadFile = async (nameFile, url) => {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", nameFile);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      return;
    })
    .catch((e) => {
      throw e;
    });
};
