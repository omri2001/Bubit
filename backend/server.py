import shutil
from typing import List, Union, Dict

import uvicorn
from fastapi import FastAPI, HTTPException, UploadFile, Header, Body
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import FileResponse

from backend.clients.api import Client, InvalidUsernameError
from backend.clients.clients_manager import ClientsManager
from backend.dal.os_dal import OSDal

app = FastAPI()
app.add_middleware(CORSMiddleware,
                   allow_origins=['*'],
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"],
                   )

client_manager = ClientsManager(r"backend\clients\clients.yaml")
os_dal = OSDal("db")

@app.get("/")
def is_alive():
    return "indeed"


@app.post("/files")
def get_files(username: str = Header(None)) -> Dict[str, List[str]]:
    files = os_dal.get(sub_path=username)
    return {"files": files}


@app.post("/get")
def get_file(file_name: str = Body(..., embed=True), username: str = Header(None)) -> FileResponse:
    rel_path = os_dal.base_dir / f"{username}/{file_name}"
    if os_dal.is_dir(rel_path):
        zip_file_path = f"/tmp/{file_name}"
        shutil.make_archive(zip_file_path[:-4], 'zip', rel_path)
        rel_path = zip_file_path
    return FileResponse(rel_path, media_type='application/octet-stream', filename=file_name)


@app.post("/delete/")
def delete_file(file_name: str, username: str = Header(None)):
    os_dal.delete(sub_path=f"{username}/{file_name}")


@app.post("/upload/")
async def upload_file(files: List[UploadFile], username: str = Header(None)):
    for file_obj in files:
        file_name = file_obj.filename
        file_content = file_obj.file.read()
        os_dal.create(file_name, file_content, username)


@app.post("/login/")
def try_login(client: Client) -> Union[HTTPException, bool]:
    try:
        return client_manager.is_valid(client)
    except InvalidUsernameError:
        raise HTTPException(401, "Invalid username")


if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", reload=True)
