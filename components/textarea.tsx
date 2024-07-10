"use client";

interface TextareaProps {
  id: string;
  value?: string;
  label?: string;
  readOnly?: boolean;
  placeholder?: string;
}

export const Textarea = ({
  id,
  value,
  label,
  readOnly,
  placeholder,
}: TextareaProps) => {
  return (
    <div>
      <label htmlFor={id} className="text-xs text-neutral-700 font-semibold">
        {label}
      </label>
      <textarea
        name={id}
        id={id}
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
};
