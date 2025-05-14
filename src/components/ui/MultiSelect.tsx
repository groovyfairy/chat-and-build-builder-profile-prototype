import React, { useState, useRef, useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface MultiSelectProps {
  label?: string;
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  error?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  selectedValues,
  onChange,
  placeholder = 'Select options...',
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes(searchTerm.toLowerCase()) && 
    !selectedValues.includes(option)
  );

  const handleSelect = (option: string) => {
    onChange([...selectedValues, option]);
    setSearchTerm('');
  };

  const handleRemove = (option: string) => {
    onChange(selectedValues.filter(value => value !== option));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-4" ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        <div 
          className={`
            min-h-10 px-3 py-2 bg-white border shadow-sm border-gray-300 
            rounded-md focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500
            ${error ? 'border-red-500' : ''}
          `}
          onClick={() => setIsOpen(true)}
        >
          <div className="flex flex-wrap gap-1 mb-1">
            {selectedValues.map(value => (
              <span 
                key={value} 
                className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-800"
              >
                {value}
                <button 
                  type="button" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(value);
                  }}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          
          <input
            type="text"
            className="outline-none w-full bg-transparent"
            placeholder={selectedValues.length === 0 ? placeholder : ''}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsOpen(true)}
          />
        </div>
        
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => (
                <div
                  key={option}
                  className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50"
                  onClick={() => handleSelect(option)}
                >
                  <span className="block truncate">{option}</span>
                  {selectedValues.includes(option) && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <Check size={16} className="text-blue-600" />
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="py-2 px-3 text-gray-500">No options found</div>
            )}
          </div>
        )}
      </div>
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default MultiSelect;
