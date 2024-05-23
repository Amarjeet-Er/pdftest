let isFrontCamera = true;
let videoStream;

function selectOption(event) {
    alert("selectOption triggered with event:"+ event);
    const imagebox = document.getElementById('imagebox');
    const video = document.getElementById('video');
    const selectedImage = document.getElementById('selectedImage');
    const captureButton = document.getElementById('captureButton');
    const submitButton = document.getElementById('submitButton');
    const fileInput = document.getElementById('fileInput');

    if (event === 'camera') {
        alert("Camera option selected");
        imagebox.style.display = 'block';
        video.style.display = 'block';
        selectedImage.style.display = 'none';
        captureButton.style.display = 'block';
        submitButton.style.display = 'none';
        fileInput.style.display = 'none';
        initCamera();
    } else if (event === 'gallery') {
        alert("Gallery option selected");
        fileInput.style.display = 'none';
        fileInput.click();
        video.style.display = 'none';
        captureButton.style.display = 'none';
        submitButton.style.display = 'none';
    }
}

async function initCamera() {
    alert("initCamera triggered");
    const video = document.getElementById('video');
    try {
        if (videoStream) {
            alert("Stopping existing video stream");
            videoStream.getTracks().forEach(track => track.stop());
        }

        alert("Accessing user media");
        videoStream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: isFrontCamera ? "user" : "environment"
            }
        });

        alert("Setting video source to video stream");
        video.srcObject = videoStream;
        await video.play();
        alert("Video is playing");
    } catch (error) {
        alert("Error accessing camera. Please make sure it's allowed and try again.", error);
    }
}

function captureImage() {
    alert("captureImage triggered");
    const video = document.getElementById('video');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg');
    alert("Captured image data:"+ imageData);

    const selectedImage = document.getElementById('selectedImage');
    selectedImage.src = imageData;
    selectedImage.style.display = 'block';

    video.style.display = 'none';
    document.getElementById('captureButton').style.display = 'none';
    document.getElementById('submitButton').style.display = 'block';
}

function handleFileSelect(event) {
    alert("handleFileSelect triggered with event:"+ event);
    const file = event.target.files[0];
    alert("Selected file:"+ file);
    const reader = new FileReader();
    reader.onload = function(e) {
        alert("FileReader onload triggered with result:"+ e.target.result);
        const selectedImage = document.getElementById('selectedImage');
        alert("selected image "+ selectedImage)
        selectedImage.src = e.target.result;
        selectedImage.style.display = 'block';

        document.getElementById('imagebox').style.display = 'block';
        document.getElementById('submitButton').style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function submit() {
    alert("Submit function triggered");
    // Add submit logic here
}

// Add event listeners
document.getElementById('fileInput').addEventListener('change', handleFileSelect);
// alert("Event listener for file input change added");
