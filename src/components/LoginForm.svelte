<script lang="ts">
    import CoffeeBean from "../assets/images/coffee-bean.svg";
    import {setToken} from '../lib/auth';
    import {api} from '../lib/api';
    import {onMount} from 'svelte';

    let step: 'phone' | 'verify' = 'phone';
    let phone = '';
    let code = '';
    let loading = false;
    let error: string | null = null;
    let info: string | null = null;
    let cooldown = 0;
    let cooldownId: number | null = null;
    let redirectTo = '/';

    function startCooldown(seconds = 30) {
        cooldown = seconds;
        if (cooldownId) clearInterval(cooldownId);
        cooldownId = window.setInterval(() => {
            cooldown -= 1;
            if (cooldown <= 0 && cooldownId) {
                clearInterval(cooldownId);
                cooldownId = null;
            }
        }, 1000);
    }

    function clearCooldown() {
        if (cooldownId) {
            clearInterval(cooldownId);
            cooldownId = null;
        }
        cooldown = 0;
    }

    onMount(() => {
        const params = new URLSearchParams(location.search);
        const q = params.get('redirect');
        if (q) redirectTo = q;
    });

    function isValidPhone(phone2: string): boolean {
        return /^0\d{10}$/.test(phone2);
    }

    async function sendOtp() {
        error = null;
        info = null;
        const isValid = isValidPhone(phone);
        if (!phone || !isValid) {
            error = 'لطفاً شمارهٔ تلفن معتبر وارد کنید.';
            return;
        }
        loading = true;
        try {
            await api.requestOTP(phone)
            info = 'کد به شمارهٔ شما ارسال شد. پیامک را چک کنید.';
            step = 'verify';
            startCooldown(30);
        } catch (e: any) {
            error = e?.body?.message || e?.message || 'ارسال OTP ناموفق بود.';
        } finally {
            loading = false;
        }
    }

    async function verifyOtp() {
        error = null;
        info = null;
        const isValid = isValidPhone(phone);
        if (!isValid || !code) {
            error = ' کد الزامی است.';
            return;
        }
        loading = true;
        try {
            const data = await api.verifyOTP(phone, code)
            const token = data?.token ?? data?.access_token ?? null;
            const user = data?.user ?? data?.data ?? null;
            if (token) {
                setToken(token, user ?? null);
            } else {
                // try {
                //     const me = await api('/auth/me', {method: 'GET'});
                //     if (me) setToken(null, me);
                // } catch {
                // }
            }
            window.location.href = redirectTo || '/';
        } catch (e: any) {
            error = e?.body?.message || e?.message || 'تایید OTP ناموفق بود.';
        } finally {
            loading = false;
        }
    }

    async function resend() {
        if (cooldown > 0) return;
        await sendOtp();
    }
</script>

<section>
    <div class="min-h-[70vh] mx-auto px-4 w-full max-w-6xl flex flex-col items-center justify-center">
        <div class="text-center max-w-3xl">
            <div class="mb-8 relative">
                <img
                        src={CoffeeBean.src}
                        alt="دانه قهوه"
                        class="w-32 h-32 mx-auto"
                        formats={["svg"]}
                />
                <a href="/"
                   class="absolute top-0 right-0 py-2 md:w-[148px] font-medium h-[48px] border-none shadow-none gap-2 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         class="lucide lucide-arrow-right text-orange-primary w-4 h-4 md:w-5 md:h-5">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                    </svg>
                    بازگشت
                </a>
            </div>

            <div class="flex flex-col gap-6">
                {#if step === 'phone'}
                    <h2 class="text-2xl font-black text-balance md:text-4xl text-brand-brown">ورود با شماره
                        همراه</h2>
                    <p class="text-base md:text-lg text-right font-bold text-gray-600 max-w-2xl mx-auto">برای ورود به
                        حساب کاربری شماره
                        همراه خود را وارد نمایید</p>
                    <input
                            type="tel"
                            bind:value={phone}
                            placeholder="09123456789"
                            inputmode="tel"/>

                    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button class={`w-full button color-sand ${(loading || !phone) ? 'opacity-50 pointer-events-none' : ''}`} on:click={sendOtp} disabled={loading || !phone}
                        >
                            {#if loading}در حال ارسال...{:else}ارسال کد {/if}
                        </button>
                    </div>
                {:else}
                    <p class="text-right text-sm md:text-lg font-medium font-bold"> برای ادامه
                        یک کد اعتبار سنجی به شما ارسال گردیده است که باید در زیر وارد نمایید</p>
                    <div class="flex items-center justify-between font-medium font-bold"><span>{phone}</span>
                        <button class="text-brand-brown" on:click={() => { step = 'phone'; code=''; clearCooldown(); }}
                                type="button"> تغییر شماره
                        </button>
                    </div>

                    <div class="w-full">
                        <input
                                bind:value={code}
                                class=""
                                inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="کد دریافتی"
                                name="otp">
                    </div>
                    <div class="w-full flex items-center justify-center gap-10">
                        <button class={`w-1/2 button color-sand ${(loading || !code) ? 'opacity-50 pointer-events-none' : ''}`} on:click={verifyOtp} disabled={loading || !code}>
                            {#if loading}در حال تأیید...{:else}تأیید و ورود{/if}
                        </button>
                        <button class="w-1/2 justify-center whitespace-nowrap text-sm font-medium px-4 py-2 flex items-center gap-2 rounded-xl h-9">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                 class="lucide lucide-clock">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            {#if cooldown > 0}
                                <button class="" disabled>ارسال دوباره ({cooldown}s)</button>
                            {:else}
                                <button class="" on:click={resend}>ارسال دوباره کد</button>
                            {/if}
                        </button>
                    </div>
                {/if}
                {#if error}
                    <div class="message error">{error}</div>
                {/if}
                {#if info}
                    <div class="message info">{info}</div>
                {/if}
            </div>
        </div>
    </div>
</section>