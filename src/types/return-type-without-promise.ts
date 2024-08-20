export type ReturnTypeWithoutPromise<T extends (...args: any) => any> = 
    T extends (...agrs: any) => Promise<infer U> ? U : never