const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu");
const themeButton = document.querySelector("#theme-toggle");
const copyButton = document.querySelector("#copy-email");
const copyStatus = document.querySelector("#copy-status");
const focusButtons = document.querySelectorAll("[data-focus]");
const focusOutput = document.querySelector("#focus-output");

const focusMessages = {
    "Front-end": "Agora meu foco principal é Front-end: HTML semântico, CSS responsivo e JavaScript com interação.",
    Automação: "Agora meu foco principal é Automação: transformar tarefas repetitivas em fluxos mais inteligentes.",
    Produto: "Agora meu foco principal é Produto: entender pessoas, problemas e requisitos antes de escrever código.",
    Dados: "Agora meu foco principal é Dados: organizar informações para apoiar decisões melhores."
};

const savedTheme = localStorage.getItem("tema");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (savedTheme === null && prefersDark)) {
    document.body.classList.add("dark");
}

menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        menu.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        menu.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
    }
});

themeButton.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("tema", isDark ? "dark" : "light");
});

copyButton.addEventListener("click", async () => {
    const email = "bernardoaalvim@gmail.com";

    try {
        await navigator.clipboard.writeText(email);
        copyStatus.textContent = "Email copiado para a área de transferência.";
    } catch {
        copyStatus.textContent = `Email: ${email}`;
    }

    setTimeout(() => {
        copyStatus.textContent = "";
    }, 2000);
});

focusButtons.forEach((button) => {
    button.addEventListener("click", () => {
        focusButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        focusOutput.textContent = focusMessages[button.dataset.focus];
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visivel");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".section, .hero").forEach((element) => {
    observer.observe(element);
});
