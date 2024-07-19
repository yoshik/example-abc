import { atom, SetterOrUpdater } from "recoil";
import { ExpiredAt } from "../models/ExpiredAt";
import { ApiBookAll, TopCategory } from "../apis/client";
import log from "../Log";

interface BookAllProps {
	expiredAt: ExpiredAt | null;
	data: TopCategory | null;
	error: boolean;
}

const initBookAllProps: BookAllProps = {
	expiredAt: null,
	data: null,
	error: false,
};

const fetchBookAll = (oldProps: BookAllProps): Promise<BookAllProps | null> => {
	const fetch = async (): Promise<BookAllProps | null> => {
		const res = await ApiBookAll();
		log("Loading ApiBookAll:" + res.response.status);
		const data = res.data?.top_category_list[0];
		if (res.response.status === 200 && data != null) {
			return {
				data: data,
				expiredAt: new Date(1000 * 60),
				error: false,
			};
		} else {
			if (oldProps.data != null) {
				return null;
			} else {
				return {
					data: null,
					expiredAt: null,
					error: true,
				};
			}
		}
	};
	const isExpire =
		oldProps.expiredAt == null || oldProps.expiredAt > new Date();
	return isExpire ? fetch() : null;
};

export const updateBookAll = async (
	state: BookAllProps,
	setState: SetterOrUpdater<BookAllProps>,
) => {
	const fetchData = await fetchBookAll(state);
	if (fetchData) setState(fetchData);
};

export const BookAllState = atom({
	key: "BookAllState",
	default: initBookAllProps,
});
