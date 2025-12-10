export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ], // 👈 aquí solo un corchete de cierre
    contacts: {
      list: [],
      loading: false,
      error: null,
      current: null,
      confirmDeleteId: null
    }
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "add_task": {
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        )
      };
    }

    case "contacts/loading":
      return { ...store, contacts: { ...store.contacts, loading: true, error: null } };

    case "contacts/error":
      return { ...store, contacts: { ...store.contacts, loading: false, error: action.payload } };

    case "contacts/set":
      return { ...store, contacts: { ...store.contacts, list: action.payload, loading: false, error: null } };

    case "contacts/add":
      return {
        ...store,
        contacts: {
          ...store.contacts,
          list: [action.payload, ...store.contacts.list],
          loading: false
        }
      };

    case "contacts/update":
      return {
        ...store,
        contacts: {
          ...store.contacts,
          list: store.contacts.list.map(c => c.id === action.payload.id ? action.payload : c),
          loading: false
        }
      };

    case "contacts/confirmDelete":
      return { ...store, contacts: { ...store.contacts, confirmDeleteId: action.payload } };

    case "contacts/cancelDelete":
      return { ...store, contacts: { ...store.contacts, confirmDeleteId: null } };

    case "contacts/remove":
      return {
        ...store,
        contacts: {
          ...store.contacts,
          list: store.contacts.list.filter(c => c.id !== action.payload),
          loading: false,
          confirmDeleteId: null
        }
      };

    case "contacts/select":
      return { ...store, contacts: { ...store.contacts, current: action.payload } };

    case "contacts/clearSelection":
      return { ...store, contacts: { ...store.contacts, current: null } };

    default:
      throw Error("Unknown action.");
  }
}
