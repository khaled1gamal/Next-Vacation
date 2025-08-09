document.addEventListener('DOMContentLoaded', () => {
    // تاريخ بدء العمل
    const startDate = new Date('July 26, 2025 00:00:00').getTime();

    // عناصر مدة العمل
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // عناصر الإجازة المتراكمة
    const daysOffElement = document.getElementById('off-days');
    const hoursOffElement = document.getElementById('off-hours');
    const minutesOffElement = document.getElementById('off-minutes');
    const secondsOffElement = document.getElementById('off-seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = now - startDate;

        // لو التاريخ لم يبدأ بعد
        if (difference < 0) {
            [daysElement, hoursElement, minutesElement, secondsElement,
             daysOffElement, hoursOffElement, minutesOffElement, secondsOffElement
            ].forEach(el => el.textContent = '00');
            return;
        }

        // ====================
        // ✅ مدة العمل الفعلية
        // ====================
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysElement.textContent = String(days).padStart(2, '0');
        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');

        // ===================================
        // ✅ حساب الإجازات بناءً على السنوات
        // ===================================
        const oneYearMs = 1000 * 60 * 60 * 24 * 365; // سنة بالميلي ثانية
        const yearsPassed = difference / oneYearMs; // عدد السنوات بدقة

        const totalOffDays = yearsPassed * 28; // كل سنة = 28 يوم إجازة
        const offMs = totalOffDays * 24 * 60 * 60 * 1000; // تحويل الإجازات إلى ميلي ثانية

        // تفصيل الإجازة إلى أيام وساعات ودقائق وثواني
        const offDays = Math.floor(offMs / (1000 * 60 * 60 * 24));
        const offHours = Math.floor((offMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const offMinutes = Math.floor((offMs % (1000 * 60 * 60)) / (1000 * 60));
        const offSeconds = Math.floor((offMs % (1000 * 60)) / 1000);

        daysOffElement.textContent = String(offDays).padStart(2, '0');
        hoursOffElement.textContent = String(offHours).padStart(2, '0');
        minutesOffElement.textContent = String(offMinutes).padStart(2, '0');
        secondsOffElement.textContent = String(offSeconds).padStart(2, '0');
    }

    // تحديث العداد كل ثانية
    setInterval(updateCountdown, 1000);

    // تحديث أولي عند التحميل
    updateCountdown();
});
