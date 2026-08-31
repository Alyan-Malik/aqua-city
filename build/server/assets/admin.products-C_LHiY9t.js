import { n as useProducts } from "./useProducts-CxPBCS1w.js";
import { t as useCategories } from "./useCategories-Bp0nue0s.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/Products.tsx
var Products = () => {
	const { products, isLoading, createProduct, updateProduct, deleteProduct } = useProducts();
	const { categories } = useCategories();
	const [showModal, setShowModal] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);
	const [formData, setFormData] = useState({
		name: "",
		model_no: "",
		description: "",
		key_features: "",
		price: "",
		category_id: "",
		stock: "",
		images: []
	});
	const [imagePreviews, setImagePreviews] = useState([]);
	const handleImageChange = (e) => {
		const files = Array.from(e.target.files || []);
		if (files.length > 0) {
			setFormData({
				...formData,
				images: [...formData.images, ...files]
			});
			const newPreviews = files.map((file) => URL.createObjectURL(file));
			setImagePreviews([...imagePreviews, ...newPreviews]);
		}
	};
	const removeImage = (index) => {
		const newImages = formData.images.filter((_, i) => i !== index);
		const newPreviews = imagePreviews.filter((_, i) => i !== index);
		setFormData({
			...formData,
			images: newImages
		});
		setImagePreviews(newPreviews);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const formDataToSend = new FormData();
		Object.entries(formData).forEach(([key, value]) => {
			if (value !== null && value !== "") if (key === "key_features") {
				const features = value.split("\n").filter((f) => f.trim() !== "");
				formDataToSend.append(key, JSON.stringify(features));
			} else if (key === "images") value.forEach((file) => {
				formDataToSend.append("images[]", file);
			});
			else formDataToSend.append(key, value);
		});
		if (editingProduct) updateProduct({
			id: editingProduct.id,
			data: formDataToSend
		});
		else createProduct(formDataToSend);
		setShowModal(false);
		resetForm();
	};
	const resetForm = () => {
		setFormData({
			name: "",
			model_no: "",
			description: "",
			key_features: "",
			price: "",
			category_id: "",
			stock: "",
			images: []
		});
		setImagePreviews([]);
		setEditingProduct(null);
	};
	const handleEdit = (product) => {
		setEditingProduct(product);
		setFormData({
			name: product.name,
			model_no: product.model_no || "",
			description: product.description || "",
			key_features: Array.isArray(product.key_features) ? product.key_features.join("\n") : product.key_features || "",
			price: product.price.toString(),
			category_id: product.category_id.toString(),
			stock: product.stock.toString(),
			images: []
		});
		setImagePreviews([]);
		setShowModal(true);
	};
	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this product?")) deleteProduct(id);
	};
	if (isLoading) return /* @__PURE__ */ jsx("div", {
		className: "text-center py-8",
		children: "Loading products..."
	});
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "flex justify-between items-center mb-6",
			children: [/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-bold text-foreground",
				children: "Products"
			}), /* @__PURE__ */ jsx("button", {
				onClick: () => {
					resetForm();
					setShowModal(true);
				},
				className: "btn-primary",
				children: "+ Add Product"
			})]
		}),
		/* @__PURE__ */ jsx("div", {
			className: "card-surface overflow-hidden",
			children: products.length === 0 ? /* @__PURE__ */ jsx("div", {
				className: "text-center py-8 text-muted-foreground",
				children: "No products found. Click \"Add Product\" to create one."
			}) : /* @__PURE__ */ jsx("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ jsxs("table", {
					className: "w-full",
					children: [/* @__PURE__ */ jsx("thead", {
						className: "bg-muted",
						children: /* @__PURE__ */ jsxs("tr", { children: [
							/* @__PURE__ */ jsx("th", {
								className: "px-6 py-3 text-left text-sm font-medium text-muted-foreground",
								children: "Images"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-6 py-3 text-left text-sm font-medium text-muted-foreground",
								children: "Name / Model"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-6 py-3 text-left text-sm font-medium text-muted-foreground",
								children: "Category"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-6 py-3 text-left text-sm font-medium text-muted-foreground",
								children: "Price"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-6 py-3 text-left text-sm font-medium text-muted-foreground",
								children: "Stock"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-6 py-3 text-left text-sm font-medium text-muted-foreground",
								children: "Actions"
							})
						] })
					}), /* @__PURE__ */ jsx("tbody", { children: products.map((product) => /* @__PURE__ */ jsxs("tr", {
						className: "border-t border-border hover:bg-muted/50",
						children: [
							/* @__PURE__ */ jsx("td", {
								className: "px-6 py-4",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex -space-x-2",
									children: [product.images && product.images.length > 0 ? product.images.slice(0, 3).map((img) => /* @__PURE__ */ jsxs("div", {
										className: "relative w-10 h-10 rounded-full border-2 border-white overflow-hidden",
										children: [/* @__PURE__ */ jsx("img", {
											src: `https://api.aquacityonline.shop/storage/${img.image}`,
											alt: product.name,
											className: "w-full h-full object-cover"
										}), img.is_primary && /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white" })]
									}, img.id)) : /* @__PURE__ */ jsx("div", {
										className: "w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-xs",
										children: "No img"
									}), product.images && product.images.length > 3 && /* @__PURE__ */ jsxs("div", {
										className: "w-10 h-10 bg-muted rounded-full border-2 border-white flex items-center justify-center text-xs text-muted-foreground",
										children: ["+", product.images.length - 3]
									})]
								})
							}),
							/* @__PURE__ */ jsxs("td", {
								className: "px-6 py-4",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-sm font-medium text-foreground",
									children: product.name
								}), product.model_no && /* @__PURE__ */ jsxs("div", {
									className: "text-xs text-muted-foreground",
									children: ["Model: ", product.model_no]
								})]
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-6 py-4 text-sm text-muted-foreground",
								children: product.category?.name || "-"
							}),
							/* @__PURE__ */ jsxs("td", {
								className: "px-6 py-4 text-sm font-medium",
								children: ["Rs", Number(product.price).toFixed(2)]
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-6 py-4 text-sm",
								children: product.stock
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-6 py-4",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("button", {
										onClick: () => handleEdit(product),
										className: "text-sm text-brand hover:text-brand-hover",
										children: "Edit"
									}), /* @__PURE__ */ jsx("button", {
										onClick: () => handleDelete(product.id),
										className: "text-sm text-destructive hover:text-destructive/80",
										children: "Delete"
									})]
								})
							})
						]
					}, product.id)) })]
				})
			})
		}),
		showModal && /* @__PURE__ */ jsx("div", {
			className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4",
			children: /* @__PURE__ */ jsxs("div", {
				className: "card-surface w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex justify-between items-center mb-6",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-xl font-bold",
						children: editingProduct ? "Edit Product" : "Add New Product"
					}), /* @__PURE__ */ jsx("button", {
						onClick: () => {
							setShowModal(false);
							resetForm();
						},
						className: "text-muted-foreground hover:text-foreground",
						children: "✕"
					})]
				}), /* @__PURE__ */ jsxs("form", {
					onSubmit: handleSubmit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "block text-sm font-medium text-foreground mb-1",
								children: "Product Name *"
							}), /* @__PURE__ */ jsx("input", {
								type: "text",
								value: formData.name,
								onChange: (e) => setFormData({
									...formData,
									name: e.target.value
								}),
								className: "w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand",
								required: true
							})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "block text-sm font-medium text-foreground mb-1",
								children: "Model Number"
							}), /* @__PURE__ */ jsx("input", {
								type: "text",
								value: formData.model_no,
								onChange: (e) => setFormData({
									...formData,
									model_no: e.target.value
								}),
								className: "w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand",
								placeholder: "e.g., WD-1000"
							})] })]
						}),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-sm font-medium text-foreground mb-1",
							children: "Description"
						}), /* @__PURE__ */ jsx("textarea", {
							value: formData.description,
							onChange: (e) => setFormData({
								...formData,
								description: e.target.value
							}),
							rows: 3,
							className: "w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand",
							placeholder: "Product description..."
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("label", {
								className: "block text-sm font-medium text-foreground mb-1",
								children: "Key Features (one per line)"
							}),
							/* @__PURE__ */ jsx("textarea", {
								value: formData.key_features,
								onChange: (e) => setFormData({
									...formData,
									key_features: e.target.value
								}),
								rows: 4,
								className: "w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand",
								placeholder: "5-stage filtration\nUV sterilization\nRO membrane"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-muted-foreground mt-1",
								children: "Enter each feature on a new line"
							})
						] }),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 md:grid-cols-3 gap-4",
							children: [
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "block text-sm font-medium text-foreground mb-1",
									children: "Price *"
								}), /* @__PURE__ */ jsx("input", {
									type: "number",
									step: "0.01",
									value: formData.price,
									onChange: (e) => setFormData({
										...formData,
										price: e.target.value
									}),
									className: "w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand",
									required: true
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "block text-sm font-medium text-foreground mb-1",
									children: "Category *"
								}), /* @__PURE__ */ jsxs("select", {
									value: formData.category_id,
									onChange: (e) => setFormData({
										...formData,
										category_id: e.target.value
									}),
									className: "w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand",
									required: true,
									children: [/* @__PURE__ */ jsx("option", {
										value: "",
										children: "Select Category"
									}), categories.map((cat) => /* @__PURE__ */ jsx("option", {
										value: cat.id,
										children: cat.name
									}, cat.id))]
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "block text-sm font-medium text-foreground mb-1",
									children: "Stock *"
								}), /* @__PURE__ */ jsx("input", {
									type: "number",
									value: formData.stock,
									onChange: (e) => setFormData({
										...formData,
										stock: e.target.value
									}),
									className: "w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand",
									required: true
								})] })
							]
						}),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("label", {
								className: "block text-sm font-medium text-foreground mb-1",
								children: "Product Images (Multiple)"
							}),
							/* @__PURE__ */ jsx("input", {
								type: "file",
								accept: "image/*",
								multiple: true,
								onChange: handleImageChange,
								className: "w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-soft file:text-brand hover:file:bg-brand-soft/80 cursor-pointer"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-muted-foreground mt-1",
								children: "You can select multiple images. First image will be the primary."
							}),
							imagePreviews.length > 0 && /* @__PURE__ */ jsx("div", {
								className: "mt-3 grid grid-cols-4 gap-2",
								children: imagePreviews.map((preview, index) => /* @__PURE__ */ jsxs("div", {
									className: "relative group",
									children: [
										/* @__PURE__ */ jsx("img", {
											src: preview,
											alt: `Preview ${index + 1}`,
											className: "w-full h-20 object-cover rounded-lg"
										}),
										/* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => removeImage(index),
											className: "absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors",
											children: "×"
										}),
										index === 0 && /* @__PURE__ */ jsx("div", {
											className: "absolute bottom-1 left-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded",
											children: "Primary"
										})
									]
								}, index))
							}),
							editingProduct?.images && editingProduct.images.length > 0 && imagePreviews.length === 0 && /* @__PURE__ */ jsxs("div", {
								className: "mt-3",
								children: [
									/* @__PURE__ */ jsx("p", {
										className: "text-xs text-muted-foreground mb-2",
										children: "Current Images:"
									}),
									/* @__PURE__ */ jsx("div", {
										className: "grid grid-cols-4 gap-2",
										children: editingProduct.images.map((img) => /* @__PURE__ */ jsxs("div", {
											className: "relative group",
											children: [/* @__PURE__ */ jsx("img", {
												src: `https://api.aquacityonline.shop/storage/${img.image}`,
												alt: "Product",
												className: "w-full h-20 object-cover rounded-lg"
											}), img.is_primary && /* @__PURE__ */ jsx("div", {
												className: "absolute bottom-1 left-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded",
												children: "Primary"
											})]
										}, img.id))
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-xs text-muted-foreground mt-2",
										children: "Upload new images to replace or add more"
									})
								]
							})
						] }),
						/* @__PURE__ */ jsxs("div", {
							className: "flex gap-3 pt-4",
							children: [/* @__PURE__ */ jsx("button", {
								type: "submit",
								className: "btn-primary flex-1 justify-center",
								children: editingProduct ? "Update Product" : "Create Product"
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => {
									setShowModal(false);
									resetForm();
								},
								className: "flex-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors",
								children: "Cancel"
							})]
						})
					]
				})]
			})
		})
	] });
};
//#endregion
//#region src/routes/admin.products.tsx?tsr-split=component
var SplitComponent = Products;
//#endregion
export { SplitComponent as component };
