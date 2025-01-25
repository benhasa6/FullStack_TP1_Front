import React from 'react';
import { Calendar, FolderTree, ArrowUp, ArrowDown } from 'lucide-react';
import { format } from 'date-fns';

interface CategoryDetailsProps {
  category: {
    _id?: string;
    name: string;
    creationDate: string | null;
    isRoot: boolean;
    parent?: { name: string } | null;
    children?: { _id: string; name: string }[];
  };
}

export function CategoryDetails({ category }: CategoryDetailsProps) {
  return (
    <div className="card p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{category.name}</h2>
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar size={16} />
          <span className="text-sm">
            {category.creationDate
              ? `Created on ${format(new Date(category.creationDate), 'MMMM dd, yyyy')}`
              : 'Date not available'}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2 px-4 py-3 bg-gray-50 rounded-lg">
        <FolderTree size={18} className="text-indigo-500" />
        <span className="text-gray-700">
          {category.isRoot ? 'Root category' : 'Subcategory'}
        </span>
      </div>

      {category.parent && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
            <ArrowUp size={16} />
            Parent Category
          </h3>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <span className="font-medium text-gray-900">{category.parent.name}</span>
          </div>
        </div>
      )}

      {(category.children?.length ?? 0) > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
            <ArrowDown size={16} />
            Subcategories ({category.children?.length ?? 0})
          </h3>
          <div className="space-y-2">
            {category.children?.map((child) => (
              <div
                key={child._id}
                className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-center space-x-2"
              >
                <FolderTree size={16} className="text-indigo-400" />
                <span className="font-medium text-gray-900">{child.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
