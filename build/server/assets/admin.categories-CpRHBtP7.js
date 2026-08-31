import { t as useCategories } from "./useCategories-Bp0nue0s.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/Categories.tsx
var Categories = () => {
	const { categories, isLoading, createCategory, updateCategory, deleteCategory } = useCategories();
	const [showModal, setShowModal] = useState(false);
	const [editingCategory, setEditingCategory] = useState(null);
	const [formData, setFormData] = useState({
		name: "",
		description: ""
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		if (editingCategory) updateCategory({
			id: editingCategory.id,
			data: formData
		});
		else createCategory(formData);
		setShowModal(false);
		resetForm();
	};
	const resetForm = () => {
		setFormData({
			name: "",
			description: ""
		});
		setEditingCategory(null);
	};
	const handleEdit = (category) => {
		setEditingCategory(category);
		setFormData({
			name: category.name,
			description: category.description || ""
		});
		setShowModal(true);
	};
	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this category?")) deleteCategory(id);
	};
	if (isLoading) return /* @__PURE__ */ jsx("div", {
		className: "text-center py-8",
		children: "Loading categories..."
	});
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "flex justify-between items-center mb-6",
			children: [/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-bold text-foreground",
				children: "Categories"
			}), /* @__PURE__ */ jsx("button", {
				onClick: () => {
					resetForm();
					setShowModal(true);
				},
				className: "btn-primary",
				children: "+ Add Category"
			})]
		}),
		/* @__PURE__ */ jsx("div", {
			className: "card-surface overflow-hidden",
			children: categories.length === 0 ? /* @__PURE__ */ jsx("div", {
				className: "text-center py-8 text-muted-foreground",
				children: "No categories found. Click \"Add Category\" to create one."
			}) : /* @__PURE__ */ jsxs("table", {
				className: "w-full",
				children: [/* @__PURE__ */ jsx("thead", {
					className: "bg-muted",
					children: /* @__PURE__ */ jsxs("tr", { children: [
						/* @__PURE__ */ jsx("th", {
							className: "px-6 py-3 text-left text-sm font-medium text-muted-foreground",
							children: "Name"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "px-6 py-3 text-left text-sm font-medium text-muted-foreground",
							children: "Description"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "px-6 py-3 text-left text-sm font-medium text-muted-foreground",
							children: "Products"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "px-6 py-3 text-left text-sm font-medium text-muted-foreground",
							children: "Actions"
						})
					] })
				}), /* @__PURE__ */ jsx("tbody", { children: categories.map((category) => /* @__PURE__ */ jsxs("tr", {
					className: "border-t border-border hover:bg-muted/50",
					children: [
						/* @__PURE__ */ jsx("td", {
							className: "px-6 py-4 text-sm font-medium text-foreground",
							children: category.name
						}),
						/* @__PURE__ */ jsx("td", {
							className: "px-6 py-4 text-sm text-muted-foreground",
							children: category.description || "-"
						}),
						/* @__PURE__ */ jsx("td", {
							className: "px-6 py-4 text-sm text-muted-foreground",
							children: category.products_count || 0
						}),
						/* @__PURE__ */ jsx("td", {
							className: "px-6 py-4",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("button", {
									onClick: () => handleEdit(category),
									className: "text-sm text-brand hover:text-brand-hover",
									children: "Edit"
								}), /* @__PURE__ */ jsx("button", {
									onClick: () => handleDelete(category.id),
									className: "text-sm text-destructive hover:text-destructive/80",
									children: "Delete"
								})]
							})
						})
					]
				}, category.id)) })]
			})
		}),
		showModal && /* @__PURE__ */ jsx("div", {
			className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4",
			children: /* @__PURE__ */ jsxs("div", {
				className: "card-surface w-full max-w-md p-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex justify-between items-center mb-6",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-xl font-bold",
						children: editingCategory ? "Edit Category" : "Add New Category"
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
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-sm font-medium text-foreground mb-1",
							children: "Category Name"
						}), /* @__PURE__ */ jsx("input", {
							type: "text",
							value: formData.name,
							onChange: (e) => setFormData({
								...formData,
								name: e.target.value
							}),
							className: "w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand",
							required: true
						})] }),
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
							className: "w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
						})] }),
						/* @__PURE__ */ jsxs("div", {
							className: "flex gap-3 pt-4",
							children: [/* @__PURE__ */ jsx("button", {
								type: "submit",
								className: "btn-primary flex-1 justify-center",
								children: editingCategory ? "Update Category" : "Create Category"
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
//#region src/routes/admin.categories.tsx?tsr-split=component
var SplitComponent = Categories;
//#endregion
export { SplitComponent as component };
