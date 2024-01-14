import os
import shutil
from typing import List, Union

import uvicorn
from fastapi import FastAPI, HTTPException, UploadFile, Header
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import FileResponse

from backend.clients.api import Client, InvalidUsernameError
from backend.clients.clients_manager import ClientsManager

app = FastAPI()
app.add_middleware(CORSMiddleware,
                   allow_origins=['*'],
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"],
                   )

client_manager = ClientsManager(r"backend\clients\clients.yaml")


@app.get("/")
def is_alive():
    return "indeed"


@app.post("/files")
def get_files(username: str = Header(None)):
    files = []
    if os.path.isdir(f"./db/{username}"):
        files = os.listdir(f"./db/{username}/")
    return {"files": files}


@app.post("/get/")
def get_file(file_name: str, username: str = Header(None)):
    rel_path = f"./db/{username}/{file_name}"
    if os.path.isdir(rel_path):
        zip_file_path = f"/tmp/{file_name}"
        shutil.make_archive(zip_file_path[:-4], 'zip', rel_path)
        rel_path = zip_file_path
    return FileResponse(rel_path, media_type='application/octet-stream', filename=file_name)


@app.post("/delete/{file_name}")
def delete_file(file_name: str, username: str = Header(None)):
    rel_path = f"./db/{username}/{file_name}"
    rm_func = os.remove
    if os.path.isdir(rel_path):
        rm_func = os.rmdir
    rm_func(rel_path)


@app.post("/upload/")
async def upload_file(files: List[UploadFile], username: str = Header(None)):
    for file_obj in files:
        with open(f"./db/{username}/{file_obj.filename}", "wb") as f:
            f.write(file_obj.file.read())


@app.post("/login/")
def try_login(client: Client) -> Union[HTTPException, bool]:
    try:
        return client_manager.is_valid(client)
    except InvalidUsernameError:
        raise HTTPException(401, "Invalid username")


if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", reload=True)
