import { atom } from "jotai";
import { useAtom } from "jotai";

export const favouritesAtom = atom([])

export const useFavouriteListState = () => useAtom(favouritesAtom)

export const searchHistoryAtom = atom([])

export const useSearchHistoryState = ()=> useAtom(searchHistoryAtom)
