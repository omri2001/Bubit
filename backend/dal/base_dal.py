from abc import abstractmethod
from typing import List


class BaseDal:

    def __init__(self):
        pass

    @abstractmethod
    def delete(self):
        pass

    @abstractmethod
    def create(self):
        pass

    @abstractmethod
    def get(self) -> List[str]:
        pass
