const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu");
const themeButton = document.querySelector("#theme-toggle");
const copyButton = document.querySelector("#copy-email");
const copyStatus = document.querySelector("#copy-status");
const focusButtons = document.querySelectorAll("[data-focus]");
const focusOutput = document.querySelector("#focus-output");

const focusMessages = {
    "Front-end": "Agora meu foco principal e Front-end: HTML semantico, CSS responsivo e JavaScript com interacao.",
    Automacao: "Agora meu foco principal e Automacao: transformar tarefas repetitivas em fluxos mais inteligentes.",
    Produto: "Agora meu foco principal e Produto: entender pessoas, problemas e requisitos antes de escrever codigo.",
    Dados: "Agora meu foco principal e Dados: organizar informacoes para apoiar decisoes melhores."
};

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

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

copyButton.addEventListener("click", async () => {
    const email = "bernardoaalvim@gmail.com";

    try {
        await navigator.clipboard.writeText(email);
        copyStatus.textContent = "Email copiado para a area de transferencia.";
    } catch {
        copyStatus.textContent = `Email: ${email}`;
    }
});

focusButtons.forEach((button) => {
    button.addEventListener("click", () => {
        focusButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        focusOutput.textContent = focusMessages[button.dataset.focus];
    });
});
