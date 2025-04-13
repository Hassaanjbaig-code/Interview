from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal
from model import Organizations, Contacts
from sqlalchemy.orm import Session
from schema import OrganizationsBase, ContactsBase, OrganizationsCreate, ContactsCreate


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
    organization = db.query(Organizations).filter(Organizations.id == organization_id).first()
    if organization is None:
        return {"error": "Organization not found"}
    return organization

@app.get('/contacts/{contact_id}', response_model=ContactsBase)
def read_contact(contact_id: int) -> ContactsBase:
    db: Session = next(get_db())
    contact = db.query(Contacts).filter(Contacts.id == contact_id).first()
    if contact is None:
        return {"error": "Contact not found"}
    return contact

@app.post("/organizations", response_model=OrganizationsBase)
def create_organization(organization: OrganizationsCreate) -> OrganizationsBase:
    db: Session = next(get_db())
    db_organization = Organizations(**organization.dict())
    db.add(db_organization)
    db.commit()
    db.refresh(db_organization)
    return db_organization