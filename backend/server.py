import shutil
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import FileResponse


import uvicorn
import os

app = FastAPI()
app.add_middleware(CORSMiddleware,
                   allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ding")
def hello_world():
    return "dong"

@app.get("/files")
def get_files():
    return {"files": os.listdir("./db/")}

@app.post("/get/{file_name}")
def get_file(file_name: str):
    rel_path = f"./db/{file_name}"
    if os.path.isdir(rel_path):
        zip_file_path = f"/tmp/{file_name}"
        shutil.make_archive(zip_file_path[:-4], 'zip', rel_path)
        rel_path = zip_file_path
    return FileResponse(rel_path, media_type='application/octet-stream',filename=file_name)

@app.post("/delete/{file_name}")
def delete_file(file_name: str):
    rel_path = f"./db/{file_name}"
    rm_func = os.remove
    if os.path.isdir(rel_path):
        rm_func = os.rmdir
    rm_func(rel_path)


if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", reload=True)
