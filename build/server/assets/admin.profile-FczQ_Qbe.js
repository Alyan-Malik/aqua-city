import { t as useAuthStore } from "./authStore-CK_b9fs-.js";
import { t as useAuth } from "./useAuth-Bcoy-596.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/Profile.tsx
var Profile = () => {
	const { admin } = useAuthStore();
	const { updateProfile, updatePassword } = useAuth();
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(admin?.name || "");
	const [email, setEmail] = useState(admin?.email || "");
	const [passwordData, setPasswordData] = useState({
		current_password: "",
		new_password: "",
		new_password_confirmation: ""
	});
	const handleProfileUpdate = (e) => {
		e.preventDefault();
		updateProfile({
			name,
			email
		});
		setIsEditing(false);
	};
	const handlePasswordUpdate = (e) => {
		e.preventDefault();
		updatePassword(passwordData);
		setPasswordData({
			current_password: "",
			new_password: "",
			new_password_confirmation: ""
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-2xl mx-auto space-y-6",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-bold text-foreground",
				children: "Profile Settings"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "card-surface p-6",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-lg font-semibold text-foreground mb-4",
					children: "Personal Information"
				}), !isEditing ? /* @__PURE__ */ jsxs("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm text-muted-foreground",
							children: "Name"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-foreground font-medium",
							children: admin?.name
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm text-muted-foreground",
							children: "Email"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-foreground font-medium",
							children: admin?.email
						})] }),
						/* @__PURE__ */ jsx("button", {
							onClick: () => setIsEditing(true),
							className: "btn-primary mt-2",
							children: "Edit Profile"
						})
					]
				}) : /* @__PURE__ */ jsxs("form", {
					onSubmit: handleProfileUpdate,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-sm font-medium text-foreground mb-1",
							children: "Name"
						}), /* @__PURE__ */ jsx("input", {
							type: "text",
							value: name,
							onChange: (e) => setName(e.target.value),
							className: "w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand",
							required: true
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-sm font-medium text-foreground mb-1",
							children: "Email"
						}), /* @__PURE__ */ jsx("input", {
							type: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							className: "w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand",
							required: true
						})] }),
						/* @__PURE__ */ jsxs("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ jsx("button", {
								type: "submit",
								className: "btn-primary",
								children: "Save Changes"
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => {
									setIsEditing(false);
									setName(admin?.name || "");
									setEmail(admin?.email || "");
								},
								className: "px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors",
								children: "Cancel"
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "card-surface p-6",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-lg font-semibold text-foreground mb-4",
					children: "Change Password"
				}), /* @__PURE__ */ jsxs("form", {
					onSubmit: handlePasswordUpdate,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-sm font-medium text-foreground mb-1",
							children: "Current Password"
						}), /* @__PURE__ */ jsx("input", {
							type: "password",
							value: passwordData.current_password,
							onChange: (e) => setPasswordData({
								...passwordData,
								current_password: e.target.value
							}),
							className: "w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand",
							required: true
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-sm font-medium text-foreground mb-1",
							children: "New Password"
						}), /* @__PURE__ */ jsx("input", {
							type: "password",
							value: passwordData.new_password,
							onChange: (e) => setPasswordData({
								...passwordData,
								new_password: e.target.value
							}),
							className: "w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand",
							required: true
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-sm font-medium text-foreground mb-1",
							children: "Confirm New Password"
						}), /* @__PURE__ */ jsx("input", {
							type: "password",
							value: passwordData.new_password_confirmation,
							onChange: (e) => setPasswordData({
								...passwordData,
								new_password_confirmation: e.target.value
							}),
							className: "w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand",
							required: true
						})] }),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							className: "btn-primary",
							children: "Update Password"
						})
					]
				})]
			})
		]
	});
};
//#endregion
//#region src/routes/admin.profile.tsx?tsr-split=component
var SplitComponent = Profile;
//#endregion
export { SplitComponent as component };
