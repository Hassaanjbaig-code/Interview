export interface inputFields {
    id: number,
    name: string,
    type: string,
    placeholder: string
    option: boolean | null
    optionPass?: {
      id: number,
      label: string,
      value: string
    }[]
  }