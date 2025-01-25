import React from 'react';
import { Edit, Unlink, Info, Trash2, Plus } from 'lucide-react';

interface CategoryActionsProps {
  onEdit: () => void;
  onUnlink?: () => void;
  onAddChild: () => void;
  onDelete: () => void;
  onViewDetails: () => void;
  isSubcategory?: boolean;
}

export function CategoryActions({ 
  onEdit, 
  onUnlink, 
  onAddChild, 
  onDelete, 
  onViewDetails,
  isSubcategory 
}: CategoryActionsProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onEdit}
        className="action-button"
        title="Edit category"
      >
        <Edit size={18} />
      </button>
      
      {isSubcategory && (
        <button
          onClick={onUnlink}
          className="action-button"
          title="Unlink from parent"
        >
          <Unlink size={18} />
        </button>
      )}

      <button
        onClick={onAddChild}
        className="action-button"
        title="Add subcategory"
      >
        <Plus size={18} />
      </button>

      <button
        onClick={onViewDetails}
        className="action-button"
        title="View details"
      >
        <Info size={18} />
      </button>

      <button
        onClick={onDelete}
        className="action-button text-red-600 hover:bg-red-50"
        title="Delete category"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}