from fastapi import FastAPI

from fast_api_structure.user import router as userRouter

app = FastAPI()
app.include_router(userRouter)


@app.get("/hello")
def say_hello() -> dict[str, str]:
    return {"msg": "Hello"}
