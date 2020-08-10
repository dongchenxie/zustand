import { useEffect } from "react";
import { create } from "zustand";

let initialState = {
  isLoading: false,
  currentUser: {},
  users: [],
  messages: []
};

const [useChatStore, ChatStore] = create(function chatStore(set, get) {
  return Object.assign(initialState, {
    isLoading: false,
    currentUser: {},
    users: [],
    messages: [],
    addUser: () => {
      let state = get();
      set({
        users: [
          ...state.users,
          {
            id: "user" + Math.random(),
            name: Math.random()
          }
        ]
      });
    },
    toggleLoading(value) {
      set({ isLoading: value });
    },
    getMessages: () => {
      let state = get();
      state.toggleLoading(!state.isLoading);
      setTimeout(() => {
        state.toggleLoading(!state.isLoading);
        set({
          messages: [{ text: "Hello", id: Math.random(), user: "user001" }]
        });
      }, 2000);
    },
    sendMessage: message => {
      let messages = get().messages;
      set({ messages: [...messages, { text: message, id: Math.random() }] });
    }
  });
});

export function useReset() {
  useEffect(() => {
    return () => {
      console.log("unMounting test");
      ChatStore.setState(initialState);
    };
  }, []);
}

export { useChatStore, ChatStore };
