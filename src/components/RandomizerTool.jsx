'use client';

import { useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';

function RandomizerTool() {
  const [input, setInput] = useState('');
  const [randomized, setRandomized] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleRandomize = () => {
    const lines = input.split('\n').filter((line) => line.trim() !== '');
    const shuffled = [...lines].sort(() => Math.random() - 0.5);
    setRandomized(shuffled);
  };

  return (
    <div>
      <h2>Randomizer Tool</h2>
      <Form>
        <Form.Group className='mb-3'>
          <Form.Label>Enter items (one per line):</Form.Label>
          <Form.Control
            as='textarea'
            rows={5}
            value={input}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant='primary' onClick={handleRandomize}>
          Randomize
        </Button>
      </Form>
      {randomized.length > 0 && (
        <Table striped bordered hover className='mt-3'>
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
            </tr>
          </thead>
          <tbody>
            {randomized.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default RandomizerTool;
