// https://nextjs.org/blog/building-apis-with-nextjs
import type { NextRequest } from "next/server";
import { genericApiHandler, type HandlerConfig } from "@api/genericApiHandler";
import type { EventData } from "@api/types";

export async function GET(
	req: NextRequest,
	// The 'params' from the context is a Promise. Update the type and await it.
	{ params: paramsPromise }: { params: Promise<{ eventId: string }> },
) {
	// Await the promise to get the actual params object
	const params = await paramsPromise;
	const { eventId } = params; // Now 'params' is the resolved object: { eventId: string }

	// Configuration for fetching a single event by its ID.
	// This is defined inside the GET handler to use the dynamic eventId.
	const eventConfig: HandlerConfig<EventData> = {
		// Expecting a single EventData object
		// The path on the external APIM service, using the eventId from the URL
		endpointPath: `/forge/api/event/${eventId}`,
		allowedMethod: "GET",
		// Cache the result on the server.
		revalidate: 60, // Cache for 1 minute, adjust as needed
	};

	// The genericApiHandler will fetch data from the constructed endpointPath.
	// The type argument is EventData, expecting a single event object.
	return genericApiHandler<EventData>(req, eventConfig);
}
