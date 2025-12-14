import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendQuoteEmail } from "@/lib/emailService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const quoteSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es requerido").max(100),
  apellido: z.string().trim().min(1, "El apellido es requerido").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  telefono: z.string().trim().min(1, "El teléfono es requerido").max(50),
  empresa: z.string().trim().max(200).optional(),
  rubro: z.string().optional(),
  tipoProyecto: z.string().trim().max(200).optional(),
  objetivoPrincipal: z.string().trim().max(500).optional(),
  funcionalidades: z.string().trim().max(1000).optional(),
  integraciones: z.string().trim().max(500).optional(),
  presupuesto: z.string().trim().max(200).optional(),
  fechaObjetivo: z.string().trim().max(50).optional(),
  soporte: z.string().optional(),
  comentarios: z.string().trim().max(2000).optional(),
  recibirPorEmail: z.boolean().default(false),
  aceptaTerminos: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceType?: string;
  onSuccess?: () => void;
}

const rubros = [
  "Comercio",
  "Industria",
  "Servicios",
  "Salud",
  "Educación",
  "Agrícola",
  "Tecnología",
  "Otro",
];

const soporteOptions = ["Básico", "Estándar", "Continuo"];

export function QuoteModal({ open, onOpenChange, serviceType, onSuccess }: QuoteModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      empresa: "",
      rubro: "",
      tipoProyecto: serviceType === "gestion" 
        ? "Sistema de gestión" 
        : serviceType === "medida" 
        ? "Desarrollo a medida" 
        : "",
      objetivoPrincipal: "",
      funcionalidades: "",
      integraciones: "",
      presupuesto: "",
      fechaObjetivo: "",
      soporte: "",
      comentarios: "",
      recibirPorEmail: true,
      aceptaTerminos: false,
    },
  });

  const onSubmit = async (formData: QuoteFormData) => {
    setIsSubmitting(true);
    
    try {
      await sendQuoteEmail({
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        telefono: formData.telefono,
        empresa: formData.empresa,
        rubro: formData.rubro,
        tipoProyecto: formData.tipoProyecto,
        objetivoPrincipal: formData.objetivoPrincipal,
        funcionalidades: formData.funcionalidades,
        integraciones: formData.integraciones,
        presupuesto: formData.presupuesto,
        fechaObjetivo: formData.fechaObjetivo,
        soporte: formData.soporte,
        comentarios: formData.comentarios,
        recibirPorEmail: formData.recibirPorEmail,
      });
      
      toast({
        title: "¡Solicitud enviada!",
        description: "Recibimos tu solicitud de presupuesto. Te lo enviaremos por email a la brevedad.",
      });
      
      form.reset();
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu solicitud. Intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="bg-primary -mx-6 -mt-6 px-6 py-4 rounded-t-lg">
          <DialogTitle className="font-heading text-xl text-primary-foreground">
            Solicitud de presupuesto
          </DialogTitle>
          <DialogDescription className="text-primary-foreground/80">
            Completá los datos para estimar el alcance y enviarte el presupuesto a tu email.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingresá tu nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apellido"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingresá tu apellido" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="nombre@empresa.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono de contacto</FormLabel>
                    <FormControl>
                      <Input placeholder="+54 9 358 422-2994" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="empresa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa / Cooperativa (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Razón social o nombre comercial" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rubro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rubro / Industria</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccioná tu rubro" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {rubros.map((r) => (
                          <SelectItem key={r} value={r}>
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tipoProyecto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de proyecto</FormLabel>
                    <FormControl>
                      <Input placeholder="Sistema de gestión / A medida / Análisis de datos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="objetivoPrincipal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Objetivo principal</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej.: digitalizar facturación y reportes" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="funcionalidades"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Funcionalidades clave</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Ej.: alta de clientes, gestión de stock, facturación electrónica, reportes PDF..." 
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="integraciones"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Integraciones requeridas</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Ej.: AFIP, Mercado Pago, Google Sheets, ERP actual..." 
                      className="min-h-[60px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="presupuesto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Presupuesto estimado</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <p className="text-xs text-muted-foreground mt-1">
                      Usaremos la información solo para elaborar la cotización y contactarte. 
                      Podés solicitar la baja o rectificación de tus datos cuando lo desees.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fechaObjetivo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha objetivo</FormLabel>
                    <FormControl>
                      <Input placeholder="Mes/Año (Ej.: 03/2026)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="soporte"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Soporte y posventa</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Básico / Estándar / Continuo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {soporteOptions.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="comentarios"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comentarios</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Información adicional relevante" 
                        className="min-h-[60px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="recibirPorEmail"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal text-sm">
                    Deseo recibir el presupuesto por correo electrónico.
                  </FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="aceptaTerminos"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal text-sm">
                      Acepto los términos y la política de privacidad de PampaCode.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar solicitud de presupuesto"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
