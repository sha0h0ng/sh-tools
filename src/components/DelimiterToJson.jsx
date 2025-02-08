'use client';

import { useState, useCallback } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FileJson } from 'lucide-react';

function DelimiterToJson() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [delimiter, setDelimiter] = useState('\t'); // Default to tab
  const [customDelimiter, setCustomDelimiter] = useState('');
  const [error, setError] = useState('');

  const handleConvert = useCallback(() => {
    try {
      setError('');
      const actualDelimiter =
        delimiter === 'custom' ? customDelimiter : delimiter;

      if (!input.trim()) {
        setOutput('');
        return;
      }

      // Split input into lines
      const lines = input.trim().split('\n');

      // Get headers from first line
      const headers = lines[0]
        .split(actualDelimiter)
        .map((header) => header.trim().replace(/[^a-zA-Z0-9_]/g, '_'));

      // Convert remaining lines to objects
      const jsonData = lines.slice(1).map((line) => {
        const values = line.split(actualDelimiter);
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = values[index]?.trim() || '';
        });
        return obj;
      });

      // Format JSON with 2 spaces indentation
      setOutput(JSON.stringify(jsonData, null, 2));
    } catch (err) {
      setError('Error converting to JSON. Please check your input format.');
      console.error(err);
    }
  }, [input, delimiter, customDelimiter]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(output).then(() => {
      alert('JSON copied to clipboard!');
    });
  };

  const delimiterOptions = [
    { value: '\t', label: 'Tab' },
    { value: ',', label: 'Comma' },
    { value: ' ', label: 'Space' },
    { value: 'custom', label: 'Custom' },
  ];

  return (
    <div>
      <h2 className='d-flex align-items-center gap-2 mb-4'>
        <FileJson size={24} />
        Delimiter to JSON Converter
      </h2>

      <Form>
        <Form.Group className='mb-4'>
          <Form.Label>Choose Delimiter:</Form.Label>
          <div className='d-flex gap-4 mb-2'>
            {delimiterOptions.map((option) => (
              <Form.Check
                key={option.value}
                type='radio'
                id={`delimiter-${option.value}`}
                label={option.label}
                name='delimiter'
                checked={delimiter === option.value}
                onChange={() => setDelimiter(option.value)}
              />
            ))}
          </div>
          {delimiter === 'custom' && (
            <Form.Control
              type='text'
              placeholder='Enter custom delimiter'
              value={customDelimiter}
              onChange={(e) => setCustomDelimiter(e.target.value)}
              className='mt-2'
              style={{ maxWidth: '200px' }}
            />
          )}
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Input (include headers in first row):</Form.Label>
          <Form.Control
            as='textarea'
            rows={6}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter your delimited text here...'
            className='font-monospace'
          />
        </Form.Group>

        <div className='mb-4'>
          <Button variant='primary' onClick={handleConvert}>
            Convert to JSON
          </Button>
        </div>

        {error && <div className='alert alert-danger mb-3'>{error}</div>}

        {output && (
          <Form.Group>
            <Form.Label>Output JSON:</Form.Label>
            <InputGroup>
              <Form.Control
                as='textarea'
                rows={10}
                value={output}
                readOnly
                className='font-monospace'
              />
              <Button
                variant='outline-secondary'
                onClick={handleCopyToClipboard}
              >
                Copy
              </Button>
            </InputGroup>
          </Form.Group>
        )}
      </Form>
    </div>
  );
}

export default DelimiterToJson;
