export interface IOptionFilterItem {
  id: string;
  name: string;
}

export interface IOptionFilterProps {
  label: string;
  options: IOptionFilterItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  placeholder?: string;
  disabled?: boolean;
}
