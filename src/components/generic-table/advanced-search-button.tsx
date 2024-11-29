import { Button } from "@/components/ui/button";
import {
  HiOutlineChevronDoubleDown,
  HiOutlineChevronDoubleUp,
} from "react-icons/hi";

export default function AdvancedSearchButton({
  setAdvancedSearchOpen,
  advancedSearchOpen,
}) {
  return (
    <>
      {!advancedSearchOpen ? (
        <Button variant="secondary" onClick={() => setAdvancedSearchOpen(true)}>
          <HiOutlineChevronDoubleDown />
        </Button>
      ) : (
        <Button
          variant="secondary"
          className="border-blue-500 border-2"
          onClick={() => setAdvancedSearchOpen(false)}
        >
          <HiOutlineChevronDoubleUp className="stroke-blue-500" />
        </Button>
      )}
    </>
  );
}
