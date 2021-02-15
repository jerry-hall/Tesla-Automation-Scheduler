#!/bin/bash



# Install Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce
# Allow Docker to run without sudo
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker


# Install kubectl 
# For more information, see: https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/
sudo apt-get update && sudo apt-get install -y apt-transport-https curl
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
cat <<EOF | sudo tee /etc/apt/sources.list.d/kubernetes.list
deb https://apt.kubernetes.io/ kubernetes-xenial main
EOF
sudo apt-get update
sudo apt-get install -y kubectl



# Install minikube
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube_latest_amd64.deb
sudo dpkg -i minikube_latest_amd64.deb



# Start minikube
minikube start



# Deploy single node kubernetes cluster
sleep 30
cd /
git clone https://github.com/jerry-hall/tesla-automation-scheduler
cd /tesla-automation-scheduler; git pull
kubectl apply -f /tesla-automation-scheduler/kubernetes