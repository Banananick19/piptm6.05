function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

download_file.onclick = async (e) => {
    e.preventDefault();
    let filename = input_file_name.value;
    window.open(window.location.origin + "/file?filename=" + filename, '_blank').focus();
}

form.onsubmit = async (e) => {
    e.preventDefault();
    let data = new FormData()
    let fileUploader = document.querySelector('#input_file');
    let file = dataURLtoFile(cropper.getCroppedCanvas().toDataURL("image/png"), fileUploader.files[0].name);
    data.append('file', file)
    let response = await fetch('/upload', {
      method: 'POST',
      body: data
    });

    let result = await response.json();

    document.querySelector('#result-card').innerHTML = result.filename;
  };

const handleChange = () => {
  const fileUploader = document.querySelector('#input_file');
  const getFile = fileUploader.files
  if (getFile.length !== 0) {
    const uploadedFile = getFile[0];
    readFile(uploadedFile);
  }
}

var cropper = null;

const readFile = (uploadedFile) => {
  if (uploadedFile) {
    const reader = new FileReader();
    reader.onload = () => {
        const parent = document.querySelector('.preview-box');
        parent.innerHTML = `<img id="image" src=${reader.result} />`;
        const image = document.getElementById('image');
        cropper = new Cropper(image, {
        crop(event) {
            console.log(event);
        },
        });
    };

    reader.readAsDataURL(uploadedFile);
  }
};
