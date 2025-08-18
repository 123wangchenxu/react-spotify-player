import { create } from "zustand";

const useStore = create((set) => ({
  nickname:'',
  pic:'',
  setNickName:(value)=>{
    set({
        nickname:value
    })
  },
  setPic:(value)=>{
    set({
        pic:value
    })
  }
}));

export default useStore;