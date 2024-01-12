from dataclasses import dataclass


@dataclass
class Client:
    username: str
    password: str


class InvalidUsernameError(Exception):
    def __init__(self, username: str, message: str = "Invalid username") -> None:
        self.username = username
        self.message = f"{message}: {self.username}"
        super().__init__(self.message)
