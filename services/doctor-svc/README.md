```
protoc --plugin=node_modules/.bin/protoc-gen-ts_proto -I=proto --ts_proto_out=./src/api/doctor proto/doctor.proto --ts_proto_opt=nestJs=true --ts_proto_opt=fileSuffix=.pb
```