export interface Color {
  hex: string;
  position: number;
}

export function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error('Invalid hex color');
  }
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ];
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

export function interpolateColor(color1: [number, number, number], color2: [number, number, number], factor: number): [number, number, number] {
  return [
    Math.round(color1[0] + (color2[0] - color1[0]) * factor),
    Math.round(color1[1] + (color2[1] - color1[1]) * factor),
    Math.round(color1[2] + (color2[2] - color1[2]) * factor)
  ];
}

export function generateGradient(colors: Color[], steps: number): string[] {
  if (colors.length < 2) {
    return [colors[0].hex];
  }

  // Sort colors by position
  const sortedColors = [...colors].sort((a, b) => a.position - b.position);
  const result: string[] = [];

  for (let i = 0; i < steps; i++) {
    const position = (i / (steps - 1)) * 100;
    
    // Find the two colors to interpolate between
    let color1Index = 0;
    let color2Index = 1;
    for (let j = 0; j < sortedColors.length - 1; j++) {
      if (position >= sortedColors[j].position && position <= sortedColors[j + 1].position) {
        color1Index = j;
        color2Index = j + 1;
        break;
      }
    }

    const color1 = hexToRgb(sortedColors[color1Index].hex);
    const color2 = hexToRgb(sortedColors[color2Index].hex);
    
    const colorRange = sortedColors[color2Index].position - sortedColors[color1Index].position;
    const factor = colorRange === 0 ? 0 : (position - sortedColors[color1Index].position) / colorRange;
    
    const interpolated = interpolateColor(color1, color2, factor);
    result.push(rgbToHex(...interpolated));
  }

  return result;
} 