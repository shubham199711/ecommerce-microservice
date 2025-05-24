from pydantic import BaseModel, Field, field_validator, model_validator
from typing import Optional, List

class User(BaseModel):
    name:str = Field(alias="name", description="name of the user", examples=["Shubham"], min_length=2, max_length=50)
    password: str
    confirm_password: str

    @field_validator("password")
    def check_password_to_not_be_password(cls, v):
        if v == "password":
            raise ValueError("password can't be password")
        return v
    
    @model_validator(mode="after")
    def password_should_be_same(cls, values):
        if values.password != values.confirm_password:
            raise ValueError("password and confirm password should be same")
        return values
    

user1 = User(
    name="Shubham",
    password="password1",
    confirm_password="password1"
)
print(user1)

class Comments(BaseModel):
    id: str
    context: str
    replies: Optional[list['Comments']] = None

Comments.model_rebuild()

comment = Comments(
    id="01",
    context="hello",
    replies=[
        Comments(id='02', context="hello to you")
    ]
)

print(comment)
print(comment.model_dump())
print(comment.model_dump_json())