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
  email: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface CreateUserResponse {
  status: number;
  error: string[];
  id: number;
}

export interface FindOneUserResponse {
  status: number;
  error: string[];
  data: User | undefined;
}

export interface FindManyUserRequest {
  name: string;
  email: string;
}

export interface FindManyUserResponse {
  status: number;
  error: string[];
  data: User[];
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  findOne(request: UserById): Observable<FindOneUserResponse>;

  findMany(request: Observable<UserById>): Observable<FindManyUserResponse>;

  createUser(request: CreateUserRequest): Observable<CreateUserResponse>;
}

export interface UserServiceController {
  findOne(request: UserById): Promise<FindOneUserResponse> | Observable<FindOneUserResponse> | FindOneUserResponse;

  findMany(request: Observable<UserById>): Observable<FindManyUserResponse>;

  createUser(
    request: CreateUserRequest,
  ): Promise<CreateUserResponse> | Observable<CreateUserResponse> | CreateUserResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOne", "createUser"];
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
