// src/components/Products.tsx
import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { Product } from '../types';

const Products: React.FC = () => {
  const { products, isLoading, createProduct, updateProduct, deleteProduct } = useProducts();
  const { categories } = useCategories();
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    model_no: '',
    description: '',
    key_features: '',
    price: '',
    category_id: '',
    stock: '',
    images: [] as File[],
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setFormData({ ...formData, images: [...formData.images, ...files] });
      
      // Create previews
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews([...imagePreviews, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
    setImagePreviews(newPreviews);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    
    // Append all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        if (key === 'key_features') {
          const features = (value as string).split('\n').filter(f => f.trim() !== '');
          formDataToSend.append(key, JSON.stringify(features));
        } else if (key === 'images') {
          // Handle multiple images
          (value as File[]).forEach((file) => {
            formDataToSend.append('images[]', file);
          });
        } else {
          formDataToSend.append(key, value as string);
        }
      }
    });

    if (editingProduct) {
      updateProduct({ id: editingProduct.id, data: formDataToSend });
    } else {
      createProduct(formDataToSend);
    }
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      model_no: '',
      description: '',
      key_features: '',
      price: '',
      category_id: '',
      stock: '',
      images: [],
    });
    setImagePreviews([]);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      model_no: product.model_no || '',
      description: product.description || '',
      key_features: Array.isArray(product.key_features) 
        ? product.key_features.join('\n') 
        : product.key_features || '',
      price: product.price.toString(),
      category_id: product.category_id.toString(),
      stock: product.stock.toString(),
      images: [],
    });
    setImagePreviews([]);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Products</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="btn-primary"
        >
          + Add Product
        </button>
      </div>

      <div className="card-surface overflow-hidden">
        {products.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No products found. Click "Add Product" to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                    Images
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                    Name / Model
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: Product) => (
                  <tr key={product.id} className="border-t border-border hover:bg-muted/50">
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2">
                        {product.images && product.images.length > 0 ? (
                          product.images.slice(0, 3).map((img) => (
                            <div
                              key={img.id}
                              className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                            >
                              <img
                                src={`https://api.aquacityonline.shop/storage/${img.image}`}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                              {img.is_primary && (
                                <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-xs">
                            No img
                          </div>
                        )}
                        {product.images && product.images.length > 3 && (
                          <div className="w-10 h-10 bg-muted rounded-full border-2 border-white flex items-center justify-center text-xs text-muted-foreground">
                            +{product.images.length - 3}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-foreground">{product.name}</div>
                      {product.model_no && (
                        <div className="text-xs text-muted-foreground">Model: {product.model_no}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {product.category?.name || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                     Rs{Number(product.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm">{product.stock}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-sm text-brand hover:text-brand-hover"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
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
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card-surface w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Product Name *
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
                    Model Number
                  </label>
                  <input
                    type="text"
                    value={formData.model_no}
                    onChange={(e) => setFormData({ ...formData, model_no: e.target.value })}
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                    placeholder="e.g., WD-1000"
                  />
                </div>
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
                  placeholder="Product description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Key Features (one per line)
                </label>
                <textarea
                  value={formData.key_features}
                  onChange={(e) => setFormData({ ...formData, key_features: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                  placeholder="5-stage filtration&#10;UV sterilization&#10;RO membrane"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter each feature on a new line
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat: { id: number; name: string }) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Stock *
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Product Images (Multiple)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-soft file:text-brand hover:file:bg-brand-soft/80 cursor-pointer"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  You can select multiple images. First image will be the primary.
                </p>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                        {index === 0 && (
                          <div className="absolute bottom-1 left-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
                            Primary
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Show existing images when editing */}
                {editingProduct?.images && editingProduct.images.length > 0 && imagePreviews.length === 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-muted-foreground mb-2">Current Images:</p>
                    <div className="grid grid-cols-4 gap-2">
                      {editingProduct.images.map((img) => (
                        <div key={img.id} className="relative group">
                          <img
                            src={`https://api.aquacityonline.shop/storage/${img.image}`}
                            alt="Product"
                            className="w-full h-20 object-cover rounded-lg"
                          />
                          {img.is_primary && (
                            <div className="absolute bottom-1 left-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
                              Primary
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Upload new images to replace or add more
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn-primary flex-1 justify-center">
                  {editingProduct ? 'Update Product' : 'Create Product'}
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

export default Products;