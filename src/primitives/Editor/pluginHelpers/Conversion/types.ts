export interface ContainerConversionsInterface {
  model: string;
  name: string;
  classes?: string;
  useWidget?: boolean;
  attributes?: { [key: string]: string | number };
}

export interface EditableConversionsInterface {
  model: string;
  name: string;
  classes?: string;
  placeholder?: string;
}
