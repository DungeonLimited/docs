#!/usr/bin/env bash
set -u
set -e

path=$(pwd)
path_deploy="${path}-deploy-tmp"

if [ -d "${path_deploy}" ]
then
    rm -rf "${path_deploy}"
fi

mkdir ${path_deploy}
rsync -qaP --delete ${path}/.git ${path_deploy}
cd ${path_deploy}
git checkout deploy
git reset --hard d865acb8ae4640cf8b6a618f577f67fb938a5c65
rsync -qaP --delete --exclude ".git" ${path}/dist/ ${path_deploy}/
git add -A
git commit -m 'deploy'
git push -f origin deploy
rm -rf "${path_deploy}"

