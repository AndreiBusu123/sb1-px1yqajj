import React, { useState, useEffect } from 'react';
import { Binary, FileText } from 'lucide-react';

type CompressionStep = {
  input: string;
  output: string;
  description: string;
};

function App() {
  const [text, setText] = useState<string>('');
  const [steps, setSteps] = useState<CompressionStep[]>([]);

  const runLengthEncode = (input: string): CompressionStep[] => {
    const steps: CompressionStep[] = [];
    let encoded = '';
    let count = 1;
    let char = input[0];

    for (let i = 1; i <= input.length; i++) {
      if (i < input.length && input[i] === char) {
        count++;
      } else {
        encoded += count + char;
        steps.push({
          input: input,
          output: encoded,
          description: `Found ${count} occurrence${count > 1 ? 's' : ''} of '${char}'`,
        });
        if (i < input.length) {
          char = input[i];
          count = 1;
        }
      }
    }

    return steps;
  };

  useEffect(() => {
    if (text) {
      setSteps(runLengthEncode(text));
    } else {
      setSteps([]);
    }
  }, [text]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center mb-8 space-x-3">
          <Binary className="w-8 h-8 text-blue-400" />
          <h1 className="text-4xl font-bold">Compression Visualizer</h1>
          <FileText className="w-8 h-8 text-blue-400" />
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-6 shadow-xl mb-8">
            <label className="block text-sm font-medium mb-2">Input Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter text to compress..."
            />
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-6 shadow-xl transform transition-all duration-300 hover:scale-102"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Step {index + 1}</h3>
                    <p className="text-blue-400">{step.description}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">Output:</span>
                      <code className="bg-gray-700 px-2 py-1 rounded">{step.output}</code>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {text && (
            <div className="mt-8 bg-gray-800 rounded-lg p-6 shadow-xl">
              <h2 className="text-xl font-bold mb-4">Compression Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Original Size:</p>
                  <p className="text-2xl font-bold">{text.length} bytes</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Compressed Size:</p>
                  <p className="text-2xl font-bold">{steps[steps.length - 1]?.output.length || 0} bytes</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;