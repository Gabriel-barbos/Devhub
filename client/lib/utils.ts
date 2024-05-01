import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface JwtDecodeOptions {
  header?: boolean;
}
export interface JwtHeader {
  typ?: string;
  alg?: string;
  kid?: string;
}
export interface JwtPayload {
  username?: string;
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}
export declare class InvalidTokenError extends Error {
}
export declare function jwtDecode<T = JwtHeader>(token: string, options: JwtDecodeOptions & {
  header: true;
}): T;
export declare function jwtDecode<T = JwtPayload>(token: string, options?: JwtDecodeOptions): T;
