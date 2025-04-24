// Function to open the sidebar
function w3_open() {
    const mainContent = document.getElementById("main");
    const sidebar = document.getElementById("mySidebar");
    const openNav = document.getElementById("openNav");

    mainContent.style.marginLeft = "25%"; // Slide the content to the right
    sidebar.style.width = "25%"; // Expand the sidebar
    sidebar.style.display = "block"; // Show the sidebar
    openNav.style.display = 'none'; // Hide the menu icon
    sidebar.classList.add("open"); // Add the "open" class to the sidebar
}

// Function to close the sidebar
function w3_close() {
    const mainContent = document.getElementById("main");
    const sidebar = document.getElementById("mySidebar");
    const openNav = document.getElementById("openNav");

    mainContent.style.marginLeft = "0%"; // Reset content position
    sidebar.style.display = "none"; // Hide the sidebar
    openNav.style.display = 'inline-block'; // Show the menu icon
    sidebar.classList.remove("open"); // Remove the "open" class to hide the links
}

// Function to update the time and date
function updatePST() {
    const now = new Date();
    const pst = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Manila" }));

    let hours = pst.getHours();
    const minutes = pst.getMinutes().toString().padStart(2, "0");
    const seconds = pst.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    const time = `${hours}:${minutes}:${seconds} ${ampm}`;

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = pst.toLocaleDateString("en-US", options);

    document.getElementById("time").textContent = time;
    document.getElementById("date").textContent = date;
}

updatePST();
setInterval(updatePST, 1000);

// Gallery Update Function
function updateGallery() {
    const selectedYear = document.getElementById("YEAR").value;
    const galleryContainer = document.getElementById("gallery");

    if (!selectedYear || !galleryContainer) {
        console.error('Gallery or YEAR input not found!');
        return;
    }

    galleryContainer.innerHTML = ""; // Clear existing images
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (let i = 0; i < months.length; i += 4) {
        let row = document.createElement("div");
        row.classList.add("gallery-row");

        for (let j = 0; j < 4; j++) {
            if (i + j < months.length) {
                let month = months[i + j];
                let img = document.createElement("img");
                img.src = `../DATA/MAPS_${selectedYear}/${month}_${selectedYear}.jpg`;
                img.alt = `${month} ${selectedYear} Map`;
                img.classList.add("gallery-img");

                img.onclick = function () {
                    openFullImage(img.src);
                };

                row.appendChild(img);
            }
        }

        galleryContainer.appendChild(row);
    }
}

// Function to open image in full screen
function openFullImage(imageSrc) {
    let modal = document.createElement("div");
    modal.classList.add("image-modal");

    let fullImage = document.createElement("img");
    fullImage.src = imageSrc;
    fullImage.classList.add("full-view");

    let closeButton = document.createElement("span");
    closeButton.innerHTML = "&times;";
    closeButton.classList.add("close-button");
    closeButton.onclick = function () {
        document.body.removeChild(modal);
    };

    modal.appendChild(fullImage);
    modal.appendChild(closeButton);
    document.body.appendChild(modal);
}

// Call updateGallery() initially to load default images
try {
    updateGallery();
} catch (e) {
    //console.warn("Gallery update skipped:", e.message);
}


// Event Listener for Collapsible Dropdown
document.addEventListener("DOMContentLoaded", function () {
    let coll = document.querySelector(".collapsible");
    let dropdown = document.querySelector(".year-dropdown");

    if (coll && dropdown) {
        coll.addEventListener("click", function () {
            dropdown.classList.toggle("active");
        });
    }
});
