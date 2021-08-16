#!/usr/bin/env bash

ENDPOINT="http://localhost:3000/graphql"


# Delete the existing files. Sometimes the files do not get overwritten.
rm ./src/graphql/globalTypes.ts
rm ./src/graphql/graphql-schema.json
rm ./src/graphql/schema.graphql

# Download the GraphQL schema and store it in graphql-schema.json file
apollo schema:download \
--endpoint=$ENDPOINT ./src/graphql/graphql-schema.json

# Convert the graphql-schema.json file to tge GraphQL SDL
graphql-introspection-json-to-sdl ./src/graphql/graphql-schema.json > ./src/graphql/schema.graphql

# Look at all the ts, tsx files inside src for gql declaration
# and generate types in globalTypes.ts and local to respective ts,tsx files (they will be inside ./generated folders)
apollo client:codegen \
--globalTypesFile="./src/graphql/globalTypes.ts" \
--localSchemaFile=./src/graphql/graphql-schema.json \
--target=typescript \
--includes="./src/**/*.{ts,tsx}" \
--tagName=gql \
--addTypename
