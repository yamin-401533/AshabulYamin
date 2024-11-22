document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // Mobile menu toggle
    // const menuToggle = document.querySelector('.menu-toggle');
    // const navMenu = document.querySelector('nav ul');
    // menuToggle.addEventListener('click', () => {
    //     navMenu.classList.toggle('show');
    // });

    document.addEventListener('DOMContentLoaded', function() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('nav ul');

        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    });


    // Sticky header
    const header = document.querySelector('header');
    const heroSection = document.querySelector('#hero');
    window.addEventListener('scroll', () => {
        if (window.scrollY > heroSection.offsetHeight - header.offsetHeight) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Typewriter effect for hero section
    const typewriter = document.querySelector('.typewriter');
    if (typewriter) {
        new Typewriter(typewriter, {
            strings: ['Competitive Programmer', 'Frontend Developer', 'Graphic Designer'],
            autoStart: true,
            loop: true,
            delay: 35
        });
    }

    // Skill progress animation
    const skillItems = document.querySelectorAll('.skill-item');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    skillItems.forEach(item => {
        observer.observe(item);
    });

    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    document.querySelectorAll('.play-button').forEach(button => {
            button.addEventListener('click', function() {
                const card = this.closest('.project-card');
                const video = card.querySelector('.video-player');
                const image = card.querySelector('.project-image');
                
                if (video.style.display === 'none') {
                    video.style.display = 'block';
                    image.style.backgroundImage = 'none';
                    video.play();
                } else {
                    video.style.display = 'none';
                    image.style.backgroundImage = image.getAttribute('data-bg');
                    video.pause();
                }
            });
        });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Here you would typically send the form data to a server
        // For demonstration, we'll just log it to the console
        const formData = new FormData(contactForm);
        console.log('Form submitted with data:', Object.fromEntries(formData));
        
        // Show a success message (you can replace this with a more user-friendly notification)
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });

    // Generate dynamic star background
    generateStars();
});

function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetPosition = document.querySelector(targetId).offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;
    
    window.requestAnimationFrame(step);

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
        if (progress < duration) window.requestAnimationFrame(step);
    }
}

// Easing function
function easeInOutCubic(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t*t + b;
    t -= 2;
    return c/2*(t*t*t + 2) + b;
}

function generateStars() {
    const starsContainer = document.body;
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        starsContainer.appendChild(star);
    }
}




document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    const showcaseImage = document.querySelector('.showcase-image');
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');

    let currentIndex = 0;
    const projectImages = [
        'image/chat_app.png',
        'image/cgpa_calculator.png',
        'image/bus_m_s.png',
        'image/bus_m_s_2.png',
        'image/bus_m_s_3.png',
        'image/b_m.png',
        'image/am_2.png',
        'image/am.png',
        'image/am_3.png'
    ];

    function updateShowcaseImage(direction = 'next') {
        showcaseImage.style.opacity = '0';
        showcaseImage.style.transform = direction === 'next' ? 'translateX(50%)' : 'translateX(-50%)';

        setTimeout(() => {
            showcaseImage.style.backgroundImage = `url(${projectImages[currentIndex]})`;
            showcaseImage.style.opacity = '1';
            showcaseImage.style.transform = 'translateX(0)';
        });
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % projectImages.length;
        updateShowcaseImage('next');
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + projectImages.length) % projectImages.length;
        updateShowcaseImage('prev');
    }

    let intervalId;

    function startAutoPlay() {
        clearInterval(intervalId);
        intervalId = setInterval(nextImage, 3000); // Change image every 15 seconds
    }

    function handleManualNavigation() {
        clearInterval(intervalId);
        setTimeout(startAutoPlay, 3000); // Resume auto-play after 15 seconds
    }

    nextButton.addEventListener('click', () => {
        nextImage();
        handleManualNavigation();
    });

    prevButton.addEventListener('click', () => {
        prevImage();
        handleManualNavigation();
    });

    projectCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentIndex = index;
            updateShowcaseImage();
            handleManualNavigation();
        });
    });

    // Initial showcase image and start auto-play
    updateShowcaseImage();
    startAutoPlay();
    

    

    projectCards.forEach(function(projectCard) {
    var projectImage = projectCard.querySelector('.project-image');
    var videoPlayer = projectCard.querySelector('.video-player');
    var playButton = projectCard.querySelector('.play-button');

    if (playButton && videoPlayer) {
        playButton.addEventListener('click', function() {
            videoPlayer.style.display = 'block';
            projectImage.style.backgroundImage = 'none';
            playButton.style.display = 'none';
            videoPlayer.play();
        });

        videoPlayer.addEventListener('ended', function() {
            this.style.display = 'none';
            var projectType = projectCard.dataset.project;
            var backgroundImage;
            
            switch(projectType) {
                case 'chat-app':
                    backgroundImage = 'url("image/chat_app.png")';
                    break;
                case 'cgpa-calc':
                    backgroundImage = 'url("image/cgpa_calculator.png")';
                    break;
                case 'amazon':
                    backgroundImage = 'url("image/am.png")';
                    break;
                default:
                    backgroundImage = '';
            }
            
            projectImage.style.backgroundImage = backgroundImage;
            playButton.style.display = 'block';
        });
    }
});

 // Dark mode toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });


const list = document.querySelectorAll('.navigation ul li');
        const indicator = document.querySelector('.indicator');

        function activeLink() {
            list.forEach((item) => item.classList.remove('active'));
            this.classList.add('active');
            
            // Add a subtle animation to the indicator
            indicator.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
            
            // Reset the animation after it completes
            setTimeout(() => {
                indicator.style.transition = 'transform 0.5s';
            }, 300);
        }

        list.forEach((item) => item.addEventListener('click', activeLink));

        // Add hover effect
        list.forEach((item) => {
            item.addEventListener('mouseenter', () => {
                if (!item.classList.contains('active')) {
                    item.style.transform = 'translateY(-5px)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                if (!item.classList.contains('active')) {
                    item.style.transform = 'translateY(0)';
                }
            });
        });


        document.querySelector('.toggle').onclick = function() {
        this.parentNode.classList.toggle('active');
        }

//cube:
// Three.js setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('cube-canvas'), alpha: true });
        renderer.setSize(260, 260); // Adjust size to match the canvas
        renderer.setClearColor( 0x000000, 0 ); // Make background transparent

        // Create a cube
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0xFF8C00, wireframe: true });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 2;

        // Animation
        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();
    

//background cube
function createCube() {
            const cube = document.createElement('div');
            cube.className = 'cube';
            for (let i = 0; i < 14; i++) {
                const edge = document.createElement('div');
                edge.className = 'edge';
                cube.appendChild(edge);
            }
            cube.style.left = `${Math.random() * 100}vw`;
            cube.style.top = `${Math.random() * 100}vh`;
            cube.style.animationDuration = `${15 + Math.random() * 15}s`;
            document.body.appendChild(cube);
        }

        for (let i = 0; i < 40; i++) {
            createCube();
        }

// Menu Toggle Functionality
        const menuToggle = document.querySelector('.menu-toggle');
        const navigation = document.querySelector('.navigation');
        const overlay = document.querySelector('.overlay');
        const menuIcon = menuToggle.querySelector('i');

        function toggleMenu() {
            navigation.classList.toggle('active');
            overlay.classList.toggle('active');
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-times');
        }

        menuToggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        // Handle navigation items
        const navLinks = document.querySelectorAll('.navigation li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Remove active class from all links
                navLinks.forEach(l => l.parentElement.classList.remove('active'));
                // Add active class to clicked link
                link.parentElement.classList.add('active');
                // Close menu on mobile
                if (window.innerWidth <= 968) {
                    toggleMenu();
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navigation.contains(e.target) && 
                !menuToggle.contains(e.target) && 
                navigation.classList.contains('active')) {
                toggleMenu();
            }
        });


});