'use client';

import { useState, useCallback, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeCapitals, setIncludeCapitals] = useState(true);
  const [password, setPassword] = useState('');
  const [seed, setSeed] = useState('');

  const generatePassword = useCallback(() => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = lowercase;
    if (includeCapitals) chars += uppercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    let result = '';
    const currentTime = Date.now();
    const combinedSeed = seed + currentTime.toString();

    const random = cyrb128(combinedSeed);
    const rand = sfc32(random[0], random[1], random[2], random[3]);

    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(rand() * chars.length)];
    }

    setPassword(result);
  }, [length, includeSymbols, includeNumbers, includeCapitals, seed]);

  // Generate password on component mount and when dependencies change
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      alert('Password copied to clipboard!');
    });
  };

  // cyrb128 and sfc32 functions remain unchanged
  function cyrb128(str) {
    let h1 = 1779033703,
      h2 = 3144134277,
      h3 = 1013904242,
      h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
      k = str.charCodeAt(i);
      h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
      h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
      h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
      h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return [
      (h1 ^ h2 ^ h3 ^ h4) >>> 0,
      (h2 ^ h1) >>> 0,
      (h3 ^ h1) >>> 0,
      (h4 ^ h1) >>> 0,
    ];
  }

  function sfc32(a, b, c, d) {
    return () => {
      a >>>= 0;
      b >>>= 0;
      c >>>= 0;
      d >>>= 0;
      var t = (a + b) | 0;
      a = b ^ (b >>> 9);
      b = (c + (c << 3)) | 0;
      c = (c << 21) | (c >>> 11);
      d = (d + 1) | 0;
      t = (t + d) | 0;
      c = (c + t) | 0;
      return (t >>> 0) / 4294967296;
    };
  }

  return (
    <div>
      <h2>Password Generator</h2>
      <Form>
        <Form.Group className='mb-3'>
          <Form.Label>Password Length: {length}</Form.Label>
          <Form.Range
            min={6}
            max={50}
            value={length}
            onChange={(e) => setLength(Number.parseInt(e.target.value))}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Check
            type='checkbox'
            label='Include Symbols'
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Check
            type='checkbox'
            label='Include Numbers'
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Check
            type='checkbox'
            label='Include Capital Letters'
            checked={includeCapitals}
            onChange={(e) => setIncludeCapitals(e.target.checked)}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Random Seed (optional)</Form.Label>
          <Form.Control
            type='text'
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            placeholder='Enter a random seed'
          />
        </Form.Group>
        <Button variant='primary' onClick={generatePassword}>
          Generate New Password
        </Button>
      </Form>
      {password && (
        <InputGroup className='mt-3'>
          <Form.Control type='text' value={password} readOnly />
          <Button variant='outline-secondary' onClick={copyToClipboard}>
            Copy
          </Button>
        </InputGroup>
      )}
    </div>
  );
}

export default PasswordGenerator;
