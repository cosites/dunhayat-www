<script lang="ts">
    import { onMount } from 'svelte';
    import { api } from '~/lib/api';
    import { cartStore } from '~/components/CartStore.js';

    let loading = true;
    let success = false;
    let message = '';

    onMount(async () => {
        try {
            const params = new URLSearchParams(window.location.search);
            const paymentId = params.get('payment_id');
            const orderId = params.get('order_id');
            const tracking = params.get('tracking_code');

            if (!paymentId && !orderId && !tracking) {
                message = 'پارامترهای پرداخت موجود نیست.';
                loading = false;
                return;
            }

            if (paymentId) {
                const res: any = await api.verifyPayment(paymentId);
                if (res?.data?.status === 'success' || res?.status === 'paid' || res?.paid) {
                    success = true;
                    message = 'پرداخت با موفقیت انجام شد. سفارش شما ثبت و در حال پردازش است.';
                    cartStore.clearCart();
                } else {
                    success = false;
                    message = 'پرداخت انجام نشد یا در انتظار است. لطفا بعداً بررسی کنید.';
                }
            } else {
                const idToCheck = paymentId ?? (orderId ?? tracking);
                const res: any = await api.getPaymentStatus(idToCheck, orderId ? { order_id: orderId } : undefined);
                if (res?.data?.status === 'success' || res?.status === 'paid') {
                    success = true;
                    message = 'پرداخت با موفقیت انجام شد.';
                    cartStore.clearCart();
                } else {
                    success = false;
                    message = 'پرداخت ناموفق یا هنوز تأیید نشده است.';
                }
            }
        } catch (err: any) {
            console.error(err);
            message = err?.message ?? 'خطا در بررسی پرداخت';
        } finally {
            loading = false;
        }
    });
</script>

<div class="max-w-2xl mx-auto p-6">
    {#if loading}
        <div class="text-center text-gray-600">در حال بررسی وضعیت پرداخت...</div>
    {:else}
        <div class={`p-6 rounded-md ${success ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
            <h2 class="text-lg font-semibold mb-2">{success ? 'پرداخت موفق' : 'پرداخت ناموفق'}</h2>
            <p class="text-sm text-gray-700 mb-4">{message}</p>
            <div class="flex space-x-2">
                <a href="/" class="px-4 py-2 bg-indigo-600 text-white rounded-md">بازگشت به صفحه اصلی</a>
                <a href="/orders" class="px-4 py-2 border rounded-md text-sm">مشاهده سفارش‌ها</a>
            </div>
        </div>
    {/if}
</div>
