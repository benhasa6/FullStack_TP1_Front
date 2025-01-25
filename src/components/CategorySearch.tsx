import React, { useState } from 'react';
import { categoryApi } from '../services/api';
import { Category } from '../types';

interface CategorySearchProps {
  onResults: (results: Category[]) => void;
}

export function CategorySearch({ onResults }: CategorySearchProps) {
  const [isRoot, setIsRoot] = useState('');
  const [dateAfter, setDateAfter] = useState('');
  const [dateBefore, setDateBefore] = useState('');

  const [sortBy, setSortBy] = useState('name'); // name | creationDate | childrenCount
  const [sortOrder, setSortOrder] = useState<'asc'|'desc'>('asc');

  const handleSearch = async () => {
    try {
      const res = await categoryApi.searchCategories({
        isRoot: isRoot ? isRoot === 'true' : undefined,
        creationDateAfter: dateAfter || undefined,
        creationDateBefore: dateBefore || undefined
      });
      onResults(res.data);
    } catch (error) {
      console.error(error);
      alert('Search error');
    }
  };

  const handleSort = async () => {
    try {
      const res = await categoryApi.getCategoriesSorted(sortBy, sortOrder);
      onResults(res.data);
    } catch (error) {
      console.error(error);
      alert('Sort error');
    }
  };

  return (
    <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Search & Filter</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        {/* Root Filter */}
        <div className="flex flex-col space-y-1">
          <label className="font-medium text-sm text-gray-700">Root?</label>
          <select
            value={isRoot}
            onChange={(e) => setIsRoot(e.target.value)}
            className="form-select rounded-md border-gray-300"
          >
            <option value="">No filter</option>
            <option value="true">Root only</option>
            <option value="false">Subcategory only</option>
          </select>
        </div>

        {/* After Date */}
        <div className="flex flex-col space-y-1">
          <label className="font-medium text-sm text-gray-700">Created After</label>
          <input
            type="date"
            value={dateAfter}
            onChange={(e) => setDateAfter(e.target.value)}
            className="form-input rounded-md border-gray-300"
          />
        </div>

        {/* Before Date */}
        <div className="flex flex-col space-y-1">
          <label className="font-medium text-sm text-gray-700">Created Before</label>
          <input
            type="date"
            value={dateBefore}
            onChange={(e) => setDateBefore(e.target.value)}
            className="form-input rounded-md border-gray-300"
          />
        </div>
      </div>

      <button onClick={handleSearch} className="btn-primary mr-4">
        Search
      </button>

      <hr className="my-6" />

      <h3 className="text-lg font-semibold text-gray-900 mb-4">Sort</h3>
      <div className="flex items-center space-x-4">
        <div className="flex flex-col space-y-1">
          <label className="font-medium text-sm text-gray-700">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-select rounded-md border-gray-300"
          >
            <option value="name">Name</option>
            <option value="creationDate">Creation Date</option>
            <option value="childrenCount">Children Count</option>
          </select>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="font-medium text-sm text-gray-700">Order</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="form-select rounded-md border-gray-300"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <button onClick={handleSort} className="btn-secondary">
          Sort
        </button>
      </div>
    </div>
  );
}
