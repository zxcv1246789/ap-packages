#! /bin/bash

cd packages

for id in $(ls); do

    echo $id;
    cd $id;
    #zip $id.zip -r ./*;
    AA='mv'
    BB="$id.zip"
    CC='..'
    echo "$AA $BB $CC"
    cd ..
    echo "out: $id.zip"

done
