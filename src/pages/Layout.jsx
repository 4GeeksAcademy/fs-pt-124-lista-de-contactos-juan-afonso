import { Outlet, Link } from "react-router-dom";
import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ensureAgenda, getContacts } from "../services/Contacts";

export function Layout() {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    let mounted = true;
    (async () => {
      dispatch({ type: "contacts/loading" });
      try {
        await ensureAgenda();
        const data = await getContacts();
        if (mounted) dispatch({ type: "contacts/set", payload: Array.isArray(data) ? data : [] });
      } catch (err) {
        if (mounted) dispatch({ type: "contacts/error", payload: err.message });
      }
    })();
    return () => { mounted = false; };
  }, [dispatch]);

  return (
    <div>
      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
    </div>
  );
}
