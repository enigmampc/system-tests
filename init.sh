#!/bin/bash
set -ex

rm -rf kubernetes/
git clone git@github.com:enigmampc/kubernetes.git
(
    cd kubernetes/cluster-sdk
    yarn install
)