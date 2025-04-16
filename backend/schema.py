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


class OrganizationsList(BaseModel):
    organization: list[OrganizationsBase] | None = Field(
        default=None, title="Organization details"
    )
    totalList: int | None = Field(default=None, title="Total number of organizations")
    Pages: int | None = Field(default=None, title="Total number of pages")

class ContactsList(BaseModel):
    contact: list[ContactsBase] | None = Field(
        default=None, title="Contact details"
    )
    totalList: int | None = Field(default=None, title="Total number of contacts")
    Pages: int | None = Field(default=None, title="Total number of pages")

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


class OrganizationsUpdate(BaseModel):
    name: str | None = Field(default=None, title="Name of the organization")
    email: str | None = Field(default=None, title="Email of the organization")
    phone: str | None = Field(default=None, title="Phone of the organization")
    address: str | None = Field(default=None, title="Address of the organization")
    city: str | None = Field(default=None, title="City of the organization")
    province: str | None = Field(default=None, title="Province of the organization")
    country: str | None = Field(default=None, title="Country of the organization")
    postal_code: str | None = Field(
        default=None, title="Postal code of the organization"
    )


class ContactsUpdate(BaseModel):
    first_name: str | None = Field(default=None, title="First name of the contact")
    last_name: str | None = Field(default=None, title="Last name of the contact")
    email: str | None = Field(default=None, title="Email of the contact")
    phone: str | None = Field(default=None, title="Phone of the contact")
    address: str | None = Field(default=None, title="Address of the contact")
    city: str | None = Field(default=None, title="City of the contact")
    province: str | None = Field(default=None, title="Province of the contact")
    country: str | None = Field(default=None, title="Country of the contact")
    postal_code: str | None = Field(default=None, title="Postal code of the contact")

    organization_id: int | None = Field(
        default=None, title="Organization ID of the contact"
    )


class OrganizationDelete(BaseModel):
    message: str = Field(default="Organization deleted successfully")
    status_code: int = Field(default=200)


class ContactDelete(BaseModel):
    message: str = Field(default="Contact deleted successfully")
    status_code: int = Field(default=200)


class OrganizationNameOnly(BaseModel):
    id: int
    name: str
