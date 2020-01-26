System tests for the Enigma protocol.

[![Build Status](https://github.com/enigmampc/system-tests/workflows/System%20Tests/badge.svg)](https://github.com/enigmampc/system-tests/actions)

```bash
# Install docker & docker-compose
sudo apt install -y docker.io docker-compose

# Make docker non-root: https://docs.docker.com/install/linux/linux-postinstall/
sudo groupadd docker
sudo usermod -aG docker $USER
# logout & log back in
newgrp docker
```

Then from inside this repo:

```bash
yarn install
yarn test
```
