#!/usr/bin/env bash

PROJECT_ID="${PROJECT_ID:-orbis-42}"

gcloud docker -- push gcr.io/$PROJECT_ID/orbis:latest
