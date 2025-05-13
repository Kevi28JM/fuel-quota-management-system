// qrGenerator.js
const QRCode = require('qrcode');

async function generateQRCode(data) {
  try {
    return await QRCode.toDataURL(data); // returns base64 string
  } catch (err) {
    throw new Error('QR Code generation failed');
  }
}

module.exports = generateQRCode;
