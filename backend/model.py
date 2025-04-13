from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class Organizations(Base):
    __tablename__ = "organization"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, index=True)
    phone = Column(String, index=True)
    address = Column(String, index=True)
    city = Column(String, index=True)
    province = Column(String, index=True)
    country = Column(String, index=True)
    postal_code = Column(String, index=True)


class Contacts(Base):
    __tablename__ = "contact"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    email = Column(String, index=True)
    phone = Column(String, index=True)
    address = Column(String, index=True)
    city = Column(String, index=True)
    province = Column(String, index=True)
    country = Column(String, index=True)
    postal_code = Column(String, index=True)
    organization_id = Column(Integer, ForeignKey("organization.id"))

    organization = relationship("Organizations", back_populates="contact")


Organizations.contact = relationship("Contacts", back_populates="organization")

