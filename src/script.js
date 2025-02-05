document.getElementById("crmForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let formData = {
        businessName: document.getElementById("businessName").value,
        ownerName: document.getElementById("ownerName").value,
        contactNumber: document.getElementById("contactNumber").value,
        whatsappNumber: document.getElementById("whatsappNumber").value || document.getElementById("contactNumber").value,
        place: document.getElementById("place").value,
        status: document.getElementById("status").value,
    };

    try {
        const response = await fetch("/.netlify/functions/submitForm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (response.ok) {
            document.getElementById("responseMessage").innerHTML = `<span class='text-green-600'>${result.message}</span>`;
            document.getElementById("crmForm").reset();
        } else {
            document.getElementById("responseMessage").innerHTML = `<span class='text-red-600'>${result.error}</span>`;
        }
    } catch (error) {
        document.getElementById("responseMessage").innerHTML = "<span class='text-red-600'>Failed to connect!</span>";
        console.error("Error:", error);
    }
});
