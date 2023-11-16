export type Country = {
  name: string;
  code: string;
};

export type CountryTableProps = {
  data: Country[];
};

export type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};
