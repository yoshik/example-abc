import { atom } from "recoil";
import { NetworkState, ExpiredAt, Initialized } from "../models/NetworkState";
import { ResponseBookAll } from "../apis/client";

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

export const BookAllState = atom({
	key: "BookAllState",
	default: initBookAllProps,
});
