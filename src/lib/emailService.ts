import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG, CONTACT_EMAIL } from "@/config/email";

interface ContactFormData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion?: string;
  codigoPostal?: string;
  rubro?: string;
  localidad?: string;
  provincia?: string;
  pais?: string;
}

interface QuoteFormData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  empresa?: string;
  rubro?: string;
  tipoProyecto?: string;
  objetivoPrincipal?: string;
  funcionalidades?: string;
  integraciones?: string;
  presupuesto?: string;
  fechaObjetivo?: string;
  soporte?: string;
  comentarios?: string;
  recibirPorEmail?: boolean;
}

export const sendContactEmail = async (data: ContactFormData): Promise<boolean> => {
  try {
    // Check if EmailJS is configured
    if (!EMAILJS_CONFIG.PUBLIC_KEY || EMAILJS_CONFIG.PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
      console.warn("EmailJS not fully configured. Contact form data would be sent to:", CONTACT_EMAIL);
      console.log("Data:", data);
      // Simulate success for development
      return true;
    }

    const templateParams = {
      to_email: CONTACT_EMAIL,
      from_name: `${data.nombre} ${data.apellido}`,
      from_email: data.email,
      phone: data.telefono,
      address: data.direccion || "No especificado",
      postal_code: data.codigoPostal || "No especificado",
      business: data.rubro || "No especificado",
      city: data.localidad || "No especificado",
      province: data.provincia || "No especificado",
      country: data.pais || "No especificado",
      subject: "Nueva solicitud de contacto - PampaCode",
    };

    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.CONTACT_TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    return true;
  } catch (error) {
    console.error("Error sending contact email:", error);
    throw error;
  }
};

export const sendQuoteEmail = async (data: QuoteFormData): Promise<boolean> => {
  try {
    // Check if EmailJS is configured
    if (!EMAILJS_CONFIG.PUBLIC_KEY || EMAILJS_CONFIG.PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
      console.warn("EmailJS not fully configured. Quote form data would be sent to:", CONTACT_EMAIL);
      console.log("Data:", data);
      // Simulate success for development
      return true;
    }

    const templateParams = {
      to_email: CONTACT_EMAIL,
      from_name: `${data.nombre} ${data.apellido}`,
      from_email: data.email,
      phone: data.telefono,
      company: data.empresa || "No especificado",
      business: data.rubro || "No especificado",
      project_type: data.tipoProyecto || "No especificado",
      main_goal: data.objetivoPrincipal || "No especificado",
      features: data.funcionalidades || "No especificado",
      integrations: data.integraciones || "No especificado",
      budget: data.presupuesto || "No especificado",
      deadline: data.fechaObjetivo || "No especificado",
      support: data.soporte || "No especificado",
      comments: data.comentarios || "Sin comentarios",
      email_preference: data.recibirPorEmail ? "Sí" : "No",
      subject: "Nueva solicitud de presupuesto - PampaCode",
    };

    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.QUOTE_TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    return true;
  } catch (error) {
    console.error("Error sending quote email:", error);
    throw error;
  }
};
