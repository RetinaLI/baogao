#!/bin/bash
function check_result(){
  if [ "$1" != "0" ]
  then
    echo "出错了，请检查！";
    exit 2;
  fi
}

port=$1;

npm run build;
npm run gulpfile;


if [[ "$port" != "104" ]]; then
  echo "提交到 platform-iov-web";
  rm -rf ../../platform-iov-web/src/main/webapp/pages/nosecurity/subscribe/sas/report;
  cp -rf dist/* ../../platform-iov-web/src/main/webapp/pages/nosecurity/subscribe/sas/;

  cd ../../platform-iov-web
  git add -A;
  git commit -m "update 报告";
  git push;
  check_result $?;
else
  echo "发布到 104";
  scp -r dist/report devops@10.100.51.104:/data/platform-web-server/webapps/ROOT/pages/nosecurity/subscribe/sas;
fi
