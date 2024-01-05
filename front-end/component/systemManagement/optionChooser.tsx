import { LightSource } from '@/types';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

type Props = {
  options: LightSource[];
  updateActivationTargets? : (options: string[]) => void;
};

const OptionChooser: React.FC<Props> = ({ options, updateActivationTargets }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [brightness, setBrightness] = useState<number>(0);
  const { t } = useTranslation();

  const handleOptionSelect = (option: LightSource) => {
    const isSelected = selectedOptions.includes(`${option.name}-${option.location}`);
    let updatedOptions: string[] = [];

    if (isSelected) {
      updatedOptions = selectedOptions.filter(
        (selected) => selected !== `${option.name}-${option.location}`
      );
    } else {
      updatedOptions = [...selectedOptions, `${option.name}-${option.location}`];
    }

    setSelectedOptions(updatedOptions);

    if (updateActivationTargets){
      updateActivationTargets(updatedOptions)
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (option: LightSource) => {
    handleOptionSelect(option);
  };

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
        <h2 style={{ margin: 0 }}>{t("sys.scenes.choose.lights")}</h2>
        <span style={{ marginLeft: '5px' }}>{isOpen ? '▼' : '▶'}</span>
      </div>
      {isOpen && (
        <div style={{ border: '1px solid #ccc', padding: '5px', maxHeight: '150px', overflowY: 'auto' }}>
          {options.map((option, index) => (
            <div key={index}>
              <label>
                <input
                  className='mx-2'
                  type="checkbox"
                  checked={selectedOptions.includes(`${option.name}-${option.location}`)}
                  onChange={() => handleCheckboxChange(option)}
                />
                {option.location} - {option.name}
              </label>
            </div>
          ))}
        </div>
      )}
      <p>{t("sys.scenes.selected")} </p>
      {selectedOptions.map((selectedOption, index) => {
          const [name, location] = selectedOption.split('-');
          return (
            <div 
              className='bg-gray-200 my-2 py-2 px-2 rounded flex'
              key={index}>
              <p>{name} in {location}</p>
              <label 
                className='justify-self-end ml-auto pr-2'
                htmlFor="">
                {t("sys.scenes.brightness")}
              </label>
              <input 
                className='justify-self-end w-1/6'
                type="number"
                min={0}
                max={100}
                value={brightness} required
                onChange={(event) => setBrightness(Number(event.target.value))}
                />
            </div>
          );
        })}  
    </div>
  );
};

export default OptionChooser;
