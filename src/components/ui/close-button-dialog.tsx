export default function CloseButtonDialog({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      className={`border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 px-4 py-2 ${className}`}
    >
      {text}
    </div>
  );
}
