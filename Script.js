

        async function loadPage(page, el = null) {

            const contentArea =
                document.getElementById("content-area");

            contentArea.innerHTML = `
                <div class="text-center py-5">
                    <div class="spinner-border text-success"></div>
                    <p class="mt-3">Loading...</p>
                </div>
            `;

            try {

                const response =
                    await fetch(`pages/${page}.html`);

                if (!response.ok) {
                    throw new Error(
                        `Cannot load ${page}.html`
                    );
                }

                const html =
                    await response.text();

                contentArea.innerHTML = html;

                document
                    .querySelectorAll(".menu-item")
                    .forEach(item =>
                        item.classList.remove("active")
                    );

                if (el) {
                    el.classList.add("active");
                }

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            } catch (error) {

                contentArea.innerHTML = `
                    <div class="alert alert-danger">
                        Failed to load page:
                        ${page}.html
                    </div>
                `;

                console.error(error);
            }

        }

        document.addEventListener(
            "DOMContentLoaded",
            () => {

                const firstMenu =
                    document.querySelector(
                        ".menu-item.active"
                    );

                loadPage(
                    "dashboard",
                    firstMenu
                );

            }
        );
