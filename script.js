const imageInput = document.getElementById("imageInput");

imageInput.addEventListener("change", handleImageUpload);

function handleImageUpload(e) {
    const files = e.target.files;

    if (files.length > 0) {
        for (const file of files) {
            const reader = new FileReader();

            reader.onload = function (event) {
                const img = new Image();
                img.src = event.target.result;

                img.onload = function () {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");

                    // Set canvas dimensions to 1:1 ratio
                    const size = Math.max(img.width, img.height);
                    canvas.width = size;
                    canvas.height = size;

                    // Clear canvas with transparent background
                    ctx.clearRect(0, 0, size, size);

                    // Calculate image position
                    const x = (size - img.width) / 2;
                    const y = (size - img.height) / 2;

                    // Draw the image onto the canvas
                    ctx.drawImage(img, x, y);

                    // Enable download link
                    const dataURL = canvas.toDataURL("image/png");

                    // Create an anchor element for automatic download
                    const downloadLink = document.createElement("a");
                    downloadLink.href = dataURL;
                    
                    // Set the filename to match the uploaded image's filename
                    downloadLink.download = file.name;
                    downloadLink.style.display = "none";

                    // Append the download link to the body
                    document.body.appendChild(downloadLink);

                    // Trigger automatic download
                    downloadLink.click();

                    // Remove the download link from the DOM
                    document.body.removeChild(downloadLink);
                };

                img.src = event.target.result;
            };

            reader.readAsDataURL(file);
        }
    }
}
