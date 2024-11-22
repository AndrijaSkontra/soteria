"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { addSubjectAction } from "@/lib/serverActions/subject-actions";

const initialFormState = {
  message: "",
  errors: {},
};

export default function AddSubjectDialog() {
  const [state, formAction] = useActionState(
    addSubjectAction,
    initialFormState,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">+ Subjekt</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodaj subjekta</DialogTitle>
          <DialogDescription>
            Obavezna polja su označena sa zvijezdicom.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4 mt-4" action={formAction}>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="name">Ime*</Label>
            <Input id="name" name="name" placeholder="Mateo" />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="surname">Prezime*</Label>
            <Input id="surname" name="surname" placeholder="Horvat" />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="address">Adresa</Label>
            <Input
              id="address"
              name="address"
              placeholder="Ulica Bana Jelačića 10, Zagreb"
            />
          </div>
          <div className="space-y-4 mt-2">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="contactNumber">Kontakt broj</Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                placeholder="091 234 5678"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label htmlFor="oib">OIB</Label>
              <Input id="oib" name="oib" placeholder="1234567890" />
            </div>
            <div className="flex flex-col space-y-1">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                placeholder="mateo.horvat@primjer.hr"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button type="submit">Dodaj</Button>
            <DialogClose asChild>
              <Button variant="outline">Odustani</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
