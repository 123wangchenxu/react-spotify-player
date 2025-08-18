import { create } from "zustand";

const useStore = create((set) => ({
  nickname: "",
  pic: "",
  token: "",
  setNickName: (value) => {
    set({
      nickname: value,
    });
  },
  setPic: (value) => {
    set({
      pic: value,
    });
  },
  setToken: (value) => {
    set({
      token: value,
    });
  },
}));

export default useStore;