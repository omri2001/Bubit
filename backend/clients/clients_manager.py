from pathlib import Path
from typing import List, Union

import yaml

from backend.clients.api import InvalidUsernameError, Client


class ClientsManager:

    def __init__(self, config_path: str):
        self.clients = self._setup_clients_from_config(config_path)

    def is_valid(self, input_client: Client) -> Union[str, bool]:
        client = list(filter(lambda client: client.username == input_client.username, self.clients))
        if not client:
            raise InvalidUsernameError(input_client.username)
        return client[0].password == input_client.password

    @staticmethod
    def _setup_clients_from_config(path: str) -> List[Client]:
        clients_data = yaml.safe_load(Path(path).read_text())
        clients = [Client(**client) for client in
                   clients_data['clients']]
        return clients
