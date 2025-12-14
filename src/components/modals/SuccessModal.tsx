import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface SuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SuccessModal({ open, onOpenChange }: SuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md text-center">
        <DialogHeader className="items-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="font-heading text-xl text-foreground">
            Gracias por contactarte con nosotros
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Recibimos tu consulta. Te enviamos una respuesta a la brevedad al correo indicado.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Button onClick={() => onOpenChange(false)} className="w-full">
            Aceptar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
