import React from 'react';
import { Color, generateGradient } from '../utils/colorUtils';

interface OutputCodeProps {
  text: string;
  colors: Color[];
  charsPerColor: number;
}

export const OutputCode: React.FC<OutputCodeProps> = ({ text, colors, charsPerColor }) => {
  if (!text) {
    return null;
  }

  const textArray = text.split('');
  const totalColors = Math.ceil(textArray.length / charsPerColor);
  const gradientColors = generateGradient(colors, totalColors);

  let minecraftCode = '';
  textArray.forEach((char, index) => {
    const colorIndex = Math.floor(index / charsPerColor);
    const color = gradientColors[Math.min(colorIndex, gradientColors.length - 1)];
    minecraftCode += `§x${color.substring(1).split('').map(c => `§${c}`).join('')}${char}`;
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(minecraftCode);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Готовый код</h3>
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition-colors"
        >
          Копировать
        </button>
      </div>
      <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
        <code className="text-sm font-mono whitespace-pre-wrap break-all">
          {minecraftCode}
        </code>
      </div>
    </div>
  );
}; 