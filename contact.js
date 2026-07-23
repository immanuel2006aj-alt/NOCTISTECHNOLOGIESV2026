/*==================================================
NOCTIS CONTACT FORM
PART 1
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("projectEnquiryForm");

    if (!form) return;

    const submitButton = form.querySelector("button[type='submit']");

    const successBox = document.getElementById("formSuccess");

    const errorBox = document.getElementById("formError");

    /*==================================================
    TELEGRAM CONFIG
    ==================================================*/

    const BOT_TOKEN = "8845564769:AAEGwcjtFtVZo9wTvxkvNnEbtkfTyvIIxV0";

    const CHAT_ID = "1287496525";

    const TELEGRAM_URL =
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    /*==================================================
    DUPLICATE PROTECTION
    ==================================================*/

    const STORAGE_KEY = "noctis_last_enquiry";

    const LIMIT_HOURS = 24;

    function canSubmit() {

        const last = localStorage.getItem(STORAGE_KEY);

        if (!last) return true;

        return (
            Date.now() - Number(last)
        ) > LIMIT_HOURS * 60 * 60 * 1000;

    }

    function saveSubmitTime() {

        localStorage.setItem(
            STORAGE_KEY,
            Date.now()
        );

    }

    /*==================================================
    MESSAGE HELPERS
    ==================================================*/

    function hideMessages() {

        successBox.classList.remove("active");
        errorBox.classList.remove("active");

    }

    function showError(message) {

        errorBox.textContent = message;
        errorBox.classList.add("active");

    }

    function showSuccess(message) {

        successBox.querySelector("p").innerHTML = message;
        successBox.classList.add("active");

    }

    hideMessages();
  /*==================================================
VALIDATION
==================================================*/

function validateForm() {

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const budget = document.getElementById("budget").value;
    const projectDetails = document.getElementById("projectDetails").value.trim();

    if (!fullName || !email || !phone || !service || !projectDetails) {

        showError("Please complete all required fields.");
        return false;

    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

        showError("Please enter a valid email address.");
        return false;

    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phone)) {

        showError("Please enter a valid 10-digit mobile number.");
        return false;

    }

    return {

        fullName,
        email,
        phone,
        service,
        budget: budget || "Not Specified",
        projectDetails

    };

}

/*==================================================
BUTTON LOADING
==================================================*/

function setLoading(state) {

    if (state) {

        submitButton.disabled = true;
        submitButton.innerHTML = "Sending...";

    } else {

        submitButton.disabled = false;
        submitButton.innerHTML = "Submit Enquiry";

    }

}

/*==================================================
TELEGRAM MESSAGE
==================================================*/

function buildTelegramMessage(data) {

    return `
📩 <b>New Project Enquiry</b>

👤 <b>Name:</b> ${data.fullName}

📧 <b>Email:</b> ${data.email}

📱 <b>Phone:</b> ${data.phone}

🛠 <b>Service:</b> ${data.service}

💰 <b>Budget:</b> ${data.budget}

📝 <b>Project Details:</b>
${data.projectDetails}

🌐 <b>Source:</b> Noctis Technologies Website
`;

}
/*==================================================
FORM SUBMIT
==================================================*/

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    hideMessages();

    if (!canSubmit()) {

        showError(
            "You have already submitted an enquiry recently. Please try again after 24 hours."
        );

        return;

    }

    const data = validateForm();

    if (!data) return;

    setLoading(true);

    try {

        const response = await fetch(TELEGRAM_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                chat_id: CHAT_ID,

                text: buildTelegramMessage(data),

                parse_mode: "HTML"

            })

        });

        const result = await response.json();

        if (!response.ok || !result.ok) {

            throw new Error(result.description || "Telegram API Error");

        }

        saveSubmitTime();

        form.reset();

        showSuccess(
            "✅ Your enquiry has been submitted successfully. Our team will contact you soon."
        );

    } catch (error) {

        console.error("Telegram Error:", error);

        showError(
            "❌ Unable to send your enquiry. Please try again later."
        );

    } finally {

        setLoading(false);

    }

});
  /*==================================================
AUTO HIDE SUCCESS MESSAGE
==================================================*/

const observer = new MutationObserver(() => {

    if (successBox.classList.contains("active")) {

        setTimeout(() => {
            successBox.classList.remove("active");
        }, 8000);

    }

});

observer.observe(successBox, {
    attributes: true,
    attributeFilter: ["class"]
});

/*==================================================
INPUT FOCUS EFFECT
==================================================*/

document.querySelectorAll(".form-control").forEach(input => {

    input.addEventListener("focus", () => {
        input.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", () => {
        input.parentElement.classList.remove("focused");
    });

});

/*==================================================
FAQ ACCORDION
==================================================*/

document.querySelectorAll(".faq-item").forEach(item => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) return;

    question.addEventListener("click", () => {

        const active = item.classList.contains("active");

        document.querySelectorAll(".faq-item").forEach(faq => {

            faq.classList.remove("active");

            const content = faq.querySelector(".faq-answer");

            if (content) {
                content.style.maxHeight = null;
            }

        });

        if (!active) {

            item.classList.add("active");
            answer.style.maxHeight = answer.scrollHeight + "px";

        }

    });

});

/*==================================================
END
==================================================*/

});