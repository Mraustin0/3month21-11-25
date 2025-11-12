const scrollButtons = document.querySelectorAll("[data-scroll-to]");
const letterModal = document.querySelector(".letter-modal");
const openLetterBtn = document.getElementById("open-letter");
const closeTargets = document.querySelectorAll("[data-close]");

scrollButtons.forEach((button) => {
  const targetSelector = button.getAttribute("data-scroll-to");
  button.addEventListener("click", () => {
    const target = document.querySelector(targetSelector);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
});

const openLetter = () => {
  letterModal?.classList.add("active");
  document.body.style.overflow = "hidden";
};

const closeLetter = () => {
  letterModal?.classList.remove("active");
  document.body.style.overflow = "";
};

openLetterBtn?.addEventListener("click", () => {
  openLetter();
});

closeTargets.forEach((target) => {
  target.addEventListener("click", () => {
    closeLetter();
  });
});

letterModal?.addEventListener("click", (event) => {
  if (event.target === letterModal) {
    closeLetter();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && letterModal?.classList.contains("active")) {
    closeLetter();
  }
});

