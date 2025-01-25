import React from 'react';
import { FolderTree } from 'lucide-react';
import { Category } from '../types';
import { CategoryActions } from './CategoryActions';

interface CategoryListProps {
  categories: Category[];
  onAddChild: (parentId: string) => void;
  onDelete: (id: string) => void;
  onEdit: (category: Category) => void;
  onUnlink: (categoryId: string) => void;
  onSelect: (category: Category) => void;
}

export function CategoryList({ 
  categories, 
  onAddChild, 
  onDelete, 
  onEdit,
  onUnlink,
  onSelect 
}: CategoryListProps) {
  return (
    <div className="space-y-3">
      {categories.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FolderTree className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <p className="text-lg font-medium">No categories yet</p>
          <p className="text-sm">Create your first category to get started</p>
        </div>
      ) : (
        categories.map((category) => (
          <div
            key={category._id}
            className="card p-4 hover:bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FolderTree className="text-indigo-500" size={20} />
                <div>
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                  {!category.isRoot && (
                    <p className="text-sm text-gray-500">Subcategory</p>
                  )}
                  {category.children?.length > 0 && (
                    <p className="text-sm text-gray-500 mt-0.5">
                      {category.children.length} subcategories
                    </p>
                  )}
                </div>
              </div>
              
              <CategoryActions
                onEdit={() => onEdit(category)}
                onUnlink={!category.isRoot ? () => onUnlink(category._id) : undefined}
                onAddChild={() => onAddChild(category._id)}
                onDelete={() => onDelete(category._id)}
                onViewDetails={() => onSelect(category)}
                isSubcategory={!category.isRoot}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}