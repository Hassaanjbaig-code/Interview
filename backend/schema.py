from pydantic import BaseModel, Field

class OrganizationsBase(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    address: str
    city: str
    province: str
    country: str
    postal_code: str

    class Config:
        from_attributes = True

class ContactsBase(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    phone: str
    address: str
    city: str
    province: str
    country: str
    postal_code: str
    organization_id: int

    class Config:
        from_attributes = True

class OrganizationsCreate(BaseModel):
    name: str
    email: str
    phone: str
    address: str
    city: str
    province: str
    country: str
    postal_code: str


class ContactsCreate(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str
    address: str
    city: str
    province: str
    country: str
    postal_code: str
    organization_id: int

