'use client'
import React, { useState } from 'react';

interface FilterBoxProps {
  onFilterSubmit: (selectedDiets: string[], selectedDifficulty: string, maxCookingTime: number) => void;
  onFilterUndo: () => void;
}

const FilterBox: React.FC<FilterBoxProps> = ({ onFilterSubmit, onFilterUndo }) => {
  const diets = ['sugar-free', 'low-carb', 'high-protein', 'budget-friendly', 'vegan', 'dairy-free', 'nut-free', 'gluten-free', 'vegetarian', 'soy-free'];
  const difficultyLevels = ['beginner', 'intermediate', 'advanced'];

  // State to store the selected diets
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);

  // State to store the selected difficulty level
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');

  // State to store the selected maximum cooking time
  const [maxCookingTime, setMaxCookingTime] = useState<number | null>(null);

  // Function to handle diet selection
  const handleDietToggle = (diet: string) => {
    setSelectedDiets((prevSelectedDiets) => {
      if (prevSelectedDiets.includes(diet)) {
        // If diet is already selected, remove it
        return prevSelectedDiets.filter((d) => d !== diet);
      } else {
        // If diet is not selected, add it
        return [...prevSelectedDiets, diet];
      }
    });
  };

  // Function to handle difficulty level selection
  const handleDifficultySelect = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };

  // Function to handle maximum cooking time selection
  const handleCookingTimeChange = (value: number | number[]) => {
    // If the value is an array, use the maximum value
    const maxTime = Array.isArray(value) ? Math.max(...value) : value;

    setMaxCookingTime(maxTime);
  };

  // Function to submit the selected filters
  const handleSubmit = () => {
    onFilterSubmit(selectedDiets, selectedDifficulty, maxCookingTime || 0);
  };

  // Function to undo filters
  const handleUndo = () => {
    setSelectedDiets([]);
    setSelectedDifficulty('');
    setMaxCookingTime(null);
    onFilterUndo();
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
        <label>Diet: </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          {diets.map((diet) => (
            <div key={diet}>
              <input
                type="checkbox"
                id={diet}
                value={diet}
                checked={selectedDiets.includes(diet)}
                onChange={() => handleDietToggle(diet)}
              />
              <label htmlFor={diet}>{diet}</label>
            </div>
          ))}
        </div>
      </div>

      <label>Difficulty Level: </label>
      <select
        value={selectedDifficulty}
        onChange={(e) => handleDifficultySelect(e.target.value)}
      >
        <option value="">Select Difficulty Level</option>
        {difficultyLevels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
            <br></br>
            <br></br>
      <label>Maximum Cooking Time: </label>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
            type="range"
            min={5}
            max={120}
            step={5}
            value={maxCookingTime || 0}
            onChange={(e) => handleCookingTimeChange(Number(e.target.value))}
        />
        <div style={{ marginLeft: '10px' }}>{maxCookingTime !== null ? `${maxCookingTime} minutes` : ""}</div>
      </div>
      <br />
      <button onClick={handleSubmit} disabled={selectedDiets.length === 0 && !selectedDifficulty && maxCookingTime === null}>Apply Filter</button>
      <br />
      <button onClick={handleUndo} disabled={selectedDiets.length === 0 && !selectedDifficulty && maxCookingTime === null}>Undo Filters</button>
    </div>
  );
};

export default FilterBox;
