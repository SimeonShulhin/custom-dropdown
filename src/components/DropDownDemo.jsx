import { useState } from 'react';

import { mockData } from '../data/mockData';
import { CustomDropdown } from './CustomDropdown';
import { dropdownUtils } from '../utils/dropdownUtils';
import DropdownRenderers from './DropdownRenderers';

const DropdownDemo = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedAsyncCity, setSelectedAsyncCity] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [testDropdown1, setTestDropdown1] = useState(null);
  const [testDropdown2, setTestDropdown2] = useState(null);
  const [testDropdown3, setTestDropdown3] = useState(null);

  const customSearchFunction = async (searchTerm, options) => {
    return dropdownUtils.asyncSearch(searchTerm, options, 800);
  };

  const userSearchFunction = async (searchTerm, options) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (!searchTerm) return options;

    return options.filter((user) => {
      const searchText = searchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText) ||
        user.role.toLowerCase().includes(searchText) ||
        user.department.toLowerCase().includes(searchText)
      );
    });
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8'>
      <div className='max-w-6xl mx-auto px-4'>
        <h1 className='text-4xl font-bold text-gray-900 mb-2 text-center'>
          Custom Dropdown Component
        </h1>
        <p className='text-gray-600 text-center mb-8'>
          Демонстрація гнучкого та багатофункціонального dropdown компонента
        </p>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Basic dropdown */}
          <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow'>
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>Базовий Dropdown</h2>
            <CustomDropdown
              options={mockData.cities}
              placeholder='Оберіть ваше місто'
              searchPlaceholder='Пошук міста...'
              value={selectedCity}
              onChange={setSelectedCity}
            />
            {selectedCity && (
              <div className='mt-3 p-3 bg-green-50 rounded-lg'>
                <p className='text-sm text-green-800'>
                  ✅ Обране місто: <strong>{selectedCity}</strong>
                </p>
              </div>
            )}
          </div>

          {/* Dropdown with async search */}
          <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow'>
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>Асинхронний пошук</h2>
            <CustomDropdown
              options={mockData.cities}
              placeholder='Оберіть місто (з затримкою)'
              searchPlaceholder='Пошук з імітацією API...'
              value={selectedAsyncCity}
              onChange={setSelectedAsyncCity}
              customSearch={customSearchFunction}
            />
            <p className='mt-2 text-xs text-gray-500'>Імітує запит до сервера з затримкою 800мс</p>
            {selectedAsyncCity && (
              <div className='mt-3 p-3 bg-orange-50 rounded-lg'>
                <p className='text-sm text-orange-800'>
                  🔄 Обране місто (async): <strong>{selectedAsyncCity}</strong>
                </p>
              </div>
            )}
          </div>

          {/* Custom rendering dropdown */}
          <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow'>
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>Кастомний рендеринг</h2>
            <CustomDropdown
              options={mockData.items}
              placeholder='Оберіть елемент'
              searchPlaceholder='Пошук елемента...'
              value={selectedItem}
              onChange={setSelectedItem}
              renderOption={DropdownRenderers.renderCustomItem}
              renderSelectedValue={DropdownRenderers.renderSelectedItem}
            />
            {selectedItem && (
              <div className='mt-3 p-3 bg-blue-50 rounded-lg'>
                <p className='text-sm text-blue-800'>
                  📦 Обраний елемент: <strong>{selectedItem.label}</strong>
                </p>
                <p className='text-xs text-blue-600'>{selectedItem.description}</p>
              </div>
            )}
          </div>

          {/* Complex users dropdown */}
          <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow'>
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>Користувачі</h2>
            <CustomDropdown
              options={mockData.users}
              placeholder='Оберіть користувача'
              searchPlaceholder='Пошук по імені, email, ролі...'
              value={selectedUser}
              onChange={setSelectedUser}
              renderOption={DropdownRenderers.renderUser}
              renderSelectedValue={DropdownRenderers.renderSelectedUser}
              customSearch={userSearchFunction}
            />
            {selectedUser && (
              <div className='mt-3 p-3 bg-purple-50 rounded-lg'>
                <p className='text-sm text-purple-800'>
                  👤 Обраний користувач: <strong>{selectedUser.name}</strong>
                </p>
                <p className='text-xs text-purple-600'>
                  {selectedUser.role} • {selectedUser.department}
                </p>
              </div>
            )}
          </div>

          {/* Countries dropdown */}
          <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow'>
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>Країни з прапорами</h2>
            <CustomDropdown
              options={mockData.countries}
              placeholder='Оберіть країну'
              searchPlaceholder='Пошук країни...'
              value={selectedCountry}
              onChange={setSelectedCountry}
              renderOption={DropdownRenderers.renderCountry}
              renderSelectedValue={DropdownRenderers.renderSelectedCountry}
            />
            {selectedCountry && (
              <div className='mt-3 p-3 bg-yellow-50 rounded-lg'>
                <p className='text-sm text-yellow-800'>
                  🌍 Обрана країна: <strong>{selectedCountry.name}</strong> ({selectedCountry.code})
                </p>
              </div>
            )}
          </div>

          {/* Disabled dropdown */}
          <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow'>
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>Відключений стан</h2>
            <CustomDropdown
              options={mockData.cities}
              placeholder='Відключений dropdown'
              disabled={true}
            />
            <p className='mt-2 text-xs text-gray-500'>
              Цей dropdown відключений та недоступний для взаємодії
            </p>
          </div>
        </div>

        {/* Multiple dropdowns test */}
        <div className='mt-8 bg-white p-6 rounded-xl shadow-md'>
          <h2 className='text-2xl font-semibold mb-4 text-gray-800'>Тест множинних Dropdown'ів</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Dropdown 1</label>
              <CustomDropdown
                options={mockData.cities.slice(0, 8)}
                placeholder='Міста (1-8)'
                searchPlaceholder='Пошук...'
                value={testDropdown1}
                onChange={setTestDropdown1}
              />
              {testDropdown1 && (
                <p className='mt-2 text-xs text-green-600'>Обрано: {testDropdown1}</p>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Dropdown 2</label>
              <CustomDropdown
                options={mockData.cities.slice(8)}
                placeholder='Міста (9+)'
                searchPlaceholder='Пошук...'
                value={testDropdown2}
                onChange={setTestDropdown2}
              />
              {testDropdown2 && (
                <p className='mt-2 text-xs text-blue-600'>Обрано: {testDropdown2}</p>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Dropdown 3</label>
              <CustomDropdown
                options={mockData.items}
                placeholder='Елементи'
                searchPlaceholder='Пошук...'
                renderOption={DropdownRenderers.renderCustomItem}
                value={testDropdown3}
                onChange={setTestDropdown3}
              />
              {testDropdown3 && (
                <p className='mt-2 text-xs text-purple-600'>Обрано: {testDropdown3.label}</p>
              )}
            </div>
          </div>
          <div className='mt-4 p-3 bg-indigo-50 rounded-lg'>
            <p className='text-sm text-indigo-800'>
              💡 При відкритті одного dropdown інші автоматично закриваються
            </p>
          </div>
        </div>

        {/* Usage statistics */}
        <div className='mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl'>
          <h3 className='text-xl font-semibold mb-4'>Статистика використання</h3>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <div className='text-center'>
              <div className='text-2xl font-bold'>{mockData.cities.length}</div>
              <div className='text-sm opacity-90'>Міст</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold'>{mockData.users.length}</div>
              <div className='text-sm opacity-90'>Користувачів</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold'>{mockData.items.length}</div>
              <div className='text-sm opacity-90'>Елементів</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold'>{mockData.countries.length}</div>
              <div className='text-sm opacity-90'>Країн</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownDemo;
