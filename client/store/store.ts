import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import playerSlice from "./slices/playerSlice";
import tracksSlice from "./slices/trackSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const makeStore = () =>
  configureStore({
    reducer: {
      player: playerSlice,
      tracks: tracksSlice,
    },
    devTools: true,
  });

type Store = ReturnType<typeof makeStore>;
export type RootState = ReturnType<Store["getState"]>;
export type AppDispatch = Store["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export const wrapper = createWrapper(makeStore, { debug: true });

