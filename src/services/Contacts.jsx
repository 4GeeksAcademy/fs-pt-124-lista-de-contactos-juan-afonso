const API_BASE = "https://playground.4geeks.com/contact/agendas";
const AGENDA_SLUG = "afo";

async function http(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${errorBody || res.statusText}`);
  }
  return res.json().catch(() => null);
}

export async function ensureAgenda() {
  try {
    await http(`${API_BASE}/${AGENDA_SLUG}`, { method: "POST" });
  } catch (err) {
  }
}

export async function getContacts() {
  return http(`${API_BASE}/${AGENDA_SLUG}/contacts`);
}

export async function createContact(contact) {
  return http(`${API_BASE}/${AGENDA_SLUG}/contacts`, {
    method: "POST",
    body: JSON.stringify(contact),
  });
}

export async function updateContact(id, contact) {
  return http(`${API_BASE}/${AGENDA_SLUG}/contacts/${id}`, {
    method: "PUT",
    body: JSON.stringify(contact),
  });
}

export async function deleteContact(id) {
  return http(`${API_BASE}/${AGENDA_SLUG}/contacts/${id}`, {
    method: "DELETE",
  });
}
