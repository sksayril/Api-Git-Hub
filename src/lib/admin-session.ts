/** Client-side admin session keys — extend when adding persisted admin state */
export const ADMIN_STORAGE_KEYS = [
  "admin_token",
  "admin_user",
  "admin_session",
  "admin_remember",
] as const;

/** Remove admin auth data from browser storage */
export function clearAdminClientSession() {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.clear();
  } catch {
    // ignore private browsing / blocked storage
  }

  try {
    ADMIN_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));

    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("admin_")) keysToRemove.push(key);
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  } catch {
    // ignore
  }
}

/** Call logout API, clear client storage, then redirect to login */
export async function performAdminLogout(redirect: () => void) {
  try {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include",
      cache: "no-store",
    });
  } catch {
    // still clear client state if API fails
  }

  clearAdminClientSession();
  redirect();
}
