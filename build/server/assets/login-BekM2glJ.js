import { t as useAuth } from "./useAuth-Bcoy-596.js";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
//#region src/components/Login.tsx
var Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { login } = useAuth();
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await login({
				email,
				password
			});
			console.log("Login response:", response);
			if (response?.data?.status) {
				toast.success("Login successful!");
				navigate({ to: "/admin/dashboard" });
			} else {
				toast.error(response?.data?.message || "Login failed");
				setIsLoading(false);
			}
		} catch (error) {
			console.error("Login error:", error);
			const errorMessage = error?.response?.data?.message || error?.message || "Login failed. Please try again.";
			toast.error(errorMessage);
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ jsx("div", {
		className: "min-h-screen flex items-center justify-center bg-background",
		children: /* @__PURE__ */ jsxs("div", {
			className: "card-surface w-full max-w-md p-8",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "text-center mb-8",
				children: [
					/* @__PURE__ */ jsx("img", {
						src: "/images/logo2.png",
						alt: "Aqua City",
						className: "h-16 w-auto mx-auto mb-4"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "text-2xl font-bold text-brand",
						children: "Admin Login"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-muted-foreground mt-2",
						children: "Sign in to manage your store"
					})
				]
			}), /* @__PURE__ */ jsxs("form", {
				onSubmit: handleSubmit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
						className: "block text-sm font-medium text-foreground mb-1",
						children: "Email Address"
					}), /* @__PURE__ */ jsx("input", {
						type: "email",
						value: email,
						onChange: (e) => setEmail(e.target.value),
						className: "w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand",
						placeholder: "admin@aquacity.com",
						required: true,
						disabled: isLoading
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
						className: "block text-sm font-medium text-foreground mb-1",
						children: "Password"
					}), /* @__PURE__ */ jsx("input", {
						type: "password",
						value: password,
						onChange: (e) => setPassword(e.target.value),
						className: "w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand",
						placeholder: "••••••••",
						required: true,
						disabled: isLoading
					})] }),
					/* @__PURE__ */ jsx("button", {
						type: "submit",
						disabled: isLoading,
						className: "btn-primary w-full justify-center",
						children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("svg", {
							className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
							xmlns: "http://www.w3.org/2000/svg",
							fill: "none",
							viewBox: "0 0 24 24",
							children: [/* @__PURE__ */ jsx("circle", {
								className: "opacity-25",
								cx: "12",
								cy: "12",
								r: "10",
								stroke: "currentColor",
								strokeWidth: "4"
							}), /* @__PURE__ */ jsx("path", {
								className: "opacity-75",
								fill: "currentColor",
								d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							})]
						}), "Logging in..."] }) : "Sign In"
					})
				]
			})]
		})
	});
};
//#endregion
//#region src/routes/login.tsx?tsr-split=component
var SplitComponent = Login;
//#endregion
export { SplitComponent as component };
