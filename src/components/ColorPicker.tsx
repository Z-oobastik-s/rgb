import React, { useState } from 'react';

interface Color {
  hex: string;
  position: number;
}

interface ColorPickerProps {
  onColorChange: (colors: Color[]) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ onColorChange }) => {
  const [colors, setColors] = useState<Color[]>([
    { hex: '#ff0000', position: 0 },
    { hex: '#00ff00', position: 50 },
    { hex: '#0000ff', position: 100 }
  ]);

  const handleColorChange = (index: number, newColor: string) => {
    const newColors = [...colors];
    newColors[index] = { ...newColors[index], hex: newColor };
    setColors(newColors);
    onColorChange(newColors);
  };

  const handlePositionChange = (index: number, newPosition: number) => {
    const newColors = [...colors];
    newColors[index] = { ...newColors[index], position: newPosition };
    setColors(newColors);
    onColorChange(newColors);
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-800 rounded-lg">
      <h3 className="text-xl font-bold">Цвета градиента</h3>
      {colors.map((color, index) => (
        <div key={index} className="flex items-center gap-4">
          <input
            type="color"
            value={color.hex}
            onChange={(e) => handleColorChange(index, e.target.value)}
            className="w-12 h-12 rounded cursor-pointer"
          />
          <input
            type="range"
            min="0"
            max="100"
            value={color.position}
            onChange={(e) => handlePositionChange(index, parseInt(e.target.value))}
            className="flex-1"
          />
          <span className="w-12 text-center">{color.position}%</span>
        </div>
      ))}
      <button
        onClick={() => {
          const newColors = [...colors, { hex: '#ffffff', position: 100 }];
          setColors(newColors);
          onColorChange(newColors);
        }}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
      >
        Добавить цвет
      </button>
    </div>
  );
}; 