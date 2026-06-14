import { QRCodeCanvas } from 'qrcode.react';

export default function QRCodeGenerator({ value, size = 200 }) {
  return <QRCodeCanvas value={value} size={size} level="H" includeMargin />;
}