import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal
from model import Organizations, Contacts
from sqlalchemy.orm import Session
from schema import (
    ContactsList,
    OrganizationsBase,
    ContactsBase,
    OrganizationsCreate,
    ContactsCreate,
    OrganizationsList,
    OrganizationsUpdate,
    ContactsUpdate,
    OrganizationDelete,
    ContactDelete,
    OrganizationNameOnly,
)

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins= [os.getenv('FRONTEND_URL')],  # Or "*" for all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
def read_organizations(db: Session = Depends(get_db)) -> list[OrganizationsBase]:
    organizations = db.query(Organizations).all()
    return organizations


@app.get("/organizations/", response_model=OrganizationsList)
def read_organizations_with_limit(
    skip: int = 0, limit: int = 10, db: Session = Depends(get_db)
) -> OrganizationsList:
    # Get organizations from database
    organizations = db.query(Organizations).offset(skip).limit(limit).all()
    totalList = db.query(Organizations).count()
    Pages = totalList // limit + (totalList % limit > 0)

    if not organizations:
        raise HTTPException(status_code=404, detail="No organizations found")

    # Convert SQLAlchemy models to Pydantic models
    organizations_list = [OrganizationsBase.from_orm(org) for org in organizations]

    # Return proper dictionary structure
    return {"organization": organizations_list, "totalList": totalList, "Pages": Pages}


@app.get("/contacts/", response_model=ContactsList)
def read_contacts_with_limit(
    skip: int = 0, limit: int = 10, db: Session = Depends(get_db)
) -> ContactsList:
    contacts = db.query(Contacts).offset(skip).limit(limit).all()
    totalList = db.query(Contacts).count()
    Pages = totalList // limit + (totalList % limit > 0)

    if not contacts:
        raise HTTPException(status_code=404, detail="No contacts found")
    
    contact_list_convert = [ContactsBase.from_orm(contact) for contact in contacts]
    return {"contact": contact_list_convert, "totalList": totalList, "Pages": Pages}

@app.get("/contacts", response_model=list[ContactsBase])
def read_contacts(db: Session = Depends(get_db)) -> list[ContactsBase]:
    contacts = db.query(Contacts).all()
    return contacts


@app.get("/organizations/{organization_id}", response_model=OrganizationsBase)
def read_organization(
    organization_id: int, db: Session = Depends(get_db)
) -> OrganizationsBase:
    organization = (
        db.query(Organizations).filter(Organizations.id == organization_id).first()
    )
    if organization is None:
        raise HTTPException(status_code=404, detail="Organization not found")
    return organization


@app.get("/contacts/{contact_id}", response_model=ContactsBase)
def read_contact(contact_id: int, db: Session = Depends(get_db)) -> ContactsBase:
    contact = db.query(Contacts).filter(Contacts.id == contact_id).first()
    if contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact


@app.post("/organizations", response_model=OrganizationsBase)
def create_organization(
    organization: OrganizationsCreate, db: Session = Depends(get_db)
) -> OrganizationsBase:
    db_organization = Organizations(**organization.dict())
    db.add(db_organization)
    db.commit()
    db.refresh(db_organization)
    return db_organization


@app.post("/contacts", response_model=ContactsBase)
def create_contact(
    contact: ContactsCreate, db: Session = Depends(get_db)
) -> ContactsBase:
    db_contact = Contacts(**contact.dict())
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact


@app.put("/organizations/{organization_id}", response_model=OrganizationsBase)
def update_organization(
    organization_id: int,
    organization: OrganizationsUpdate,
    db: Session = Depends(get_db),
) -> OrganizationsBase:
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
def update_contact(
    contact_id: int, contact: ContactsUpdate, db: Session = Depends(get_db)
) -> ContactsBase:
    db_contact = db.query(Contacts).filter(Contacts.id == contact_id).first()
    if db_contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    for key, value in contact.dict(exclude_unset=True).items():
        setattr(db_contact, key, value)
    db.commit()
    db.refresh(db_contact)
    return db_contact


@app.delete("/organizations/{organization_id}", response_model=OrganizationDelete)
def delete_organization(
    organization_id: int, db: Session = Depends(get_db)
) -> OrganizationDelete:
    db_organization = (
        db.query(Organizations).filter(Organizations.id == organization_id).first()
    )
    if db_organization is None:
        raise HTTPException(status_code=404, detail="Organization not found")

    db_contacts = (
        db.query(Contacts).filter(Contacts.organization_id == organization_id).all()
    )
    for contact in db_contacts:
        db.delete(contact)

    db.delete(db_organization)
    db.commit()

    return {
        "message": "Organization deleted successfully {id: "
        + str(organization_id)
        + "}",
        "status_code": 200,
    }


@app.delete("/contact/{contact_id}", response_model=ContactDelete)
def delete_contact(contact_id: int, db: Session = Depends(get_db)) -> ContactDelete:
    db_contact = db.query(Contacts).filter(Contacts.id == contact_id).first()
    if db_contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")

    db.delete(db_contact)
    db.commit()

    return {
        "message": "Contact deleted successfully {id: " + str(contact_id) + "}",
        "status_code": 200,
    }


@app.get("/organization/names", response_model=list[OrganizationNameOnly])
def read_all_organization_names(
    db: Session = Depends(get_db),
) -> list[OrganizationNameOnly]:
    organizations = db.query(Organizations).all()
    if not organizations:
        raise HTTPException(status_code=404, detail="No organizations found")
    return [{"id": org.id, "name": org.name} for org in organizations]
