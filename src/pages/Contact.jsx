import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";
import { useNavigate } from "react-router-dom";
import "../styles/Contact.css"

export function Contact() {
  const { store } = useGlobalReducer();
  const navigate = useNavigate();

  const contacts = store?.contacts || {};
  const list = contacts.list || [];
  const loading = contacts.loading;
  const error = contacts.error;

  return (
    <section>
      <header>
        <h2>Contacts</h2>
        <button onClick={() => navigate("/add")} className="nuevo-contacto">New contact</button>
      </header>

      {loading && <p>Cargando...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="contenedor-contactos">
        {list.length > 0 ? (
          list.map((c) => <ContactCard key={c.id} contact={c} />)
        ) : (
          !loading && <p>No existing contacts yet!</p>
        )}
      </div>
    </section>
  );
}
