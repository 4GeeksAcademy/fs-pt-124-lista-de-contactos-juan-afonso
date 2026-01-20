import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { createContact, updateContact } from "../services/Contacts";
import "../styles/AddContact.css"

export function AddContact() {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = useParams();

  const existing = useMemo(
    () => store.contacts.list.find(c => String(c.id) === String(id)),
    [store.contacts.list, id]
  );

  const [form, setForm] = useState({
    name: existing?.name || "",
    email: existing?.email || "",
    phone: existing?.phone || "",
    address: existing?.address || ""
  });


  useEffect(() => {
    dispatch({ type: "contacts/select", payload: existing || null });
    return () => dispatch({ type: "contacts/clearSelection" });
  }, [existing, dispatch]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "contacts/loading" });
    try {
      if (existing) {
        const updated = await updateContact(existing.id, form);
        dispatch({ type: "contacts/update", payload: updated });
      } else {
        const created = await createContact(form);
        dispatch({ type: "contacts/add", payload: created });
      }
      navigate("/");
    } catch (err) {
      dispatch({ type: "contacts/error", payload: err.message });
    }
  };

  return (
    <section className="text-light">
      <h2 className="text-success">{existing ? "Edit contact" : "New Contact"}</h2>
      <form onSubmit={onSubmit}>
        <label>
          <span> Full Name</span>
          <br />
          <input name="name" value={form.name} onChange={onChange} required placeholder="Full Name" />
        </label>

        <label>
          <span>Email</span>
          <br />
          <input type="email" name="email" value={form.email} onChange={onChange} required placeholder="Enter Email"/>
        </label>
        <label>
          <span>Phone</span>
          <br />
          <input name="phone" value={form.phone} onChange={onChange} required placeholder="Enter Phone"/>
        </label>
        <label>
          <span>Address</span>
          <br />
          <input name="address" value={form.address} onChange={onChange} placeholder="Enter Address"/>
        </label>

        <div className="contenedor-botones">
          <button type="submit" className="btn btn-primary rounded-pill border border-light border-2">{existing ? "Actualizar" : "Create"}</button>
          <button type="button" onClick={() => navigate("/")} class="btn btn-danger rounded-pill border border-light border-2">Cancel</button>
        </div>
      </form>
    </section>
  );
}
