import { QRCodeCanvas } from 'qrcode.react';
import { memo } from 'react';

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
}

function QRCodeGenerator({ value, size = 200 }: QRCodeGeneratorProps) {
  if (!value) return null;
  return <QRCodeCanvas value={value} size={size} level="H" includeMargin />;
}

export default memo(QRCodeGenerator);