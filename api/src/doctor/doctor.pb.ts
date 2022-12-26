/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "doctor";

export interface DoctorById {
  id: number;
}

export interface Doctor {
  id: number;
  name: string;
}

export const DOCTOR_PACKAGE_NAME = "doctor";

export interface DoctorServiceClient {
  findOne(request: DoctorById): Observable<Doctor>;

  findMany(request: Observable<DoctorById>): Observable<Doctor>;
}

export interface DoctorServiceController {
  findOne(request: DoctorById): Promise<Doctor> | Observable<Doctor> | Doctor;

  findMany(request: Observable<DoctorById>): Observable<Doctor>;
}

export function DoctorServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOne"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("DoctorService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["findMany"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("DoctorService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const DOCTOR_SERVICE_NAME = "DoctorService";
