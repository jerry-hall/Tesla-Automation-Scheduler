#!/bin/bash


# Install Docker
curl -fsSL https://download.docker.com/linux/ubu...​ | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu​ $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce



# Install kubernetes 
# For more information, see: https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/
sudo apt-get update && sudo apt-get install -y apt-transport-https curl
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
cat <<EOF | sudo tee /etc/apt/sources.list.d/kubernetes.list
deb https://apt.kubernetes.io/ kubernetes-xenial main
EOF
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl



# Enable iptables
echo "net.bridge.bridge-nf-call-iptables=1" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p



# Enable Kubernetes on master node
sudo kubeadm init --pod-network-cidr=10.244.0.0/16 | tee -a kubeadm-init.log
# TODO: Delete tee above once SQS implementation done
# TODO: Implement SQS to read provisioning message
# https://docs.aws.amazon.com/cli/latest/reference/sqs/send-message.html
# https://docs.aws.amazon.com/cli/latest/reference/sqs/receive-message.html




# Set up Kubernetes configuration file for general usage on master node
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config



# Apply container networking interface on master
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml