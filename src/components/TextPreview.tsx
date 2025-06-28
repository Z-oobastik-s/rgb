import React from 'react';
import { Color, generateGradient } from '../utils/colorUtils';

interface TextPreviewProps {
  text: string;
  colors: Color[];
  charsPerColor: number;
}

export const TextPreview: React.FC<TextPreviewProps> = ({ text, colors, charsPerColor }) => {
  if (!text) {
    return <div className="text-gray-500">Введите текст для предпросмотра</div>;
  }

  const textArray = text.split('');
  const totalColors = Math.ceil(textArray.length / charsPerColor);
  const gradientColors = generateGradient(colors, totalColors);

  const coloredText = textArray.map((char, index) => {
    const colorIndex = Math.floor(index / charsPerColor);
    const color = gradientColors[Math.min(colorIndex, gradientColors.length - 1)];
    
    return (
      <span key={index} style={{ color }}>
        {char}
      </span>
    );
  });

  return (
    <div className="p-4 bg-gray-800 rounded-lg min-h-[100px] flex items-center justify-center text-2xl">
      {coloredText}
    </div>
  );
}; 