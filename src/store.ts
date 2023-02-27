import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

type IListItem = {
  id: number;
  item: string;
  completed: boolean;
};

const listItemStore = () => {
  const { subscribe, set, update }: Writable<Array<IListItem>> = writable(
    JSON.parse(localStorage.getItem("svelte-local-storage")) || []
  );
  return {
    subscribe,
    add: (item: string) => {
      update((n): IListItem => {
        let nn = [...n, { item, id: +new Date(), completed: false }];
        localStorage.setItem("svelte-local-storage", JSON.stringify(nn));
        return nn;
      });
    },
    remove: (id: number) => {
      update((items): IListItem => {
        const rmvItem = items.filter((n) => n.id !== id);
        localStorage.setItem("svelte-local-storage", JSON.stringify(rmvItem));
        return rmvItem;
      });
    },
    changeCompleted: (id: number, bool: boolean) => {
      update((n) => {
        let temp = n.map((item): IListItem => {
          if (item.id === id) {
            return {
              ...item,
              completed: !item.completed,
            };
          }
          return item;
        });
        localStorage.setItem("svelte-local-storage", JSON.stringify([...temp]));
        return [...temp];
      });
    },
  };
};

export { listItemStore, IListItem };
