#!/bin/sh

#echo "\n📦 Deploying Edge Service..."
#kubectl delete service edge-service
kubectl delete deployment edge-service
kubectl apply -f edge-service

echo "\n📦 Deploying Admin Service..."
kubectl delete deployment admin-service
kubectl apply -f admin-service

echo "\n📦 Deploying Computation Service..."
kubectl delete deployment paycomputation-service
kubectl apply -f computation-service

echo "\n📦 Deploying Polar UI..."
kubectl delete  deployment payroll-ui
kubectl apply -f payroll-ui/payroll-ui.yml

kubectl apply -f redis

kubectl delete -f scheduler-ui
kubectl apply -f scheduler-ui

kubectl delete -f deploy-civo.yml
kubectl apply -f deploy-civo.yml

kubectl get ingress

sleep 10

kubectl get pods
# restart pods
# kubectl rollout restart deployment xykine-keycloak

# check content of config map
# kubectl get configmap xykine-themes -o yaml

# create configmap
#kubectl create configmap xykine-ui-themes --from-file=xykineTheme/login

#kubectl delete configmap xykine-ui-themes

# kubectl exec -it --namespace default payroll-ui-559f4dcbd6-rm8bw bash

echo "\n⛵ Successfully Deployed!\n"

# kubectl exec -it --namespace default xykine-keycloak-756c9559b7-jrdm2 bash

# kubectl create configmap xykine-themes --from-file=/Users/bealaraje/Documents/projects/xykine/XykinePayroll/edge-service/k8s/keycloak/xykine/login -n default

# /Users/bealaraje/Documents/projects/xykine/XykinePayroll/edge-service/k8s/keycloak/xykine/login
