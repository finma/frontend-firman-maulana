"use client";

import { Select, SelectItem } from "./select";
import { useEffect, useState } from "react";
import { Textarea } from "./textarea";
import { Input } from "./input";
import { total } from "@/lib/utils";
import { fetcher } from "@/lib/fethcer";

type Country = {
  id_negara: string;
  kode_negara: string;
  nama_negara: string;
};

type Port = {
  id_pelabuhan: string;
  nama_pelabuhan: string;
  id_negara: string;
};

type Item = {
  id_barang: number;
  nama_barang: string;
  id_pelabuhan: number;
  description: string;
  diskon: number;
  harga: number;
};

export const Form = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [ports, setPorts] = useState<Port[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedPort, setSelectedPort] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [itemValue, setItemValue] = useState<Item | undefined>(undefined);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await fetcher("http://202.157.176.100:3000/negaras");
        setCountries(data);
        setItemValue(undefined);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const fetchPorts = async (id: string) => {
        try {
          const data = await fetcher(
            `http://202.157.176.100:3000/pelabuhans?filter={"where":{"id_negara":"${id}"}}`
          );
          setPorts(data);
          setItems([]);
          setItemValue(undefined);
        } catch (error) {
          console.error("Error fetching ports:", error);
        }
      };

      fetchPorts(selectedCountry);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedPort) {
      const fetchItems = async (id: string) => {
        try {
          const data = await fetcher(
            `http://202.157.176.100:3000/barangs?filter={"where":{"id_pelabuhan":"${id}"}}`
          );
          setItems(data);
          setItemValue(undefined);
        } catch (error) {
          console.error("Error fetching ports:", error);
        }
      };

      fetchItems(selectedPort);
    }
  }, [selectedPort]);

  const onCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    setSelectedPort("");
    setSelectedItem("");
    setItemValue(undefined);
  };

  const onPortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPort(e.target.value);
    setSelectedItem("");
    setItemValue(undefined);
  };

  const onItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem(e.target.value);
    setItemValue(
      items.find((item) => item.id_barang.toString() === e.target.value)
    );
  };

  return (
    <form action="" className="flex flex-col gap-4">
      <Select
        id="country"
        label="Negara"
        value={selectedCountry}
        onChange={onCountryChange}
      >
        <SelectItem value="">Pilih Negara</SelectItem>
        {countries.map(({ id_negara, kode_negara, nama_negara }: Country) => (
          <SelectItem key={id_negara} value={id_negara}>
            {kode_negara + "-" + nama_negara}
          </SelectItem>
        ))}
      </Select>

      <Select
        id="port"
        label="Pelabuhan"
        value={selectedPort}
        onChange={onPortChange}
      >
        <SelectItem value="">Pilih Pelabuhan</SelectItem>
        {ports.map(({ id_pelabuhan, nama_pelabuhan }: Port) => (
          <SelectItem key={id_pelabuhan} value={id_pelabuhan}>
            {nama_pelabuhan}
          </SelectItem>
        ))}
      </Select>

      <Select
        id="item"
        label="Barang"
        value={selectedItem}
        onChange={onItemChange}
      >
        <SelectItem value="">Pilih Barang</SelectItem>
        {items.map(({ id_barang, nama_barang }: Item) => (
          <SelectItem key={id_barang} value={id_barang.toString()}>
            {id_barang + "-" + nama_barang}
          </SelectItem>
        ))}
      </Select>

      <Textarea
        id="description"
        label="Deskripsi"
        placeholder="Deskripsi"
        value={itemValue?.description || ""}
        readOnly
      />

      <Input
        id="discount"
        label="Diskon (%)"
        type="number"
        placeholder="Diskon"
        defaultValue={itemValue?.diskon || ""}
      />

      <Input
        id="price"
        label="Harga"
        type="string"
        placeholder="Harga"
        defaultValue={itemValue?.harga! || ""}
        format="rupiah"
      />

      <Input
        id="total"
        label="Total"
        type="string"
        placeholder="Total"
        defaultValue={total(itemValue?.harga!, itemValue?.diskon!) || ""}
        format="rupiah"
      />
    </form>
  );
};
