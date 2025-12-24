export const getAccessTokenFromCookies = () => {
	const match = /(^| )accessToken=([^;]+)/.exec(document.cookie);
	return match && match[2];
};

export const fetchWithRewrites = async (
	input: RequestInfo | URL,
	init?: RequestInit,
	withToken = true,
): Promise<Response> => {
	// const navigate = useNavigate();

	const backendUrl =
		process.env.BACKEND_URL ?? "http://localhost:3001"; // Default to local server during development.

	const rewrittenUrl =
		typeof input === "string" && input.startsWith("/api")
			? `${backendUrl}${input}`
			: input;

	const accessToken = getAccessTokenFromCookies();

	console.log("TEH SEECTED ORG ID", localStorage.getItem('selectedOrganization'))
	const selectedOrgRaw = localStorage.getItem('selectedOrganization');
	const selectedOrg = selectedOrgRaw ? JSON.parse(selectedOrgRaw) : null;

	const defaultHeaders = {
		...(init?.body instanceof FormData
			? {}
			: {
				"Content-Type": "application/json",
				...(selectedOrg?._id && {
					"x-organization-id": selectedOrg._id.toString(),
				}),
			}),
		Authorization: withToken && accessToken ? `Bearer ${accessToken}` : "",
	};

	try {
		const response = await fetch(rewrittenUrl, {
			...init,
			headers: {
				...defaultHeaders,
				...(init?.headers || {}),
			},
			credentials: init?.credentials ?? "include", // Ensure cookies are sent
		});

		if (response.status === 401) {
			window.alert(
				"You are not authenticated. Please save your work and login again",
			);
			// window.location.href = '/auth';
		}

		if (response.status === 402) {
			alert("You don't have enough credits to perform this action.");
		}

		if (response.status >= 300 && response.status <= 399)
			window.location.replace("/auth");
		if (response.status === 403) {
			alert("Unauthorized action. This will be reported.");
		}

		return response;
	} catch (error) {
		console.error("Fetch error:", error);
		throw error;
	}
};

export async function* fetchWithRewritesGenerator(
	input: RequestInfo | URL,
	init?: RequestInit,
	withToken = true,
): AsyncGenerator<Uint8Array> {
	const backendUrl =
		process.env.BACKEND_URL ?? "http://localhost:3001"; // Default to local server during development.

	const rewrittenUrl =
		typeof input === "string" && input.startsWith("/api/v1/")
			? `${backendUrl}${input}`
			: input;

	const accessToken = getAccessTokenFromCookies();

	console.log("TEH SEECTED ORG ID", localStorage.getItem('selectedOrganization'))
	const selectedOrgRaw = localStorage.getItem('selectedOrganization');
	const selectedOrg = selectedOrgRaw ? JSON.parse(selectedOrgRaw) : null;

	const defaultHeaders = {
		...(init?.body instanceof FormData
			? {}
			: {
				"Content-Type": "application/json",
				...(selectedOrg?._id && {
					"x-organization-id": selectedOrg._id.toString(),
				}),
			}),
		Authorization: withToken && accessToken ? `Bearer ${accessToken}` : "",
	};

	const response = await fetch(rewrittenUrl, {
		...init,
		headers: {
			...defaultHeaders,
			...(init?.headers || {}),
		},
		credentials: init?.credentials ?? "include", // Ensure cookies are sent
	});

	if (response.status === 401) {
		throw new Error("Unauthorized: Please save your work and login again");
	}
	if (response.status === 402) {
		throw new Error("Insufficient credits for this action");
	}
	if (response.status >= 300 && response.status <= 399) {
		window.location.replace("/auth");
		throw new Error("Redirected");
	}
	if (response.status === 403) {
		throw new Error("Unauthorized action");
	}

	if (!response.body) {
		throw new Error("Response does not have a body");
	}

	const reader = response.body.getReader();

	try {
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			if (value) yield value;
		}
	} finally {
		reader.releaseLock();
	}
}
