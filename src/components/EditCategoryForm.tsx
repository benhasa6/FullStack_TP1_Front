import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Category } from '../types';

interface EditCategoryFormProps {
  category: Category;
  categories: Category[];
  onSubmit: (id: string, name: string, parentId?: string | null) => void;
  onClose: () => void;
}

export function EditCategoryForm({ category, categories, onSubmit, onClose }: EditCategoryFormProps) {
  const [name, setName] = useState(category.name);
  const [parentId, setParentId] = useState(category.parent?._id || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(category._id, name.trim(), parentId || null);
    }
  };

  const availableParents = categories.filter(c => 
    c._id !== category._id && !category.children?.some(child => child._id === c._id)
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Edit Category</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="Enter category name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parent Category (Optional)
            </label>
            <select
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              className="input"
            >
              <option value="">No parent (Root category)</option>
              {availableParents.map(parent => (
                <option key={parent._id} value={parent._id}>
                  {parent.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}