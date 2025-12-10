// Load XML file and populate thumbnails 
fetch("get_images.php") 
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => { 
        console.log('XML data:', data); // Debug log
        let parser = new DOMParser(); 
        let xml = parser.parseFromString(data, "text/xml"); 
 
        let gallery = document.getElementById("gallery"); 
        let images = xml.getElementsByTagName("image"); 
        console.log('Number of images:', images.length); // Debug log
 
        // Loop through XML and create image elements 
        for (let i = 0; i < images.length; i++) { 
            let thumbnail = images[i].getElementsByTagName("thumbnail")[0].textContent; 
            let background = images[i].getElementsByTagName("background")[0].textContent; 
            let description = images[i].getElementsByTagName("description")[0].textContent; 
 
            let img = document.createElement("img"); 
            img.src = thumbnail; 
            img.alt = description; 
            img.title = description; 
 
            // Change body background on mouse hover 
            img.addEventListener("mouseover", () => { 
                document.body.style.backgroundImage = `url('${background}')`; 
            }); 
 
            // Change body background on click 
            img.addEventListener("click", () => { 
                document.body.style.backgroundImage = `url('${background}')`; 
            }); 
 
            gallery.appendChild(img); 
        } 
    })
    .catch(error => {
        console.error('Error fetching XML:', error);
    }); 
