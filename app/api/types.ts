// https://github.com/Azure/azure-sdk-for-js
import type { RestError } from "@azure/core-rest-pipeline";

export interface apiResponseProp<T> {
	success: unknown;
	isLoading: boolean;
	error: Error | null;
	message?: string | null;
	data?: T | null;
}

export interface EventData {
	id: string;
	title: string;
	imageId: string;
	location: string;
	dateTime: string;
	price: number;
	description?: string;
	packages?: EventPackage[];
	packageCount?: number;
}

export interface EventPackage {
	id: number;
	title: string;
	description: string;
	perks: string;
	price: number;
	currency: string;
}

export interface EventImageData {
	id: string;
	name: string;
	path: string;
	description: string;
	createdAt: string;
	altText: string;
}

export interface EventLocationData {
	id: string;
	streetName: string;
	city: string;
	state: string;
}

// This format is based on your API outputformat, be sure to keep it updated
// if your APIResponse changes
export interface FullApiResponse<T> {
	[x: string]: unknown;
	value: T;
	error: RestError;
	statusCode: number;
}
