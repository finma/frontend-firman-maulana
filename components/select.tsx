"use client";

interface SelectProps {
  id: string;
  children: React.ReactNode;
  value?: string;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

export const Select = ({
  id,
  children,
  value,
  label,
  onChange,
}: SelectProps) => {
  return (
    <div className="">
      <label htmlFor={id} className="text-xs text-neutral-700 font-semibold">
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {children}
      </select>
    </div>
  );
};

export const SelectItem = ({ value, children }: SelectItemProps) => {
  return (
    <option value={value} className="py-5 ">
      {children}
    </option>
  );
};
