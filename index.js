document.addEventListener("DOMContentLoaded", () => {
    const allToggleButtons = document.querySelectorAll(".toggle-button");


    const categories = [
        "wonen", "vervoer", "verzekeringen", "huishouden",
        "gezondheid", "verzorging", "vrijetijd", "sparen",
        "boodschappen"
    ];

    // Expand only one category at a time
    allToggleButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.dataset.target;
            const target = document.getElementById(targetId);

            // Hide all others
            document.querySelectorAll(".sub-category").forEach(section => {
                if (section.id !== targetId) {
                    section.style.display = "none";
                }
            });

            // Toggle current one
            target.style.display = target.style.display === "block" ? "none" : "block";
        });
    });

    // Calculate total for each category and display
    function updateCategoryTotal(category) {
        const inputs = document.querySelectorAll(`.${category}-sub`);
        let total = 0;

        inputs.forEach(input => {
            const val = parseFloat(input.value);
            if (!isNaN(val)) total += val;
        });

        const displayEl = document.getElementById(`${category}_total_display`);
        if (displayEl) {
            displayEl.value = `€${total.toFixed(2)}`;
        }
    }

    // Calculate grand total (all expenses) and net budget
    function calculateTotals() {
        let totalUitgaven = 0;

        // Sum all number inputs except inkomsten
        document.querySelectorAll("input[type='number']").forEach(input => {
            if (input.id !== "inkomsten") {
                const val = parseFloat(input.value);
                if (!isNaN(val)) totalUitgaven += val;
            }
        });

        // Get inkomsten value
        const inkomsten = parseFloat(document.getElementById("inkomsten").value) || 0;
        const netto = inkomsten - totalUitgaven;

        // Update the UI
        const grandTotalEl = document.getElementById("grand-total");
        const netTotalEl = document.getElementById("net-total");

        grandTotalEl.textContent = `€${totalUitgaven.toFixed(2)}`;
        netTotalEl.textContent = `€${netto.toFixed(2)}`;

        // Change color if spending exceeds income
        const isOverspending = totalUitgaven > inkomsten;
        const warningColor = "#b00020";
        const normalColor = "#222";

        grandTotalEl.style.color = isOverspending ? warningColor : normalColor;
        netTotalEl.style.color = isOverspending ? warningColor : normalColor;
    }

    document.querySelectorAll("input[type='number']").forEach(input => {
        input.addEventListener("input", () => {
            categories.forEach(updateCategoryTotal); // optional if you're updating category totals
            calculateTotals();
        });
    });
})

