import Link from "next/link";

interface HeaderProps {
  title: string;
  label: string;
}

export const Header = ({ title, label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-2 items-center justify-center">
      <div className="bg-primary -skew-x-12 px-7">
        <Link href="/">
          <h1 className="text-3xl text-white font-semibold font-mono">
            {title}
          </h1>
        </Link>
      </div>

      <p className="text-muted-foreground text-xs">{label}</p>
    </div>
  );
};
