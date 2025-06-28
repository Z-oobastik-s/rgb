import { useState } from 'react'
import { ColorPicker } from './components/ColorPicker'
import { TextPreview } from './components/TextPreview'
import { OutputCode } from './components/OutputCode'
import { Color } from './utils/colorUtils'

function App() {
  const [text, setText] = useState('')
  const [colors, setColors] = useState<Color[]>([
    { hex: '#ff0000', position: 0 },
    { hex: '#00ff00', position: 50 },
    { hex: '#0000ff', position: 100 }
  ])
  const [charsPerColor, setCharsPerColor] = useState(1)

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Minecraft Color Generator
        </h1>
        
        <div className="space-y-6">
          {/* Text Input */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Текст</h2>
            <textarea
              className="w-full bg-gray-700 text-white rounded p-3 min-h-[100px]"
              placeholder="Введите текст для градиента..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          {/* Color Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ColorPicker onColorChange={setColors} />
              
              <div className="mt-4 bg-gray-800 rounded-lg p-4">
                <h3 className="text-xl font-bold mb-2">Настройки</h3>
                <div className="flex items-center gap-4">
                  <label>Символов на цвет:</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={charsPerColor}
                    onChange={(e) => setCharsPerColor(Math.max(1, parseInt(e.target.value) || 1))}
                    className="bg-gray-700 rounded px-2 py-1 w-20"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <TextPreview
                text={text}
                colors={colors}
                charsPerColor={charsPerColor}
              />
              
              <OutputCode
                text={text}
                colors={colors}
                charsPerColor={charsPerColor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App 