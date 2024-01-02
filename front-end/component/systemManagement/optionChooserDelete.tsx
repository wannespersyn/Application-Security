import { LightSource } from '@/types';
import React, { useEffect, useState } from 'react';

type Props = {
  options: LightSource[];
  choice: (option: string) => void;
  heading?: string;
};

const OptionChooserDelete: React.FC<Props> = ({ options, choice, heading }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [headingText, setHeadingText] = useState<string>('');

  const handleOptionSelect = (option: LightSource) => {
    const updatedOption = `${option.name}-${option.location}`;
    setSelectedOption(updatedOption);

    if (choice) {
      choice(updatedOption);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setHeadingText(heading || ''); // Set headingText to the provided heading or an empty string
  }, [heading]);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={handleToggle}
      >
        <h2 style={{ margin: 0 }}>{headingText}</h2>
        <span style={{ marginLeft: '5px' }}>{isOpen ? '▼' : '▶'}</span>
      </div>
      {isOpen && (
        <div style={{ border: '1px solid #ccc', padding: '5px', maxHeight: '150px', overflowY: 'auto' }}>
          {options.map((option, index) => (
            <div key={index}>
              <label>
                <input
                  className='mx-2'
                  type="radio"
                  checked={selectedOption === `${option.name}-${option.location}`}
                  onChange={() => handleOptionSelect(option)}
                />
                {option.name} - {option.location} {/* Display the option name and location */}
              </label>
            </div>
          ))}
        </div>
      )}
      <p>You have selected: </p>
      {selectedOption && (
        <div className='bg-gray-200 my-2 py-2 px-2 rounded flex'>
          <p>The {selectedOption.split('-')[0]} in {selectedOption.split('-')[1]}</p>
        </div>
      )}
    </div>
  );
};

export default OptionChooserDelete;
