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

  export interface Contact {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    country: string;
    postal_code: string;
    organization_id: number;
  }


  export interface Organization {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    country: string;
    postal_code: string;
  }
  
  