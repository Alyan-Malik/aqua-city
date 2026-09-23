// src/components/Products.tsx
import React, { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import { Product } from "../types";
import { FiLoader, FiUpload, FiX, FiAlertCircle } from "react-icons/fi";
import { toast } from "sonner";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];

const Products: React.FC = () => {
  const { products, isLoading, createProduct, updateProduct, deleteProduct, isCreating, isUpdating } = useProducts();
  const { categories } = useCategories();
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    model_no: "",
    description: "",
    key_features: "",
    price: "",
    category_id: "",
    stock: "",
    images: [] as File[],
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Validate a single field
  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'name':
        if (!value || value.trim() === '') return 'Product name is required';
        if (value.length > 255) return 'Product name must be less than 255 characters';
        return '';
      case 'price':
        if (!value || value === '') return 'Price is required';
        if (isNaN(Number(value)) || Number(value) < 0) return 'Price must be a valid positive number';
        return '';
      case 'category_id':
        if (!value || value === '') return 'Category is required';
        return '';
      case 'stock':
        if (!value && value !== 0) return 'Stock is required';
        if (isNaN(Number(value)) || Number(value) < 0) return 'Stock must be a valid non-negative number';
        return '';
      case 'model_no':
        if (value && value.length > 100) return 'Model number must be less than 100 characters';
        return '';
      default:
        return '';
    }
  };

  // Validate entire form
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    const fieldsToValidate = ['name', 'price', 'category_id', 'stock', 'model_no'];
    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) errors[field] = error;
    });

    // Validate images
    if (formData.images.length > 0) {
      for (const file of formData.images) {
        if (file.size > MAX_FILE_SIZE) {
          errors.images = `Image "${file.name}" is too large. Max size is 2MB per image.`;
          break;
        }
        if (!ALLOWED_TYPES.includes(file.type)) {
          errors.images = `Image "${file.name}" has an unsupported format. Please use JPG, PNG, GIF, or WebP.`;
          break;
        }
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles: File[] = [];
    const errors: string[] = [];

    files.forEach(file => {
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`"${file.name}" is too large (max 2MB)`);
      } else if (!ALLOWED_TYPES.includes(file.type)) {
        errors.push(`"${file.name}" has an unsupported format`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      errors.forEach(err => toast.error(err));
    }

    if (validFiles.length > 0) {
      setFormData(prev => ({ ...prev, images: [...prev.images, ...validFiles] }));
      const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
      
      // Clear image error if any
      if (formErrors.images) {
        setFormErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.images;
          return newErrors;
        });
      }
    }

    // Reset input value so same file can be selected again
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form first
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);
    const formDataToSend = new FormData();

    // Append all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        if (key === "key_features") {
          const features = (value as string).split("\n").filter((f) => f.trim() !== "");
          formDataToSend.append(key, JSON.stringify(features));
        } else if (key === "images") {
          (value as File[]).forEach((file) => {
            formDataToSend.append("images[]", file);
          });
        } else {
          formDataToSend.append(key, value as string);
        }
      }
    });

    try {
      if (editingProduct) {
        await updateProduct({ id: editingProduct.id, data: formDataToSend });
      } else {
        await createProduct(formDataToSend);
      }
      
      // Only close modal and reset on success
      setShowModal(false);
      resetForm();
    } catch (error: any) {
      // Error is already handled by the hook's onError
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    // Clean up object URLs
    imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
    
    setFormData({
      name: "",
      model_no: "",
      description: "",
      key_features: "",
      price: "",
      category_id: "",
      stock: "",
      images: [],
    });
    setImagePreviews([]);
    setEditingProduct(null);
    setFormErrors({});
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      model_no: product.model_no || "",
      description: product.description || "",
      key_features: Array.isArray(product.key_features)
        ? product.key_features.join("\n")
        : product.key_features || "",
      price: product.price.toString(),
      category_id: product.category_id.toString(),
      stock: product.stock.toString(),
      images: [],
    });
    setImagePreviews([]);
    setFormErrors({});
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  const handleCloseModal = () => {
    if (isSubmitting) return; // Don't close while submitting
    setShowModal(false);
    resetForm();
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 flex items-center justify-center gap-2">
        <FiLoader className="animate-spin" />
        <span>Loading products...</span>
      </div>
    );
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
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Images</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Name / Model</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Stock</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
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
                              className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-muted flex items-center justify-center"
                            >
                              <img
                                src={`https://api.aquacityonline.shop/storage/${img.image}`}
                                alt={product.name}
                                className="w-full h-full object-contain"
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
                      {product.category?.name || "-"}
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
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isSubmitting) {
              handleCloseModal();
            }
          }}
        >
          <div className="card-surface w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={handleCloseModal}
                disabled={isSubmitting}
                className="text-muted-foreground hover:text-foreground disabled:opacity-50"
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
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand ${
                      formErrors.name ? 'border-destructive' : 'border-input'
                    }`}
                    placeholder="e.g., Aqua Pure 6-Stage RO"
                    disabled={isSubmitting}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                      <FiAlertCircle className="w-3 h-3" /> {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Model Number
                  </label>
                  <input
                    type="text"
                    value={formData.model_no}
                    onChange={(e) => handleInputChange('model_no', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand ${
                      formErrors.model_no ? 'border-destructive' : 'border-input'
                    }`}
                    placeholder="e.g., WD-1000"
                    disabled={isSubmitting}
                  />
                  {formErrors.model_no && (
                    <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                      <FiAlertCircle className="w-3 h-3" /> {formErrors.model_no}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                  placeholder="Product description..."
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Key Features (one per line)
                </label>
                <textarea
                  value={formData.key_features}
                  onChange={(e) => handleInputChange('key_features', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                  placeholder={"5-stage filtration\nUV sterilization\nRO membrane"}
                  disabled={isSubmitting}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter each feature on a new line
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Price *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand ${
                      formErrors.price ? 'border-destructive' : 'border-input'
                    }`}
                    placeholder="0.00"
                    disabled={isSubmitting}
                  />
                  {formErrors.price && (
                    <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                      <FiAlertCircle className="w-3 h-3" /> {formErrors.price}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => handleInputChange('category_id', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand ${
                      formErrors.category_id ? 'border-destructive' : 'border-input'
                    }`}
                    disabled={isSubmitting}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat: { id: number; name: string }) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {formErrors.category_id && (
                    <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                      <FiAlertCircle className="w-3 h-3" /> {formErrors.category_id}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Stock *</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => handleInputChange('stock', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand ${
                      formErrors.stock ? 'border-destructive' : 'border-input'
                    }`}
                    placeholder="0"
                    disabled={isSubmitting}
                  />
                  {formErrors.stock && (
                    <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                      <FiAlertCircle className="w-3 h-3" /> {formErrors.stock}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Product Images (Multiple)
                </label>
                <label className={`flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                  formErrors.images ? 'border-destructive bg-destructive/5' : 'border-border hover:border-brand hover:bg-brand-soft/30'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <FiUpload className="w-4 h-4 text-brand" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload images (JPG, PNG, GIF, WebP — max 2MB each)
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={isSubmitting}
                  />
                </label>
                {formErrors.images && (
                  <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                    <FiAlertCircle className="w-3 h-3" /> {formErrors.images}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  You can select multiple images. First image will be the primary.
                </p>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-muted rounded-lg border border-border overflow-hidden flex items-center justify-center">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          disabled={isSubmitting}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center text-xs hover:bg-destructive/80 transition-colors disabled:opacity-50"
                        >
                          ×
                        </button>
                        {index === 0 && (
                          <span className="absolute bottom-1.5 left-1.5 bg-green-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                            Primary
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Show existing images when editing */}
                {editingProduct?.images &&
                  editingProduct.images.length > 0 &&
                  imagePreviews.length === 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-2">Current Images:</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {editingProduct.images.map((img) => (
                          <div key={img.id} className="relative group">
                            <div className="aspect-square bg-muted rounded-lg border border-border overflow-hidden flex items-center justify-center">
                              <img
                                src={`https://api.aquacityonline.shop/storage/${img.image}`}
                                alt="Product"
                                className="h-full w-full object-contain"
                              />
                            </div>
                            {img.is_primary && (
                              <span className="absolute bottom-1.5 left-1.5 bg-green-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                                Primary
                              </span>
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
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex-1 justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <FiLoader className="animate-spin w-4 h-4" />
                      <span>{editingProduct ? "Updating..." : "Creating..."}</span>
                    </>
                  ) : (
                    <span>{editingProduct ? "Update Product" : "Create Product"}</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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