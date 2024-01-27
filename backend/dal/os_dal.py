import os
from pathlib import Path
from typing import Optional, NoReturn, List, Union

from backend.dal.base_dal import BaseDal


class OSDal(BaseDal):

    def __init__(self, base_dir: str):
        self.base_dir = Path(base_dir)
        super().__init__()

    def get(self, sub_path: Optional[str] = None) -> List[str]:
        path = self._get_full_path(sub_path)
        if self.is_dir(path):
            return os.listdir(path)
        return []

    def delete(self, sub_path: Optional[str] = None) -> NoReturn:
        path = self._get_full_path(sub_path)

        if self.is_dir(path):
            os.rmdir(path)
            return
        os.remove(path)

    def create(self, file_name: str, content: bytes, sub_path: Optional[str] = None) -> NoReturn:
        path = self._get_full_path(sub_path) / file_name
        with open(path, "wb") as f:
            f.write(content)

    def _get_full_path(self, sub_path: Optional[str] = None) -> Path:
        path = self.base_dir
        if sub_path:
            path = path / sub_path
        return path

    @staticmethod
    def is_dir(path: Union[Path, str]) -> bool:
        return os.path.isdir(path)
