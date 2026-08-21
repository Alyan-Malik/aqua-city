import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { FiCheckCircle, FiClock, FiMapPin, FiPhone, FiSend, FiUser } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
//#region src/components/ContactForm.tsx
function ContactForm() {
	const [sent, setSent] = useState(false);
	const onSubmit = (e) => {
		e.preventDefault();
		setSent(true);
		e.currentTarget.reset();
		setTimeout(() => setSent(false), 5e3);
	};
	const inputCls = "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10";
	return /* @__PURE__ */ jsxs("form", {
		onSubmit,
		className: "card-surface p-6 sm:p-8 space-y-5",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-5 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ jsxs("label", {
						className: "block",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Full Name"
						}), /* @__PURE__ */ jsx("input", {
							required: true,
							type: "text",
							name: "name",
							className: `${inputCls} mt-2`,
							placeholder: "Jane Doe"
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Email"
						}), /* @__PURE__ */ jsx("input", {
							required: true,
							type: "email",
							name: "email",
							className: `${inputCls} mt-2`,
							placeholder: "you@company.com"
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Phone"
						}), /* @__PURE__ */ jsx("input", {
							type: "tel",
							name: "phone",
							className: `${inputCls} mt-2`,
							placeholder: "+1 555 123 4567"
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Subject"
						}), /* @__PURE__ */ jsx("input", {
							required: true,
							type: "text",
							name: "subject",
							className: `${inputCls} mt-2`,
							placeholder: "How can we help?"
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "block",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
					children: "Message"
				}), /* @__PURE__ */ jsx("textarea", {
					required: true,
					name: "message",
					rows: 5,
					className: `${inputCls} mt-2 resize-none`,
					placeholder: "Tell us about your requirements..."
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-xs text-muted-foreground",
					children: "We typically respond within one business day."
				}), /* @__PURE__ */ jsxs("button", {
					type: "submit",
					className: "btn-primary",
					children: [/* @__PURE__ */ jsx(FiSend, { className: "h-4 w-4" }), "Send Message"]
				})]
			}),
			/* @__PURE__ */ jsx(AnimatePresence, { children: sent && /* @__PURE__ */ jsxs(motion.div, {
				initial: {
					opacity: 0,
					y: 8
				},
				animate: {
					opacity: 1,
					y: 0
				},
				exit: {
					opacity: 0,
					y: 8
				},
				className: "flex items-center gap-3 rounded-xl bg-brand-soft px-4 py-3 text-sm text-brand",
				children: [/* @__PURE__ */ jsx(FiCheckCircle, { className: "h-5 w-5" }), "Thanks! Your message has been received. Our team will contact you shortly."]
			}) })
		]
	});
}
//#endregion
//#region src/routes/contact.tsx?tsr-split=component
var INFO = [
	{
		icon: FiMapPin,
		title: "Visit Us",
		lines: [
			"Aquacity Water Filters",
			"K-25 Main Murree Road",
			"Rawalpindi, Pakistan"
		]
	},
	{
		icon: FiUser,
		title: "Contact Persons",
		lines: [
			"Iftikhar Ahmad",
			"Fayaz Ahmad",
			"Faizan Ahmad"
		]
	},
	{
		icon: FiPhone,
		title: "Call Us",
		lines: [
			"0300-5254953",
			"0334-0507507",
			"0321-5070017",
			"0321-5326002",
			"0334-0503503"
		]
	},
	{
		icon: FiClock,
		title: "Working Hours",
		lines: ["Mon – Sat: 8:00 – 20:00", "Sun: Closed"]
	}
];
function Contact() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("section", {
			className: "grad-brand text-white -mt-10 pt-20",
			children: /* @__PURE__ */ jsx("div", {
				className: "container-x py-20",
				children: /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { duration: .5 },
					className: "max-w-3xl",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "inline-flex rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]",
							children: "Contact"
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-balance",
							children: "Let's talk about your water."
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-5 text-lg text-white/85 max-w-2xl",
							children: "Tell us about your space and requirements — we'll design the right system, source it, install it and support it."
						})
					]
				})
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-16",
			children: /* @__PURE__ */ jsx("div", {
				className: "container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
				children: INFO.map((i, idx) => /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: true,
						margin: "-60px"
					},
					transition: {
						duration: .4,
						delay: idx * .06
					},
					className: "card-surface card-lift p-6",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand",
							children: /* @__PURE__ */ jsx(i.icon, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground",
							children: i.title
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-2 space-y-0.5 text-[15px] leading-relaxed",
							children: i.lines.map((l) => /* @__PURE__ */ jsx("div", { children: l }, l))
						})
					]
				}, i.title))
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "pb-24",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-x grid gap-8 lg:grid-cols-[1.1fr_1fr]",
				children: [/* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						x: -20
					},
					whileInView: {
						opacity: 1,
						x: 0
					},
					viewport: {
						once: true,
						margin: "-80px"
					},
					transition: { duration: .5 },
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "eyebrow",
							children: "Send a message"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "mt-4 text-3xl sm:text-4xl font-bold",
							children: "Request a free consultation"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-3 text-muted-foreground",
							children: "Fill out the form and our team will get back to you within one business day."
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-8",
							children: /* @__PURE__ */ jsx(ContactForm, {})
						})
					]
				}), /* @__PURE__ */ jsx(motion.div, {
					initial: {
						opacity: 0,
						x: 20
					},
					whileInView: {
						opacity: 1,
						x: 0
					},
					viewport: {
						once: true,
						margin: "-80px"
					},
					transition: { duration: .5 },
					className: "card-surface overflow-hidden rounded-2xl border border-border min-h-[400px] lg:min-h-full",
					children: /* @__PURE__ */ jsx("iframe", {
						title: "Aquacity Water Filters Rawalpindi Location",
						src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13284.739722307137!2d73.064506!3d33.613636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df948791244301%3A0xa19c43b9055eb699!2sMurree%20Rd%2C%20Rawalpindi%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s",
						className: "h-full w-full min-h-[400px] border-0",
						allowFullScreen: true,
						loading: "lazy",
						referrerPolicy: "no-referrer-when-downgrade"
					})
				})]
			})
		})
	] });
}
//#endregion
export { Contact as component };
