from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal
from model import Organizations, Contacts
from sqlalchemy.orm import Session
from schema import (
    OrganizationsBase,
    ContactsBase,
    OrganizationsCreate,
    ContactsCreate,
    OrganizationsUpdate,
    ContactsUpdate,
    OrganizationDelete,
    ContactDelete,
)


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/organizations", response_model=list[OrganizationsBase])
def read_organizations() -> list[OrganizationsBase]:
    db: Session = next(get_db())
    organizations = db.query(Organizations).all()
    return organizations


@app.get("/contacts", response_model=list[ContactsBase])
def read_contacts() -> list[ContactsBase]:
    db: Session = next(get_db())
    contacts = db.query(Contacts).all()
    return contacts


# @app.get("/contacts")
# def read_contacts(db: Session = next(get_db())):
#     contacts = db.query(Contacts).all()
#     return contacts


@app.get("/organizations/{organization_id}", response_model=OrganizationsBase)
def read_organization(organization_id: int) -> OrganizationsBase:
    db: Session = next(get_db())
    organization = (
        db.query(Organizations).filter(Organizations.id == organization_id).first()
    )
    print(organization)
    if organization is None:
        raise HTTPException(status_code=404, detail="Organization not found")
    return organization


@app.get("/contacts/{contact_id}", response_model=ContactsBase)
def read_contact(contact_id: int) -> ContactsBase:
    db: Session = next(get_db())
    contact = db.query(Contacts).filter(Contacts.id == contact_id).first()
    if contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact


@app.post("/organizations", response_model=OrganizationsBase)
def create_organization(organization: OrganizationsCreate) -> OrganizationsBase:
    db: Session = next(get_db())
    db_organization = Organizations(**organization.dict())
    db.add(db_organization)
    db.commit()
    db.refresh(db_organization)
    return db_organization


@app.post("/contacts", response_model=ContactsBase)
def create_contact(contact: ContactsCreate) -> ContactsBase:
    db: Session = next(get_db())
    db_contact = Contacts(**contact.dict())
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact


@app.put("/organizations/{organization_id}", response_model=OrganizationsBase)
def update_organization(
    organization_id: int, organization: OrganizationsUpdate
) -> OrganizationsBase:
    db: Session = next(get_db())
    db_organization = (
        db.query(Organizations).filter(Organizations.id == organization_id).first()
    )
    if db_organization is None:
        raise HTTPException(status_code=404, detail="Organization not found")
    for key, value in organization.dict(exclude_unset=True).items():
        setattr(db_organization, key, value)
    db.commit()
    db.refresh(db_organization)
    return db_organization


@app.put("/contacts/{contact_id}", response_model=ContactsBase)
def update_contact(contact_id: int, contact: ContactsUpdate) -> ContactsBase:
    db: Session = next(get_db())
    db_contact = db.query(Contacts).filter(Contacts.id == contact_id).first()
    if db_contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    for key, value in contact.dict(exclude_unset=True).items():
        setattr(db_contact, key, value)
    db.commit()
    db.refresh(db_contact)
    return db_contact


@app.delete("/organizations/{organization_id}", response_model=OrganizationDelete)
def delete_organization(organization_id: int) -> OrganizationDelete:
    db: Session = next(get_db())

    # Find the organization
    db_organization = (
        db.query(Organizations).filter(Organizations.id == organization_id).first()
    )
    if db_organization is None:
        raise HTTPException(status_code=404, detail="Organization not found")

    # Find and delete all related contacts
    db_contacts = (
        db.query(Contacts).filter(Contacts.organization_id == organization_id).all()
    )
    for contact in db_contacts:
        db.delete(contact)

    # Delete the organization
    db.delete(db_organization)
    db.commit()

    return {"id": organization_id}
