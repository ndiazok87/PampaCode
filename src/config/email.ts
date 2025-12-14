// EmailJS Configuration
// To enable email functionality:
// 1. Create a free account at https://www.emailjs.com/
// 2. Add an Email Service (Gmail works great)
// 3. Create an Email Template
// 4. Get your Public Key from Account > API Keys

export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
  CONTACT_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || "",
  QUOTE_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_QUOTE_TEMPLATE_ID || "",
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "",
};

// Email to receive contact forms
export const CONTACT_EMAIL = import.meta.env.VITE_EMAIL_TO || "cnicolasdiaz@gmail.com";
