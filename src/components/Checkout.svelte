<!-- src/components/Checkout.svelte -->
<script lang="ts">
    import {onMount} from 'svelte';
    import {cartStore} from '../components/CartStore.js';
    import {api} from '~/lib/api';

    let loading = false;
    let error: string | null = null;
    let disabledSubmit = false;

    // form fields
    let fullName = '';
    let phone = '';
    let address = '';
    let postalCode = '';

    const postalRegex = /^\d{10}$/;

    let total = cartStore.getTotalPrice()
    let items = cartStore.items

    onMount(() => {
        console.log('item', items)
        console.log('totals', total)
    });

    function validateForm() {
        if (!address || address.length < 5) {
            error = 'آدرس تحویل را وارد کنید';
            return false;
        }
        if (!postalRegex.test(postalCode)) {
            error = 'کدپستی باید ۱۰ رقم باشد';
            return false;
        }
        if (!items || items.length === 0) {
            error = 'سبد خرید خالی است';
            return false;
        }
        return true;
    }

    async function submitOrder() {
        error = null;
        if (!validateForm()) return;
        if (disabledSubmit) return;
        disabledSubmit = true;
        loading = true;

        try {
            const payload = {
                items: items.map(i => ({product_id: i.id, quantity: i.quantity})),
                postal_code: postalCode,
                address,
                user_id: localStorage.getItem('user_id'),
                return_url: `/return`,
                callback_url: '/checkout'
            };

            const orderRes: any = await api.createOrder(payload);
            const orderId = orderRes?.data?.id ?? orderRes?.id ?? orderRes?.order_id;
            if (!orderId) throw new Error('شناسه سفارش دریافت نشد.');

            const amount = orderRes?.data?.total_amount ?? orderRes?.total ?? total;
            const payPayload = {order_id: orderId, amount, return_url: `${window.location.origin}/return`};
            const payRes: any = await api.initiatePayment(payPayload);

            const paymentUrl = payRes?.data?.payment_url ?? payRes?.payment_url ?? payRes?.redirect_url;
            if (paymentUrl) {
                // redirect to gateway
                window.location.href = paymentUrl;
                return;
            }

            if (payRes?.data?.gateway?.url && payRes.data.gateway.params) {
                postToGateway(payRes.data.gateway.url, payRes.data.gateway.params);
                return;
            }

            const paymentId = payRes?.data?.payment_id ?? payRes?.payment_id;
            if (paymentId) {
                window.location.href = `/return?payment_id=${encodeURIComponent(paymentId)}&order_id=${encodeURIComponent(orderId)}`;
                return;
            }

            throw new Error('پاسخ درگاه پرداخت نامشخص است.');
        } catch (err: any) {
            console.error(err);
            error = err?.body?.message ?? err?.message ?? 'خطا در ثبت سفارش';
        } finally {
            loading = false;
            disabledSubmit = false;
        }
    }

    function postToGateway(url: string, params: Record<string, any>) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = url;
        form.style.display = 'none';
        for (const k in params) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = k;
            input.value = String(params[k]);
            form.appendChild(input);
        }
        document.body.appendChild(form);
        form.submit();
    }
</script>

<div class="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2">
            <div class="space-y-4">
                <label class="block flex flex-col gap-2">
                    <span class="text-sm font-medium">آدرس تحویل</span>
                    <textarea class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" rows="4"
                              bind:value={address} placeholder="خیابان، پلاک، واحد"></textarea>
                </label>

                <label class="block flex flex-col gap-2">
                    <span class="text-sm font-medium">کدپستی</span>
                    <input class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" bind:value={postalCode}
                           placeholder="۱۰ رقم"/>
                </label>
            </div>
        </div>

        <aside class="flex flex-col gap-4 p-4 rounded-md">
            <p class="text-2xl font-bold mb-3">خلاصه سفارش</p>
            <div class="space-y-3">
                {#each items as it}
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div>
                                <div class="text-sm font-medium">{it.name}</div>
                                <div class="text-xs text-gray-500">تعداد: {it.quantity}</div>
                            </div>
                        </div>
                        <div class="text-sm font-medium">{it.price * it.quantity}</div>
                    </div>
                {/each}
            </div>

            <div class="border-t pt-3">
                <!--                <div class="flex justify-between text-sm text-gray-600">-->
                <!--                    <div>جمع کالا</div>-->
                <!--                    <div>{cartActions.formatPrice(total)}</div>-->
                <!--                </div>-->

                <div class="flex justify-between text-lg font-semibold mt-3">
                    <div>مبلغ نهایی</div>
                    <div>{total}</div>
                </div>
            </div>
            <div class="flex flex-col sm:flex-row gap-4 mt-4 justify-center items-center">
                <button
                        class={`button text-brand-brown ${(loading || disabledSubmit) ? 'opacity-50 pointer-events-none' : ''}}`}
                        on:click={submitOrder}
                        type="submit"
                        aria-disabled={loading || disabledSubmit}
                        disabled={loading || disabledSubmit}
                >
                    {#if loading}
                        در حال ارسال...
                    {:else}
                        پرداخت و نهایی‌سازی خرید
                    {/if}
                </button>
                <a href="/" class="not-prose button button-brown">
                    <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="size-5 inline-block -mt-0.5 ml-2"
                    >
                        <path
                                fill-rule="evenodd"
                                d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
                                clip-rule="evenodd"></path>
                    </svg>
                    بازگشت به خانه
                </a>
            </div>
        </aside>
    </div>
    <span class="mb-4 error text-sm p-3 rounded">
            {error}
    </span>
</div>

<style>
    .error{
        color: red;
    }
</style>