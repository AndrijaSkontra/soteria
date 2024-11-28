"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect, useState } from "react";
import { addSubjectAction } from "@/lib/serverActions/subject-actions";
import { useToast } from "@/hooks/use-toast";
import { CountrySelect } from "../ui/select-country";
import { SubmitButton } from "../ui/submit-button-with-spinner";
import CloseButtonDialog from "../ui/close-button-dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";

const initialFormState: any = {
  status: "PENDING",
  errors: {},
};

/**
 * Form to add a new subject.
 * @see https://react.dev/reference/react/useActionState#
 * @author Andrija Skontra
 */
export default function AddSubjectForm({ dialogOpen }) {
  const [countryValue, setCountryValue] = useState("");
  const { toast } = useToast();
  const [state, formAction] = useActionState(
    addSubjectAction,
    initialFormState,
  );

  useEffect(() => {
    if (state.status === "ADDED") {
      toast({
        title: "Success",
        description: `Added: ${state.subjectName}`,
        duration: 2000,
      });
      state.status = "PENDING";
      dialogOpen(false);
    }
  }, [state]);

  return (
    <form className="space-y-4 mt-4 p-2" action={formAction}>
      <div className="flex flex-col space-y-1">
        <Label htmlFor="name" className="mb-1">
          Naziv*
        </Label>
        <Input id="name" name="name" placeholder="Org d.o.o." />
        {state.errors?.name?._errors.map((error, index) => {
          return (
            <p key={index} className="text-red-500 text-xs">
              {error}
            </p>
          );
        })}
      </div>
      <div className="flex flex-col space-y-1">
        <Label htmlFor="address" className="mb-1">
          Adresa
        </Label>
        <Input
          id="address"
          name="address"
          placeholder="Ulica Bana Jelačića 10, Zagreb"
        />
        {state.errors?.address?._errors.map((error, index) => {
          return (
            <p key={index} className="text-red-500 text-xs">
              {error}
            </p>
          );
        })}
      </div>
      <div className="flex flex-col space-y-1">
        <Label htmlFor="country" className="mb-1">
          Država
        </Label>
        <CountrySelect setDialogValue={setCountryValue} />
        <Input
          id="country"
          name="country"
          placeholder="Croatia"
          value={countryValue}
          readOnly={true}
          className="hidden"
        />
        {state.errors?.country?._errors.map((error, index) => {
          return (
            <p key={index} className="text-red-500 text-xs">
              {error}
            </p>
          );
        })}
      </div>
      <div className="space-y-4 mt-2">
        <div className="flex flex-col space-y-1">
          <Label htmlFor="contactNumber" className="mb-1">
            Kontakt broj
          </Label>
          <Input
            id="contactNumber"
            name="contactNumber"
            placeholder="091 234 5678"
          />
          {state.errors?.contactNumber?._errors.map((error, index) => {
            return (
              <p key={index} className="text-red-500 text-xs">
                {error}
              </p>
            );
          })}
        </div>
        <div className="flex flex-col space-y-1">
          <Label htmlFor="oib" className="mb-1">
            OIB
          </Label>
          <Input id="oib" name="oib" placeholder="1234567890" />
          {state.errors?.oib?._errors.map((error, index) => {
            return (
              <p key={index} className="text-red-500 text-xs">
                {error}
              </p>
            );
          })}
        </div>
        <div className="flex flex-col space-y-1">
          <Label htmlFor="email" className="mb-1">
            E-mail
          </Label>
          <Input
            id="email"
            name="email"
            placeholder="mateo.horvat@primjer.hr"
          />
          {state.errors?.email?._errors.map((error, index) => {
            return (
              <p key={index} className="text-red-500 text-xs">
                {error}
              </p>
            );
          })}
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-6">
        <SubmitButton innerText="Dodaj" />
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
      </div>
    </form>
  );
}
