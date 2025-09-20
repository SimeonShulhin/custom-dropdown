import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { dropdownUtils } from '../utils/dropdownUtils';

let currentOpenDropdown = null;
const closeCurrentDropdown = () => {
  if (currentOpenDropdown) {
    currentOpenDropdown();
    currentOpenDropdown = null;
  }
};

export const CustomDropdown = ({
  options = [],
  placeholder = 'Оберіть варіант',
  searchPlaceholder = 'Пошук...',
  value,
  onChange,
  renderOption,
  renderSelectedValue,
  customSearch,
  disabled = false,
  className = '',
  maxHeight = '20rem',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownId] = useState(() => `custom-dropdown-${Math.random().toString(36).slice(2, 9)}`);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const performSearch = async () => {
      if (customSearch) {
        setIsSearching(true);
        try {
          const results = await customSearch(searchTerm, options);
          setFilteredOptions(results);
        } catch (error) {
          console.error('Search error:', error);
          setFilteredOptions([]);
        }
        setIsSearching(false);
      } else {
        setFilteredOptions(dropdownUtils.defaultSearch(searchTerm, options));
      }
    };

    performSearch();
  }, [searchTerm, options, customSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        if (currentOpenDropdown) {
          currentOpenDropdown = null;
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const closeFunction = () => setIsOpen(false);

    if (isOpen) {
      closeCurrentDropdown();
      currentOpenDropdown = closeFunction;
    } else {
      if (currentOpenDropdown === closeFunction) {
        currentOpenDropdown = null;
      }
    }

    return () => {
      if (currentOpenDropdown === closeFunction) {
        currentOpenDropdown = null;
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
    }
  };

  const handleOptionSelect = (option) => {
    onChange && onChange(option);
    setIsOpen(false);
    setSearchTerm('');

    if (currentOpenDropdown) {
      currentOpenDropdown = null;
    }
  };

  const handleKeyDown = (event) => {
    if (disabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    } else if (event.key === 'Escape' && isOpen) {
      setIsOpen(false);
      if (currentOpenDropdown) {
        currentOpenDropdown = null;
      }
    }
  };

  const selectedOption =
    value && options.length > 0
      ? options.find((opt) => {
          const optValue = dropdownUtils.getOptionValue(opt);
          const selectedValue = dropdownUtils.getOptionValue(value);
          return optValue === selectedValue;
        })
      : null;

  return (
    <div ref={containerRef} className={`relative inline-block w-full ${className}`}>
      {/* Dropdown trigger */}
      <div
        ref={dropdownRef}
        className={`
          relative w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg
          cursor-pointer transition-all duration-200
          ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'hover:border-gray-300'}
          ${isOpen ? 'border-blue-500 ring-2 ring-blue-200' : ''}
          focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
        `}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role='combobox'
        aria-expanded={isOpen}
        aria-haspopup='listbox'
        aria-controls={`${dropdownId}-listbox`}>
        <div className='flex items-center justify-between'>
          <span className={`block truncate ${selectedOption ? 'text-gray-900' : 'text-gray-500'}`}>
            {selectedOption
              ? renderSelectedValue
                ? renderSelectedValue(selectedOption)
                : dropdownUtils.getOptionLabel(selectedOption)
              : placeholder}
          </span>
          <ChevronDown
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className='absolute z-50 w-full mt-1 bg-white border-2 border-gray-200 rounded-lg shadow-lg flex flex-col'
          style={{ maxHeight: maxHeight }}>
          {/* Search input */}
          <div className='p-3 border-b border-gray-100'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
              <input
                ref={searchInputRef}
                type='text'
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500'
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Options list */}
          <div className='flex-1 overflow-auto'>
            {isSearching ? (
              <div className='px-4 py-8 text-center text-gray-500'>
                <div className='animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2'></div>
                Пошук...
              </div>
            ) : filteredOptions.length === 0 ? (
              <div className='px-4 py-8 text-center text-gray-500'>
                {searchTerm ? 'Нічого не знайдено' : 'Немає варіантів'}
              </div>
            ) : (
              <ul id={`${dropdownId}-listbox`} role='listbox' className='py-1'>
                {filteredOptions.map((option, index) => {
                  const optionValue = dropdownUtils.getOptionValue(option);
                  const selectedValue = selectedOption
                    ? dropdownUtils.getOptionValue(selectedOption)
                    : null;
                  const isSelected = optionValue === selectedValue;

                  return (
                    <li
                      key={`${optionValue}-${index}`}
                      className={`
                        px-4 py-3 cursor-pointer transition-colors duration-150
                        hover:bg-blue-50 hover:text-blue-700
                        ${isSelected ? 'bg-blue-100 text-blue-800' : 'text-gray-900'}
                      `}
                      onClick={() => handleOptionSelect(option)}
                      role='option'
                      aria-selected={isSelected}>
                      {renderOption ? renderOption(option) : dropdownUtils.getOptionLabel(option)}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
