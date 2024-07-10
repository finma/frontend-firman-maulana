import { formatRupiah } from "@/lib/utils";

interface InputProps {
  id: string;
  defaultValue?: number | string;
  label?: string;
  type?: string;
  readOnly?: boolean;
  placeholder?: string;
  format?: "rupiah";
}

export const Input = ({
  id,
  defaultValue,
  label,
  type = "text",
  readOnly,
  placeholder,
  format,
}: InputProps) => {
  return (
    <div>
      <label htmlFor={id} className="text-xs text-neutral-700 font-semibold">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={format ? "string" : type}
        defaultValue={
          format ? formatRupiah(defaultValue as string) : defaultValue
        }
        readOnly={readOnly}
        placeholder={placeholder}
        className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
};
