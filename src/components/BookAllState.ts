import { atom } from "recoil";
import {
	NetworkState,
	ExpiredAt,
	Initialized,
	Loaded,
	Expired,
} from "../models/NetworkState";
import { ApiBookAll, ResponseBookAll } from "../apis/client";
import log from "../Log";

interface BookAllProps {
	networkState: NetworkState;
	expiredAt: ExpiredAt | null;
	cache: ResponseBookAll | null;
}

const initBookAllProps: BookAllProps = {
	networkState: Initialized,
	expiredAt: null,
	cache: null,
};

export const updateBookAllIfNeeded = (
	oldProps: BookAllProps,
): Promise<BookAllProps | null> => {
	const fetch = async (): Promise<BookAllProps | null> => {
		const res = await ApiBookAll();
		log("Loading ApiBookAll:" + res.response.status);
		return res.response.status == 200
			? {
					networkState: Loaded,
					cache: res.data,
					expiredAt: new Date(1000 * 60),
				}
			: null;
	};
	const isExpire = oldProps.expiredAt > new Date();

	switch (oldProps.networkState) {
		case Initialized:
			return fetch();
		case Loaded:
			if (isExpire) {
				return fetch();
			} else {
				return null;
			}
		case Expired:
			return fetch();
	}
};

export const BookAllState = atom({
	key: "BookAllState",
	default: initBookAllProps,
});
