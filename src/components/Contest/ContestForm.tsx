import React, { useState } from 'react';
import Button from '../Common/Button';
import Input from '../Common/Input';
import { ContestFormProps } from '../../features/contest/contestTypes';

const ContestForm: React.FC<ContestFormProps> = ({ onSubmit, loading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      name: title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Contest</h2>
      <Input
        type="text"
        placeholder="Contest Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
      <Input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Contest'}
      </Button>
    </form>
  );
};

export default ContestForm;
