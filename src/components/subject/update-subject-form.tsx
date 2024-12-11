"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useState } from "react";
import { updateSubjectAction } from "@/lib/serverActions/subject-actions";
import { useToast } from "@/hooks/use-toast";
import { CountrySelect } from "@/components/ui/select-country";
import { SubmitButton } from "../ui/submit-button-with-spinner";
import { Subject } from "@prisma/client";
import { useParams } from "next/navigation";

const initialFormState: any = {
  status: "PENDING",
  errors: {},
};

export default function UpdateSubjectForm({
  setIsOpenAction,
  subject,
}: {
  setIsOpenAction: (boolean) => void;
  subject: Subject | any;
}) {
  const params = useParams();
  const [countryValue, setCountryValue] = useState("");
  const { toast } = useToast();
  const [state, formAction] = useActionState(async (prevState, formData) => {
    const newState = await updateSubjectAction(prevState, formData);

    if (newState.status === "ERROR") {
      toast({
        variant: "destructive",
        title: "You don't have permissions to edit this subject!",
        duration: 2000,
      });
      newState.status = "PENDING";
    }
    if (newState.status === "UPDATED") {
      toast({
        title: "UPDATED",
        description: (
          <p>
            Subject <strong>{subject.name}</strong> updated
          </p>
        ),
        duration: 2000,
      });
      newState.status = "PENDING";
    }

    return newState;
  }, initialFormState);

  return (
    <form
      className="space-y-4 mt-4"
      action={formAction}
      onSubmit={() => console.log(state.status, " status of update")}
    >
      <div className="flex flex-col space-y-1">
        <Label htmlFor="name" className="mb-1">
          Naziv
        </Label>
        <Input id="name" name="name" defaultValue={subject.name} placeholder="Org d.o.o." />
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
          defaultValue={subject.address || ""}
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
        <CountrySelect setDialogValue={setCountryValue} defaultCountry={subject.country || ""} />
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
            defaultValue={subject.contact || ""}
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
          <Input id="oib" name="oib" placeholder="1234567890" defaultValue={subject.oib || ""} />
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
            defaultValue={subject.email || ""}
          />
          {state.errors?.email?._errors.map((error, index) => {
            return (
              <p key={index} className="text-red-500 text-xs">
                {error}
              </p>
            );
          })}
        </div>
        <Input
          id="organisationId"
          name="organisationId"
          value={params.organisationId}
          readOnly={true}
          className="hidden"
        />
        <Input
          id="subjectId"
          name="subjectId"
          value={subject.id}
          readOnly={true}
          className="hidden"
        />
      </div>
      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="outline" onClick={() => setIsOpenAction(false)}>
          Zatvori
        </Button>
        <SubmitButton innerText="Uredi" />
      </div>
    </form>
  );
}
