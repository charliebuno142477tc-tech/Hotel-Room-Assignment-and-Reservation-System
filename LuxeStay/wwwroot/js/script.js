
document.addEventListener("DOMContentLoaded", () => {

    // Get HTML elements
    const loginTab = document.getElementById("loginTab");
    const signupTab = document.getElementById("signupTab");
    const tabIndicator = document.getElementById("tabIndicator");

    const authForm = document.getElementById("authForm");

    const formTitle = document.getElementById("formTitle");
    const formSubtitle = document.getElementById("formSubtitle");
    const welcomeLabel = document.getElementById("welcomeLabel");

    const nameGroup = document.getElementById("nameGroup");
    const confirmGroup = document.getElementById("confirmGroup");

    const loginOptions = document.getElementById("loginOptions");
    const signupOptions = document.getElementById("signupOptions");

    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    const togglePassword = document.getElementById("togglePassword");
    const submitText = document.getElementById("submitText");

    const switchPrompt = document.getElementById("switchPrompt");
    const formMessage = document.getElementById("formMessage");

    let currentMode = "login";

    // Switch between login and signup
    function switchMode(mode) {

        currentMode = mode;

        authForm.reset();

        formMessage.textContent = "";
        formMessage.className = "form-message";

        if (mode === "signup") {

            loginTab.classList.remove("active");
            signupTab.classList.add("active");

            tabIndicator.classList.add("signup");

            formTitle.textContent = "Create your account";
            formSubtitle.textContent = "Join LuxeStay and start your journey.";
            welcomeLabel.textContent = "GET STARTED WITH LUXESTAY";

            nameGroup.classList.remove("hidden");
            confirmGroup.classList.remove("hidden");

            loginOptions.classList.add("hidden");
            signupOptions.classList.remove("hidden");

            document.getElementById("fullName").required = true;
            confirmPassword.required = true;

            submitText.textContent = "Create Account";

            switchPrompt.innerHTML =
                'Already have an account? <a href="#" id="switchLink">Sign in</a>';

        } else {

            signupTab.classList.remove("active");
            loginTab.classList.add("active");

            tabIndicator.classList.remove("signup");

            formTitle.textContent = "Sign in to your account";
            formSubtitle.textContent = "Enter your details to access your account.";
            welcomeLabel.textContent = "WELCOME BACK";

            nameGroup.classList.add("hidden");
            confirmGroup.classList.add("hidden");

            loginOptions.classList.remove("hidden");
            signupOptions.classList.add("hidden");

            document.getElementById("fullName").required = false;
            confirmPassword.required = false;

            submitText.textContent = "Sign In";

            switchPrompt.innerHTML =
                'Don\'t have an account? <a href="#" id="switchLink">Create account</a>';
        }

        document.getElementById("password").type = "password";
        confirmPassword.type = "password";

        togglePassword.innerHTML = '<i class="fa-regular fa-eye"></i>';
    }

    // Tab buttons
    loginTab.addEventListener("click", () => switchMode("login"));
    signupTab.addEventListener("click", () => switchMode("signup"));

    // Switch link below the form
    switchPrompt.addEventListener("click", (event) => {

        if (event.target.id === "switchLink") {

            event.preventDefault();

            switchMode(
                currentMode === "login" ? "signup" : "login"
            );
        }
    });

    // Show and hide password
    togglePassword.addEventListener("click", () => {

        const isHidden = password.type === "password";

        password.type = isHidden ? "text" : "password";

        confirmPassword.type = isHidden ? "text" : "password";

        togglePassword.innerHTML = isHidden
            ? '<i class="fa-regular fa-eye-slash"></i>'
            : '<i class="fa-regular fa-eye"></i>';
    });

    // Form submission
    authForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const passwordValue = password.value;

        if (currentMode === "signup") {

            const fullName = document.getElementById("fullName").value.trim();

            if (passwordValue.length < 8) {
                showMessage("Password must contain at least 8 characters.", "error");
                return;
            }

            if (passwordValue !== confirmPassword.value) {
                showMessage("Your passwords do not match.", "error");
                return;
            }

            if (!document.getElementById("agreeTerms").checked) {
                showMessage("Please accept the Terms and Conditions.", "error");
                return;
            }

            showMessage(
                "Registration form validated! Authentication will be connected in the next part.",
                "success"
            );

            console.log("Signup details:", {
                fullName,
                email
            });

        } else {

            showMessage(
                "Login UI validated! Real account authentication will be added in the next part.",
                "success"
            );

            console.log("Login attempt:", email);
        }

    });

    // Display messages
    function showMessage(message, type) {

        formMessage.textContent = message;
        formMessage.className = "form-message " + type;
    }

    // Forgot password
    document.getElementById("forgotPassword").addEventListener("click", (event) => {

        event.preventDefault();

        showMessage(
            "Password recovery will be available when authentication is connected.",
            "error"
        );
    });

    // Social login placeholders
    document.getElementById("googleBtn").addEventListener("click", () => {

        showMessage(
            "Google authentication will be integrated in a later part.",
            "error"
        );
    });

    document.getElementById("facebookBtn").addEventListener("click", () => {

        showMessage(
            "Facebook authentication will be integrated in a later part.",
            "error"
        );
    });

});