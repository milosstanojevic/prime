export interface SelectOption {
  id: number | string,
  name: string,
  avatar?: string,
}

export enum SelectMode {
  single = 'single',
  multiple = 'multiple',
}
