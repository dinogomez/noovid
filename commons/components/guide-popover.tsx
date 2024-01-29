import { Button } from "@/commons/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/commons/components/ui/popover";
import { InfoCircledIcon } from "@radix-ui/react-icons";
interface GuidePopoverProps {
  buttonLabel: string;
  children: React.ReactNode;
}
export default function GuidePopover({
  children,
  buttonLabel,
}: GuidePopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto  h-8 lg:flex">
          <InfoCircledIcon className="mr-2 h-4 w-4" /> {buttonLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">{children}</PopoverContent>
    </Popover>
  );
}
