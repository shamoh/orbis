#!/usr/bin/env bash

PROJECT_ID="${PROJECT_ID:-orbis-42}"

docker run --name $PROJECT_ID -p 3000:3000 -d gcr.io/$PROJECT_ID/orbis
