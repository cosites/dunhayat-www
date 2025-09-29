const API_BASE = (import.meta.env.PUBLIC_API_BASE as string) || 'http://localhost:8080';
const INCLUDE_CREDENTIALS = (import.meta.env.PUBLIC_API_INCLUDE_CREDENTIALS as string) === 'true';

type ApiOptions = RequestInit & { raw?: boolean };

function getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
}

/**
 * Main request helper — uses Headers object to handle case-insensitive header checks,
 * merges opts.headers whether it's plain object or Headers, and attaches Authorization
 * header automatically if token exists and user hasn't provided an Authorization header.
 */
async function request<T = any>(path: string, opts: ApiOptions = {}): Promise<T> {
    const p = path.startsWith('/') ? path : `/${path}`;
    const url = `${API_BASE}/api/v1${p}`;

    // Start with default headers
    const headers = new Headers();
    headers.set('Accept', 'application/json');

    // Merge headers from opts (opts.headers can be Headers or plain object)
    if (opts.headers instanceof Headers) {
        opts.headers.forEach((v, k) => headers.set(k, v));
    } else if (opts.headers && typeof opts.headers === 'object') {
        Object.entries(opts.headers as Record<string, string>).forEach(([k, v]) => headers.set(k, v));
    }

    // Attach Authorization if token exists and header not already set (Headers.has is case-insensitive)
    const token = getToken();
    if (token && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const res = await fetch(url, {
        ...opts,
        headers,
        credentials: INCLUDE_CREDENTIALS ? 'include' : 'same-origin',
    });

    const contentType = res.headers.get('content-type') || '';

    const parseBody = async () => {
        const text = await res.text();
        try { return JSON.parse(text); } catch { return text; }
    };

    if (!res.ok) {
        const body = await parseBody();
        const err: any = new Error(body?.message || res.statusText || 'API error');
        err.status = res.status;
        err.body = body;
        throw err;
    }

    if (opts.raw) return res as unknown as T;
    if (contentType.includes('application/json')) return (await res.json()) as T;
    return (await res.text()) as unknown as T;
}

export default request;

/* High-level API methods */
export const api = {
    // AUTH
    requestOTP: (phone: string) => request('/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
    }),

    verifyOTP: (phone: string, code: string) => request('/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code }),
    }),

    logout: () => request('/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }),

    otpStatus: (phone: string) => request(`/auth/otp-status?phone=${encodeURIComponent(phone)}`, {}),

    // PRODUCTS
    listProducts: async (category?: number): Promise<Product[]> => {
        const q = category ? `?category=${category}` : '';
        const res = await request<any>(`/products${q}`);
        return res.data.map((r: ProductDto) => mapProduct(r));
    },
    getProduct: (id: string) => request(`/products/${encodeURIComponent(id)}`),

    // ORDERS
    createOrder: (payload: any) => request('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    }),
    getOrder: (id: string) => request(`/orders/${encodeURIComponent(id)}`),
    cancelOrder: (id: string) => request(`/orders/${encodeURIComponent(id)}/cancel`, {
        method: 'POST',
    }),

    // PAYMENTS
    initiatePayment: (payload: any) => request('/payments/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    }),
    verifyPayment: (payment_id: string) => request('/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment_id }),
    }),
    getPaymentStatus: (id: string, query?: { order_id?: string; tracking_code?: string }) => {
        const qs = query?.order_id ? `?order_id=${encodeURIComponent(query.order_id)}` :
            query?.tracking_code ? `?tracking_code=${encodeURIComponent(query.tracking_code)}` : '';
        return request(`/payments/${encodeURIComponent(id)}/status${qs}`);
    },

    paymentCallback: (payload: any) => request('/payments/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    }),
};


export interface Product {
    id: string;
    name: string;
    nameEn: string;
    description: string;
    price: number;
    image: any; // Changed from string to any to accept imported images
    category: 'coffee' | 'beverage' | 'instant';
    inStock: boolean;
    weight?: string;
    origin?: string;
    roastLevel?: string;
    bitterness?: string;
    body?: string;
    acidity?: string;
    sweetness?: string;
}
 export interface ProductDto{
     acidity: number,
     bitterness: number,
     body: number,
     category: number,
     created_at: string,
     description: string,
     id: string
     image_url: string,
     in_stock: number,
     name: string,
     name_en: string,
     origin: string,
     price: number,
     roast_level: string,
     sweetness: number,
     updated_at: string,
     weight: number
 }

function mapProduct(raw: ProductDto): Product {
    const src = (raw && (raw as any).data) ? (raw as any).data : raw;

    return {
        id: String(src.id ?? ''),
        name: src.name ?? src.name_en ?? 'بدون نام',
        nameEn: src.name_en ?? null,
        description: src.description ?? null,
        price: typeof src.price === 'number' ? src.price : (src.price ? Number(src.price) : null),
        image: `/images/${src.image_url}.avif`,
        inStock: typeof src.in_stock === 'number' ? src.in_stock : (src.in_stock ? Number(src.in_stock) : 0),
        weight: typeof src.weight === 'number' ? src.weight : null,
        roastLevel: src.roast_level ?? null,
        origin: src.origin ?? null,
        acidity: typeof src.acidity === 'number' ? src.acidity : null,
        bitterness: typeof src.bitterness === 'number' ? src.bitterness : null,
        body: typeof src.body === 'number' ? src.body : null,
        sweetness: typeof src.sweetness === 'number' ? src.sweetness : null,
        category: src.category ?? null,
        updatedAt: src.updated_at ?? null,
    };
}