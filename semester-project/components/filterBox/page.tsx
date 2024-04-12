'use client'
import React, { useEffect, useState } from 'react';
import Button from '@/components/button/page';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface FilterBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  onFilterSubmit: (selectedDiets: string[], selectedDifficulty: string, maxCookingTime: number) => void;
  onFilterUndo: () => void;
  onClose: () => void;
}

const FilterBox: React.FC<FilterBoxProps> = ({ onFilterSubmit, onFilterUndo, onClose, ...props }) => {
  const diets = ['sugar-free', 'low-carb', 'high-protein', 'budget-friendly', 'vegan', 'dairy-free', 'nut-free', 'gluten-free', 'vegetarian', 'soy-free'];
  const difficultyLevels = ['beginner', 'intermediate', 'advanced'];
  const [clickedButton, setClickedButton] = useState<string>('');

  const getSavedFilters = () => {
    const savedFiltersString = localStorage.getItem('selectedFilters');
    if (savedFiltersString) {
      const savedFilters = JSON.parse(savedFiltersString);
      setSelectedDiets(savedFilters.selectedDiets || []);
      setSelectedDifficulty(savedFilters.selectedDifficulty || '');
      setMaxCookingTime(savedFilters.maxCookingTime || null);
    }
  };

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

    // Save the selected filters to localStorage
    const savedFilters = {
      selectedDiets,
      selectedDifficulty,
      maxCookingTime,
    };
    localStorage.setItem('selectedFilters', JSON.stringify(savedFilters));
  };

  // Function to undo filters
  const handleUndo = () => {
    setSelectedDiets([]);
    setSelectedDifficulty('');
    setMaxCookingTime(null);
    onFilterUndo();

    // Remove saved filters from localStorage
    localStorage.removeItem('selectedFilters');
  };

  // Get saved filters when the component mounts
  useEffect(() => {
    getSavedFilters();
  }, []);

  return (
    <div className="fixed top-0 left-0 transform -translate-x-0 -translate-y-0 shadow-lg z-50 w-1/3 h-screen bg-custom-main-color box-border p-5" style={{ clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0% 100%)' }} {...props}>
      <div className="cursor-pointer float-right text-3xl font-bold text-white" onClick={onClose}>
      <FontAwesomeIcon icon={faTimes}/>
      </div>
      <div className="font-bold text-white text-2xl mt-10">
        <label>Diet: </label>
      </div>
      <div className="grid grid-cols-2 gap-x-10 gap-y-4 mr-20 mt-5">
        {diets.map((diet) => (
          <button
            key={diet}
            className={`rounded-[60px] border-[3px] p-1 font-bold ${selectedDiets.includes(diet) ? 'bg-white text-custom-main-color' : 'border-white  text-white'}`}
            onClick={() => handleDietToggle(diet)}
          >
            {diet}
          </button>
        ))}
      </div>
      <br></br>
      <div className="font-bold text-white text-2xl mt-10">
        <label>Difficulty Level: </label>
      </div>
      <select className="w-1/2 mt-4 rounded-2xl text-font-color" value={selectedDifficulty} onChange={(e) => handleDifficultySelect(e.target.value)}>
        <option value="">Select Difficulty Level</option>
        {difficultyLevels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
      <br></br>
      <div className="font-bold text-white text-2xl mt-10">
        <label>Maximum Cooking Time: </label>
      </div>
      <div className="flex items-center text-font-color">
        <input
          className="w-1/3 m-4"
          type="range"
          min={5}
          max={120}
          step={5}
          value={maxCookingTime || 0}
          onChange={(e) => handleCookingTimeChange(Number(e.target.value))}
        />
        <div className = "text-white">{maxCookingTime !== null ? `${maxCookingTime} minutes` : ""}</div>
      </div>

      <div className="w-1/2 flex justify-around mt-10 ">
        <Button onClick={handleSubmit} disabled={selectedDiets.length === 0 && !selectedDifficulty && maxCookingTime === null} path={''} name={'Apply'} setClickedButton={setClickedButton}></Button>
        <Button onClick={handleUndo} disabled={selectedDiets.length === 0 && !selectedDifficulty && maxCookingTime === null} path={''} name={'Reset'} setClickedButton={setClickedButton}></Button>
      </div>
    </div>
  );
};

export default FilterBox;
