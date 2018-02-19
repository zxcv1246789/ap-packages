#! /bin/bash

cd packages

for id in $(ls); do

    echo $id;
    cd $id;
    zip $id.zip -r ./*;
    mv "$id.zip" ..;
    cd ..
    echo "out: $id.zip"

done
