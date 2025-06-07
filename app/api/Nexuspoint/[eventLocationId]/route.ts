// https://nextjs.org/blog/building-apis-with-nextjs
import type { NextRequest } from "next/server";
import { genericApiHandler, type HandlerConfig } from "@api/genericApiHandler";
import type { EventLocationData } from "@api/types";

export async function GET(
	req: NextRequest,
	// The 'params' from the context is a Promise. Update the type and await it.
	{ params: paramsPromise }: { params: Promise<{ eventLocationId: string }> },
) {
	// Await the promise to get the actual params object
	const params = await paramsPromise;
	const { eventLocationId } = params; // Now 'params' is the resolved object: { imageId: string }

	// Configuration for fetching a single image by its ID.
	// This is defined inside the GET handler to use the dynamic imageId.
	const imageConfig: HandlerConfig<EventLocationData> = {
		// Expecting a single EventImageData object
		// The path on the external APIM service, using the imageId from the URL
		endpointPath: `/nexuspoint/api/Location/${eventLocationId}`,
		allowedMethod: "GET",
		// Cache the result on the server.
		revalidate: 60, // Cache for 1 minute, adjust as needed
	};

	// The genericApiHandler will fetch data from the constructed endpointPath.
	// The type argument is EventImageData, expecting a single image object.
	return genericApiHandler<EventLocationData>(req, imageConfig);
}
