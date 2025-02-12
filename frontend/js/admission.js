document.getElementById("admissionForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let country = document.getElementById("country").value.trim();
    
    let emailRegex = /^\S+@\S+\.\S+$/;
    let phoneRegex = /^[0-9]{10}$/;

    
    if (!name || !email || !phone || !country) {
        alert("All fields are required!");
        return;
    }


    if (!emailRegex.test(email)) {
        alert("Enter a valid email!");
        return;
    } 
    if (!phoneRegex.test(phone)) {
        alert("Enter a valid 10-digit phone number!");
        return;
    }

   
    let response = await fetch("http://localhost:5000/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, country })
    });

    let result = await response.json();
    alert(result.message);
});
