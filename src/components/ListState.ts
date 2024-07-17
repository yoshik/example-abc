import { atom } from "recoil";
import { NetworkState, ExpiredAt, Initialized } from "../models/NetworkState";
import { ResponseBookAll } from "../apis/client";

interface ListProps {
	networkState: NetworkState;
	expiredAt: ExpiredAt | null;
	cache: ResponseBookAll | null;
}

const initListProps: ListProps = {
	networkState: Initialized,
	expiredAt: null,
	cache: null,
};

export const ListState = atom({
	key: "ListState",
	default: initListProps,
});
