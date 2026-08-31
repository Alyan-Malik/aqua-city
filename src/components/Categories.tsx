// src/components/Categories.tsx
import React, { useState } from 'react';
import { useCategories } from '../hooks/useCategories';
import { Category } from '../types';

const Categories: React.FC = () => {
  const { categories, isLoading, createCategory, updateCategory, deleteCategory } = useCategories();
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategory({ id: editingCategory.id, data: formData });
    } else {
      createCategory(formData);
    }
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', description: '' });
    setEditingCategory(null);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading categories...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Categories</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="btn-primary"
        >
          + Add Category
        </button>
      </div>

      <div className="card-surface overflow-hidden">
        {categories.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No categories found. Click "Add Category" to create one.
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category: any) => (
                <tr key={category.id} className="border-t border-border hover:bg-muted/50">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {category.description || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {category.products_count || 0}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="text-sm text-brand hover:text-brand-hover"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="text-sm text-destructive hover:text-destructive/80"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card-surface w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn-primary flex-1 justify-center">
                  {editingCategory ? 'Update Category' : 'Create Category'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;