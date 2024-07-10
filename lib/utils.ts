export const total = (price: number, discount: number) => {
  return price - price * (discount / 100);
};

export const formatRupiah = (price: string) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  });

  return formatter.format(Number(price));
};
