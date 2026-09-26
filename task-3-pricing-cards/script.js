const billingToggle = document.getElementById("billing-toggle");

const monthlyLabel = document.getElementById("monthly-label");
const yearlyLabel = document.getElementById("yearly-label");

const amounts = document.querySelectorAll(".amount");
const billingNotes = document.querySelectorAll(".billing-note");

billingToggle.addEventListener("change", function () {
  const isYearly = billingToggle.checked;

  amounts.forEach((amount, index) => {
    const monthlyPrice = amount.dataset.monthly;
    const yearlyPrice = amount.dataset.yearly;

    // Update price with animation
    amount.style.opacity = "0";

    setTimeout(() => {
      if (isYearly) {
        amount.textContent = yearlyPrice;
      } else {
        amount.textContent = monthlyPrice;
      }

      amount.style.opacity = "1";
    }, 150);

    // Update billing note
    if (isYearly) {
      billingNotes[index].textContent = "Billed annually";
    } else {
      billingNotes[index].textContent = "Billed monthly";
    }
  });

  // Update billing labels
  monthlyLabel.classList.toggle("active", !isYearly);
  yearlyLabel.classList.toggle("active", isYearly);
});

// Get Started buttons
document.querySelectorAll(".plan-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const planName = this.closest(".pricing-card")
      .querySelector("h2").textContent;

    alert("You selected the " + planName + " plan!");
  });
});