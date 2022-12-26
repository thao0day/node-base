/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface UserById {
  id: number;
}

export interface User {
  id: number;
  name: string;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  findOne(request: UserById): Observable<User>;

  findMany(request: Observable<UserById>): Observable<User>;
}

export interface UserServiceController {
  findOne(request: UserById): Promise<User> | Observable<User> | User;

  findMany(request: Observable<UserById>): Observable<User>;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOne"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["findMany"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
