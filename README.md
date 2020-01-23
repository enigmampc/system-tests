System tests for the Enigma protocl.

[![Build Status](https://github.com/enigmampc/system-tests/workflows/System%20Tests/badge.svg)](https://github.com/enigmampc/system-tests/actions)

```bash
# Install docker
sudo apt install -y docker.io

# Make it non-root: https://docs.docker.com/install/linux/linux-postinstall/
sudo groupadd docker
sudo usermod -aG docker $USER
# logout & log back in
newgrp docker
```

```bash
git clone https://github.com/enigmampc/system-tests.git
cd system-tests
yarn install
yarn test
```
