import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuItem } from "../ui/sidebar";
import Image from "next/image";
import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();

  function handleClick(nextLocale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center w-full hover:cursor-pointer">
              <div className="flex space-x-2">
                <Image
                  src="/croatia.png"
                  alt="no"
                  width={20}
                  height={20}
                  className="object-scale-down"
                />
                <p className="font-medium text-sm">Hrvatski</p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side={"right"}>
            <DropdownMenuItem onClick={() => handleClick("hr")}>
              <div className="flex space-x-2">
                <Image
                  src="/croatia.png"
                  alt="no"
                  width={20}
                  height={20}
                  className="object-scale-down"
                />
                <p>Hrvatski</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleClick("en")}>
              <div className="flex space-x-2">
                <Image
                  src="/united-kingdom.png"
                  alt="no"
                  width={20}
                  height={20}
                  className="object-scale-down"
                />
                <p>English</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
