import { n as useProducts } from "./useProducts-C_iE3Zyf.js";
import { t as useCategories } from "./useCategories-Bp0nue0s.js";
import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { FiAlertCircle, FiLoader, FiUpload } from "react-icons/fi";
import { toast } from "sonner";
//#region src/components/Products.tsx
var MAX_FILE_SIZE = 2 * 1024 * 1024;
var ALLOWED_TYPES = [
	"image/jpeg",
	"image/png",
	"image/jpg",
	"image/gif",
	"image/webp"
];
var Products = () => {
	const { products, isLoading, createProduct, updateProduct, deleteProduct, isCreating, isUpdating } = useProducts();
	const { categories } = useCategories();
	const [showModal, setShowModal] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formErrors, setFormErrors] = useState({});
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
	const validateField = (name, value) => {
		switch (name) {
			case "name":
				if (!value || value.trim() === "") return "Product name is required";
				if (value.length > 255) return "Product name must be less than 255 characters";
				return "";
			case "price":
				if (!value || value === "") return "Price is required";
				if (isNaN(Number(value)) || Number(value) < 0) return "Price must be a valid positive number";
				return "";
			case "category_id":
				if (!value || value === "") return "Category is required";
				return "";
			case "stock":
				if (!value && value !== 0) return "Stock is required";
				if (isNaN(Number(value)) || Number(value) < 0) return "Stock must be a valid non-negative number";
				return "";
			case "model_no":
				if (value && value.length > 100) return "Model number must be less than 100 characters";
				return "";
			default: return "";
		}
	};
	const validateForm = () => {
		const errors = {};
		[
			"name",
			"price",
			"category_id",
			"stock",
			"model_no"
		].forEach((field) => {
			const error = validateField(field, formData[field]);
			if (error) errors[field] = error;
		});
		if (formData.images.length > 0) for (const file of formData.images) {
			if (file.size > MAX_FILE_SIZE) {
				errors.images = `Image "${file.name}" is too large. Max size is 2MB per image.`;
				break;
			}
			if (!ALLOWED_TYPES.includes(file.type)) {
				errors.images = `Image "${file.name}" has an unsupported format. Please use JPG, PNG, GIF, or WebP.`;
				break;
			}
		}
		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};
	const handleInputChange = (name, value) => {
		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
		if (formErrors[name]) setFormErrors((prev) => {
			const newErrors = { ...prev };
			delete newErrors[name];
			return newErrors;
		});
	};
	const handleImageChange = (e) => {
		const files = Array.from(e.target.files || []);
		if (files.length === 0) return;
		const validFiles = [];
		const errors = [];
		files.forEach((file) => {
			if (file.size > MAX_FILE_SIZE) errors.push(`"${file.name}" is too large (max 2MB)`);
			else if (!ALLOWED_TYPES.includes(file.type)) errors.push(`"${file.name}" has an unsupported format`);
			else validFiles.push(file);
		});
		if (errors.length > 0) errors.forEach((err) => toast.error(err));
		if (validFiles.length > 0) {
			setFormData((prev) => ({
				...prev,
				images: [...prev.images, ...validFiles]
			}));
			const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
			setImagePreviews((prev) => [...prev, ...newPreviews]);
			if (formErrors.images) setFormErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors.images;
				return newErrors;
			});
		}
		e.target.value = "";
	};
	const removeImage = (index) => {
		URL.revokeObjectURL(imagePreviews[index]);
		const newImages = formData.images.filter((_, i) => i !== index);
		const newPreviews = imagePreviews.filter((_, i) => i !== index);
		setFormData({
			...formData,
			images: newImages
		});
		setImagePreviews(newPreviews);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) {
			toast.error("Please fix the errors in the form");
			return;
		}
		setIsSubmitting(true);
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
		try {
			if (editingProduct) await updateProduct({
				id: editingProduct.id,
				data: formDataToSend
			});
			else await createProduct(formDataToSend);
			setShowModal(false);
			resetForm();
		} catch (error) {
			console.error("Form submission error:", error);
		} finally {
			setIsSubmitting(false);
		}
	};
	const resetForm = () => {
		imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
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
		setFormErrors({});
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
		setFormErrors({});
		setShowModal(true);
	};
	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this product?")) deleteProduct(id);
	};
	const handleCloseModal = () => {
		if (isSubmitting) return;
		setShowModal(false);
		resetForm();
	};
	if (isLoading) return /* @__PURE__ */ jsxs("div", {
		className: "text-center py-8 flex items-center justify-center gap-2",
		children: [/* @__PURE__ */ jsx(FiLoader, { className: "animate-spin" }), /* @__PURE__ */ jsx("span", { children: "Loading products..." })]
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
										className: "relative w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-muted flex items-center justify-center",
										children: [/* @__PURE__ */ jsx("img", {
											src: `https://api.aquacityonline.shop/storage/${img.image}`,
											alt: product.name,
											className: "w-full h-full object-contain"
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
			onClick: (e) => {
				if (e.target === e.currentTarget && !isSubmitting) handleCloseModal();
			},
			children: /* @__PURE__ */ jsxs("div", {
				className: "card-surface w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex justify-between items-center mb-6",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-xl font-bold",
						children: editingProduct ? "Edit Product" : "Add New Product"
					}), /* @__PURE__ */ jsx("button", {
						onClick: handleCloseModal,
						disabled: isSubmitting,
						className: "text-muted-foreground hover:text-foreground disabled:opacity-50",
						children: "✕"
					})]
				}), /* @__PURE__ */ jsxs("form", {
					onSubmit: handleSubmit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("label", {
									className: "block text-sm font-medium text-foreground mb-1",
									children: "Product Name *"
								}),
								/* @__PURE__ */ jsx("input", {
									type: "text",
									value: formData.name,
									onChange: (e) => handleInputChange("name", e.target.value),
									className: `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand ${formErrors.name ? "border-destructive" : "border-input"}`,
									placeholder: "e.g., Aqua Pure 6-Stage RO",
									disabled: isSubmitting
								}),
								formErrors.name && /* @__PURE__ */ jsxs("p", {
									className: "mt-1 text-xs text-destructive flex items-center gap-1",
									children: [
										/* @__PURE__ */ jsx(FiAlertCircle, { className: "w-3 h-3" }),
										" ",
										formErrors.name
									]
								})
							] }), /* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("label", {
									className: "block text-sm font-medium text-foreground mb-1",
									children: "Model Number"
								}),
								/* @__PURE__ */ jsx("input", {
									type: "text",
									value: formData.model_no,
									onChange: (e) => handleInputChange("model_no", e.target.value),
									className: `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand ${formErrors.model_no ? "border-destructive" : "border-input"}`,
									placeholder: "e.g., WD-1000",
									disabled: isSubmitting
								}),
								formErrors.model_no && /* @__PURE__ */ jsxs("p", {
									className: "mt-1 text-xs text-destructive flex items-center gap-1",
									children: [
										/* @__PURE__ */ jsx(FiAlertCircle, { className: "w-3 h-3" }),
										" ",
										formErrors.model_no
									]
								})
							] })]
						}),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-sm font-medium text-foreground mb-1",
							children: "Description"
						}), /* @__PURE__ */ jsx("textarea", {
							value: formData.description,
							onChange: (e) => handleInputChange("description", e.target.value),
							rows: 3,
							className: "w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand",
							placeholder: "Product description...",
							disabled: isSubmitting
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("label", {
								className: "block text-sm font-medium text-foreground mb-1",
								children: "Key Features (one per line)"
							}),
							/* @__PURE__ */ jsx("textarea", {
								value: formData.key_features,
								onChange: (e) => handleInputChange("key_features", e.target.value),
								rows: 4,
								className: "w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand",
								placeholder: "5-stage filtration\nUV sterilization\nRO membrane",
								disabled: isSubmitting
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-muted-foreground mt-1",
								children: "Enter each feature on a new line"
							})
						] }),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 md:grid-cols-3 gap-4",
							children: [
								/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx("label", {
										className: "block text-sm font-medium text-foreground mb-1",
										children: "Price *"
									}),
									/* @__PURE__ */ jsx("input", {
										type: "number",
										step: "0.01",
										min: "0",
										value: formData.price,
										onChange: (e) => handleInputChange("price", e.target.value),
										className: `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand ${formErrors.price ? "border-destructive" : "border-input"}`,
										placeholder: "0.00",
										disabled: isSubmitting
									}),
									formErrors.price && /* @__PURE__ */ jsxs("p", {
										className: "mt-1 text-xs text-destructive flex items-center gap-1",
										children: [
											/* @__PURE__ */ jsx(FiAlertCircle, { className: "w-3 h-3" }),
											" ",
											formErrors.price
										]
									})
								] }),
								/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx("label", {
										className: "block text-sm font-medium text-foreground mb-1",
										children: "Category *"
									}),
									/* @__PURE__ */ jsxs("select", {
										value: formData.category_id,
										onChange: (e) => handleInputChange("category_id", e.target.value),
										className: `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand ${formErrors.category_id ? "border-destructive" : "border-input"}`,
										disabled: isSubmitting,
										children: [/* @__PURE__ */ jsx("option", {
											value: "",
											children: "Select Category"
										}), categories.map((cat) => /* @__PURE__ */ jsx("option", {
											value: cat.id,
											children: cat.name
										}, cat.id))]
									}),
									formErrors.category_id && /* @__PURE__ */ jsxs("p", {
										className: "mt-1 text-xs text-destructive flex items-center gap-1",
										children: [
											/* @__PURE__ */ jsx(FiAlertCircle, { className: "w-3 h-3" }),
											" ",
											formErrors.category_id
										]
									})
								] }),
								/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx("label", {
										className: "block text-sm font-medium text-foreground mb-1",
										children: "Stock *"
									}),
									/* @__PURE__ */ jsx("input", {
										type: "number",
										min: "0",
										value: formData.stock,
										onChange: (e) => handleInputChange("stock", e.target.value),
										className: `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand ${formErrors.stock ? "border-destructive" : "border-input"}`,
										placeholder: "0",
										disabled: isSubmitting
									}),
									formErrors.stock && /* @__PURE__ */ jsxs("p", {
										className: "mt-1 text-xs text-destructive flex items-center gap-1",
										children: [
											/* @__PURE__ */ jsx(FiAlertCircle, { className: "w-3 h-3" }),
											" ",
											formErrors.stock
										]
									})
								] })
							]
						}),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("label", {
								className: "block text-sm font-medium text-foreground mb-1",
								children: "Product Images (Multiple)"
							}),
							/* @__PURE__ */ jsxs("label", {
								className: `flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${formErrors.images ? "border-destructive bg-destructive/5" : "border-border hover:border-brand hover:bg-brand-soft/30"} ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`,
								children: [
									/* @__PURE__ */ jsx(FiUpload, { className: "w-4 h-4 text-brand" }),
									/* @__PURE__ */ jsx("span", {
										className: "text-sm text-muted-foreground",
										children: "Click to upload images (JPG, PNG, GIF, WebP — max 2MB each)"
									}),
									/* @__PURE__ */ jsx("input", {
										type: "file",
										accept: "image/jpeg,image/png,image/jpg,image/gif,image/webp",
										multiple: true,
										onChange: handleImageChange,
										className: "hidden",
										disabled: isSubmitting
									})
								]
							}),
							formErrors.images && /* @__PURE__ */ jsxs("p", {
								className: "mt-1 text-xs text-destructive flex items-center gap-1",
								children: [
									/* @__PURE__ */ jsx(FiAlertCircle, { className: "w-3 h-3" }),
									" ",
									formErrors.images
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-muted-foreground mt-1",
								children: "You can select multiple images. First image will be the primary."
							}),
							imagePreviews.length > 0 && /* @__PURE__ */ jsx("div", {
								className: "mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5",
								children: imagePreviews.map((preview, index) => /* @__PURE__ */ jsxs("div", {
									className: "relative group",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "aspect-square bg-muted rounded-lg border border-border overflow-hidden flex items-center justify-center",
											children: /* @__PURE__ */ jsx("img", {
												src: preview,
												alt: `Preview ${index + 1}`,
												className: "h-full w-full object-contain"
											})
										}),
										/* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => removeImage(index),
											disabled: isSubmitting,
											className: "absolute -top-2 -right-2 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center text-xs hover:bg-destructive/80 transition-colors disabled:opacity-50",
											children: "×"
										}),
										index === 0 && /* @__PURE__ */ jsx("span", {
											className: "absolute bottom-1.5 left-1.5 bg-green-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded",
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
										className: "grid grid-cols-2 sm:grid-cols-4 gap-2.5",
										children: editingProduct.images.map((img) => /* @__PURE__ */ jsxs("div", {
											className: "relative group",
											children: [/* @__PURE__ */ jsx("div", {
												className: "aspect-square bg-muted rounded-lg border border-border overflow-hidden flex items-center justify-center",
												children: /* @__PURE__ */ jsx("img", {
													src: `https://api.aquacityonline.shop/storage/${img.image}`,
													alt: "Product",
													className: "h-full w-full object-contain"
												})
											}), img.is_primary && /* @__PURE__ */ jsx("span", {
												className: "absolute bottom-1.5 left-1.5 bg-green-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded",
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
								disabled: isSubmitting,
								className: "btn-primary flex-1 justify-center disabled:opacity-70 disabled:cursor-not-allowed",
								children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(FiLoader, { className: "animate-spin w-4 h-4" }), /* @__PURE__ */ jsx("span", { children: editingProduct ? "Updating..." : "Creating..." })] }) : /* @__PURE__ */ jsx("span", { children: editingProduct ? "Update Product" : "Create Product" })
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: handleCloseModal,
								disabled: isSubmitting,
								className: "flex-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
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
