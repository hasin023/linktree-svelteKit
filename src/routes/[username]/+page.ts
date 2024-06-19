import { users } from "$lib/data/users";
import type { PageLoad } from "./$types";

export const load = (async ({ params }) => {
	const userData = users.filter((user) => {
		return user.username === params.username;
	});

	const foundUser = userData[0];

	if (!foundUser) {
		return {
			error: `User @${params.username} does not exist`,
		};
	}

	if (!foundUser.published) {
		return {
			error: `Profile of @${params.username} is not Public`,
		};
	}

	return { foundUser };
}) satisfies PageLoad;
