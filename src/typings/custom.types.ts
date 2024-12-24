export type RemoveNever<T> = {
	[K in keyof T as T[K] extends never ? never : K]: T[K];
};

export type Flatten<T> = T extends object
	? { [K in keyof T]: T[K] extends object ? Flatten<T[K]> : T[K] }
	: T;
