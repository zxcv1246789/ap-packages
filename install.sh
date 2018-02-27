#! /bin/bash

cd packages

for id in $(ls); do

    echo $id;
    cd $id;
    zip $id.zip -r ./*;
    AA='mv'
    BB="$id.zip"
    CC='../'
    eval "$AA $BB $CC"
    cd ..
    echo "out: $id.zip"
    curl --form package=@$id.zip --form submit=Upload http://39.119.118.152:3000/api/upload
    rm -r "$id.zip"

done
