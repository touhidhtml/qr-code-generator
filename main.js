// generate QR code here

function generateCustomQRCode(links) {
    // Create a new QRCode instance
    var qr = new QRCode(document.getElementById("qrcode-container"), {
        width: 200,
        height: 200,
    });

    // Concatenate links and text and add them to the QR code.
    var concatenatedData = "";
    for (const link of links) {
        concatenatedData += link.text + " --> " + link.url + "\n";
    }
    qr.makeCode(concatenatedData);
}

// get values code here
function addObjectToArray() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const contact = document.getElementById('contact').value;
    const links = [
        {
            url: name,
            text: "Name",
        },
        {
            url: phone,
            text: "Phone",
        },
        {
            url: contact,
            text: "Contact",
        },
    ];
    generateCustomQRCode(links);
}

// try again button

const tryAgainBtn = document.getElementById('tryAgain')

tryAgainBtn.addEventListener('click', function () {
    location.reload();
})

// click button
document.getElementById('generateButton').addEventListener('click', function () {
    if (document.getElementById('name').value === '') {
        document.getElementById('qrShow').innerText = 'Field should not empty'
        document.getElementById('qrShow').style.color = 'red'
    } else {
        addObjectToArray()
        // input disabled
        document.getElementById('name').setAttribute('disabled', true)
        document.getElementById('phone').setAttribute('disabled', true)
        document.getElementById('contact').setAttribute('disabled', true)
        document.getElementById('generateButton').style.display = 'none'
        tryAgainBtn.style.display = 'block'
        document.getElementById('downloadButton').style.display = 'block'
        document.getElementById('shareButton').style.display = 'block'
        document.getElementById('qrShow').style.display = 'none'

    }

})

// For Download Button
document.getElementById('downloadButton').addEventListener('click', function () {
    const qrContainer = document.getElementById('qrcode-container');
    const canvas = qrContainer.querySelector('canvas');
    const imageData = canvas.toDataURL(); // Convert canvas to image data URL
    const fileName = 'qrcode.png';

    // Use FileSaver.js to trigger the download
    saveAs(imageData, fileName);
});

// For Share Button

document.getElementById('shareButton').addEventListener('click', function () {
    const qrContainer = document.getElementById('qrcode-container');
    const canvas = qrContainer.querySelector('canvas');
    const imageData = canvas.toDataURL('image/png'); // Convert canvas to image data URL

    if (navigator.share) {
        // If Web Share API is supported
        navigator.share({
            title: 'Share QR Code',
            text: 'Check out this QR code!',
            url: imageData,
        })
            .then(() => console.log('QR code shared successfully!'))
            .catch((error) => console.error('Error sharing QR code:', error));
    } else {
        // Fallback for browsers that do not support Web Share API
        const downloadLink = document.createElement('a');
        downloadLink.href = imageData;
        downloadLink.download = 'qrcode.png';
        downloadLink.target = '_blank';
        downloadLink.click();
    }
});