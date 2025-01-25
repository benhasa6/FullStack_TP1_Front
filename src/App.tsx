import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { categoryApi } from './services/api';
import { Category } from './types';
import { CategoryList } from './components/CategoryList';
import { CategoryForm } from './components/CategoryForm';
import { CategoryDetails } from './components/CategoryDetails';
import { EditCategoryForm } from './components/EditCategoryForm';
import { CategorySearch } from './components/CategorySearch';

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showChildForm, setShowChildForm] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getAllCategories();
      setCategories(response.data);
    } catch (err) {
      setError('Error loading categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (name: string) => {
    try {
      await categoryApi.createCategory(name);
      fetchCategories();
      setShowForm(false);
    } catch (err) {
      setError('Error creating category');
    }
  };

  const handleAddChild = async (name: string) => {
    if (!showChildForm) return;
    try {
      
      await categoryApi.addChildCategory(showChildForm, name);
      fetchCategories();
      setShowChildForm(null);
    } catch (err) {
      setError('Error adding subcategory');
    }
  };
  

  const handleUpdateCategory = async (id: string, name: string, parentId?: string | null) => {
    try {
      await categoryApi.updateCategory(id, { name, parent: parentId });
      fetchCategories();
      if (selectedCategory?._id === id) {
        const response = await categoryApi.getCategoryWithParentAndChildren(id);
        const { category, parent, children } = response.data;
        const shapedData = {
          _id: category.id,
          name: category.name,
          creationDate: category.creationDate,
          isRoot: category.isRoot,
          parent: parent ? { ...parent, children: [], parent: null } : null,
          children: children.map((c: any) => ({
            _id: c._id,
            name: c.name
          }))
        };
        setSelectedCategory(shapedData);
      }
      setEditingCategory(null);
    } catch (err) {
      setError('Error updating category');
    }
  };

  const handleUnlinkCategory = async (id: string) => {
    try {
      await categoryApi.unlinkFromParent(id);
      fetchCategories();
      if (selectedCategory?._id === id) {
        const response = await categoryApi.getCategoryWithParentAndChildren(id);
        const { category, parent, children } = response.data;
        const shapedData = {
          _id: category.id,
          name: category.name,
          creationDate: category.creationDate,
          isRoot: category.isRoot,
          parent: parent ? { ...parent, children: [], parent: null } : null,
          children: children.map((c: any) => ({
            _id: c._id,
            name: c.name
          }))
        };
        setSelectedCategory(shapedData);
      }
    } catch (err) {
      setError('Error unlinking category');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await categoryApi.deleteCategory(id);
      fetchCategories();
      if (selectedCategory?._id === id) {
        setSelectedCategory(null);
      }
    } catch (err) {
      setError('Error deleting category');
    }
  };

  const handleSelectCategory = async (category: Category) => {
    try {
      const response = await categoryApi.getCategoryWithParentAndChildren(category._id);
      const { category: cat, parent, children } = response.data;
      const shapedData = {
        _id: cat.id,
        name: cat.name,
        creationDate: cat.creationDate,
        isRoot: cat.isRoot,
        parent: parent ? { ...parent, children: [], parent: null } : null,
        children: children.map((c: any) => ({
          _id: c._id,
          name: c.name
        }))
      };
      setSelectedCategory(shapedData);
    } catch (err) {
      setError('Error loading category details');
    }
  };

  // NEW: Callback used by <CategorySearch> to replace the displayed categories
  const handleSearchOrSortResults = (results: Category[]) => {
    setCategories(results);
    // Optionally, you can reset selectedCategory or keep it
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Category Management</h1>
            <p className="mt-2 text-sm text-gray-600">Organize and manage your categories efficiently</p>
          </div>
          <button onClick={() => setShowForm(true)} className="btn-primary">
            <Plus size={20} />
            <span>New Category</span>
          </button>
        </div>

        {/* Error display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.293-5.707a1 1 0 011.414 0L10 12.414l1.293-1.293a1 1 0 011.414 
                1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}

        {/* E_CAT_60 & E_CAT_70 UI */}
        <CategorySearch onResults={handleSearchOrSortResults} />

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Category List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <CategoryList
                categories={categories}
                onAddChild={(id) => setShowChildForm(id)}
                onDelete={handleDeleteCategory}
                onEdit={setEditingCategory}
                onUnlink={handleUnlinkCategory}
                onSelect={handleSelectCategory}
              />
            </div>
          </div>

          {/* Right: Details */}
          <div>
            {selectedCategory && (
              <CategoryDetails category={selectedCategory} />
            )}
          </div>
        </div>

        {/* New Category or Subcategory form */}
        {(showForm || showChildForm) && (
          <CategoryForm
            title={showForm ? "New Category" : "New Subcategory"}
            onSubmit={showForm ? handleCreateCategory : handleAddChild}
            onClose={() => showForm ? setShowForm(false) : setShowChildForm(null)}
          />
        )}

        {/* Edit Category form */}
        {editingCategory && (
          <EditCategoryForm
            category={editingCategory}
            categories={categories}
            onSubmit={handleUpdateCategory}
            onClose={() => setEditingCategory(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
