"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { useIsMobile } from "@/hooks/use-mobile";

export default function ResponsiveDialog({
  children,
  setIsOpenAction,
  isOpen,
  title,
  description,
}: {
  children: React.ReactNode;
  setIsOpenAction: (boolean) => void;
  isOpen: boolean;
  title: string;
  description?: string;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer onOpenChange={setIsOpenAction} open={isOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>

          <DrawerFooter>{children}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog onOpenChange={setIsOpenAction} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
