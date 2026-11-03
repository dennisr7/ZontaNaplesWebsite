// Helpers for coercing untrusted request input into safe primitive values.
// Express parses `?a[b]=1` and JSON bodies into objects/arrays, which can be used
// for NoSQL operator injection (e.g. `{ "$ne": null }`) or type confusion.

/** Returns the value only if it is a string, otherwise undefined. */
export const str = (value) => (typeof value === 'string' ? value : undefined);

/** Returns the value if it is one of `allowed`, otherwise undefined. */
export const oneOf = (value, allowed) =>
    (typeof value === 'string' && allowed.includes(value) ? value : undefined);

/** Parses a positive integer, falling back to `fallback`, capped at `max`. */
export const positiveInt = (value, fallback, max = 1000) => {
    const n = Number.parseInt(str(value), 10);
    if (!Number.isFinite(n) || n < 1) return fallback;
    return Math.min(n, max);
};

/** Parses a date string; returns a Date or undefined if invalid. */
export const toDate = (value) => {
    const s = str(value);
    if (!s) return undefined;
    const d = new Date(s);
    return Number.isNaN(d.getTime()) ? undefined : d;
};

/**
 * Linear-time email check (no backtracking regex).
 * Requires a single "@", a dot inside the domain, no whitespace, max 254 chars.
 */
export const isValidEmail = (value) => {
    if (typeof value !== 'string' || value.length > 254 || /\s/.test(value)) return false;
    const at = value.indexOf('@');
    if (at < 1 || at !== value.lastIndexOf('@')) return false;
    const domain = value.slice(at + 1);
    const dot = domain.lastIndexOf('.');
    return dot > 0 && dot < domain.length - 1;
};

/** Copies only the listed keys from `source`, keeping string/number/boolean values. */
export const pick = (source, keys) => {
    const out = {};
    for (const key of keys) {
        const v = source?.[key];
        if (['string', 'number', 'boolean'].includes(typeof v)) out[key] = v;
    }
    return out;
};
