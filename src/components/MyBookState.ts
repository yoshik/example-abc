import { atom, SetterOrUpdater } from "recoil";
import log from "../Log";
import { Book } from "../apis/client";

interface MyBookProps {
	favorites: { [key: string]: boolean };
}

const key = "LocalStorageBookAllState";
const save = (favorites: { [key: string]: boolean }) =>
	localStorage.setItem(key, JSON.stringify(favorites));
const load = (): { [key: string]: boolean } =>
	JSON.parse(localStorage.getItem(key)) ?? {};

export const setFavorite = (
	book: Book,
	state: MyBookProps,
	setState: SetterOrUpdater<MyBookProps>,
) => {
	log("set favoirte " + book.id_book);
	var newStates = JSON.parse(JSON.stringify(state.favorites));
	newStates[book.id_book] = true;
	save(newStates);
	setState({ favorites: newStates });
};

export const unsetFavorite = (
	book: Book,
	state: MyBookProps,
	setState: SetterOrUpdater<MyBookProps>,
) => {
	log("unset favoirte " + book.id_book);
	var newStates = JSON.parse(JSON.stringify(state.favorites));
	newStates[book.id_book] = false;
	save(newStates);
	setState({ favorites: newStates });
};

const initMyBookProps: MyBookProps = {
	favorites: load(),
};

export const MyBookState = atom({
	key: "MyBookState",
	default: initMyBookProps,
});
