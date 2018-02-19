#! /bin/bash

cd packages

for id in 'ls' do

  if [ $id = "ls" ]
  then
    echo "exittt";
    exit
  else
    echo $id;
    cd $id;
    zip $id.zip -r ./*
    mv "$id.zip" ..
    cd ..
    echo "out: $id.zip"
  fi

done
