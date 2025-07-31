// Sample Educational Resources Data
// In a real application, this data would likely come from an API or a database.
const resources = [
    {
        id: 'res1',
        title: 'Introduction to Computer Science (CS50)',
        description: 'An introductory course to the intellectual enterprises of computer science and the art of programming.',
        url: 'https://cs50.harvard.edu/x/',
        category: 'Technology',
        level: 'Beginner',
        tags: ['programming', 'computer science', 'algorithms', 'free', 'video lectures', 'Harvard']
    },
    {
        id: 'res2',
        title: 'Khan Academy: Math for all levels',
        description: 'Practice exercises, instructional videos, and a personalized learning dashboard that empower learners to study at their own pace in and outside of the classroom.',
        url: 'https://www.khanacademy.org/',
        category: 'Mathematics',
        level: 'All Levels',
        tags: ['math', 'algebra', 'geometry', 'calculus', 'arithmetic', 'free', 'online course']
    },
    {
        id: 'res3',
        title: 'Coursera: Free Courses Collection',
        description: 'A collection of free courses from top universities and companies covering various subjects.',
        url: 'https://www.coursera.org/courses?query=free',
        category: 'Various',
        level: 'Intermediate',
        tags: ['online course', 'university', 'professional development', 'free']
    },
    {
        id: 'res4',
        title: 'edX: Free Online Courses',
        description: 'Access to high-quality online courses from the world’s best universities and institutions.',
        url: 'https://www.edx.org/free-online-courses',
        category: 'Various',
        level: 'All Levels',
        tags: ['online course', 'university', 'free', 'STEM']
    },
    {
        id: 'res5',
        title: 'Codecademy: Learn to Code for Free',
        description: 'Interactive tutorials and projects to learn programming languages like Python, JavaScript, HTML/CSS, and more.',
        url: 'https://www.codecademy.com/catalog/free',
        category: 'Technology',
        level: 'Beginner',
        tags: ['coding', 'web development', 'python', 'javascript', 'free', 'interactive']
    },
    {
        id: 'res6',
        title: 'African Storybook Initiative',
        description: 'An open-source initiative to provide openly licensed picture storybooks for children in the languages of Africa.',
        url: 'https://africanstorybook.org/',
        category: 'Literacy',
        level: 'Children',
        tags: ['reading', 'children', 'languages', 'storybooks', 'Africa']
    },
    {
        id: 'res7',
        title: 'MIT OpenCourseWare',
        description: 'Free online publication of virtually all MIT course content. OCW is open and available to the world.',
        url: 'https://ocw.mit.edu/',
        category: 'Various',
        level: 'Advanced',
        tags: ['university', 'engineering', 'science', 'mathematics', 'free', 'lectures']
    },
    {
        id: 'res8',
        title: 'W3Schools Online Web Tutorials',
        description: 'The world\'s largest web developer site, with tutorials and references on HTML, CSS, JavaScript, PHP, SQL, and more.',
        url: 'https://www.w3schools.com/',
        category: 'Technology',
        level: 'Beginner',
        tags: ['web development', 'HTML', 'CSS', 'JavaScript', 'free', 'tutorials']
    }
];

// Get DOM elements
const featuredResourcesContainer = document.getElementById('featuredResources');
const allResourcesContainer = document.getElementById('allResources');
const subjectTagsContainer = document.getElementById('subjectTags');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
console.log("Search Input Element:", searchInput);   // Add this line
console.log("Search Button Element:", searchButton); // Add this line

// --- Functions to display resources ---

// Function to create an individual resource card HTML
function createResourceCard(resource) {
    const card = document.createElement('div');
    card.classList.add('resource-card');
    card.setAttribute('data-category', resource.category); // Add data attribute for filtering
    card.setAttribute('data-tags', resource.tags.join(',').toLowerCase()); // Add data attribute for searching

    const tagsHtml = resource.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

    card.innerHTML = `
        <h3>${resource.title}</h3>
        <p>${resource.description}</p>
        <div class="tags">Category: ${resource.category} | Level: ${resource.level}</div>
        <div class="tags">Tags: ${tagsHtml}</div>
        <a href="${resource.url}" target="_blank" rel="noopener noreferrer">Access Resource</a>
    `;
    return card;
}

// Function to render resources into a container
function renderResources(container, resourceList) {
    container.innerHTML = ''; // Clear existing content
    if (resourceList.length === 0) {
        container.innerHTML = '<p>No resources found matching your criteria.</p>';
        return;
    }
    resourceList.forEach(resource => {
        container.appendChild(createResourceCard(resource));
    });
}

// Function to generate and display subject tags
function generateSubjectTags() {
    const allCategories = new Set();
    resources.forEach(res => allCategories.add(res.category));

    subjectTagsContainer.innerHTML = ''; // Clear existing tags
    allCategories.forEach(category => {
        const button = document.createElement('button');
        button.classList.add('subject-tag-button');
        button.textContent = category;
        button.setAttribute('data-category', category); // Store category for filtering

        button.addEventListener('click', () => {
            // Remove active class from all buttons
            document.querySelectorAll('.subject-tag-button').forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            filterResourcesByCategory(category);
        });
        subjectTagsContainer.appendChild(button);
    });

    // Add an "All" button
    const allButton = document.createElement('button');
    allButton.classList.add('subject-tag-button', 'active'); // Active by default
    allButton.textContent = 'All';
    allButton.addEventListener('click', () => {
        document.querySelectorAll('.subject-tag-button').forEach(btn => btn.classList.remove('active'));
        allButton.classList.add('active');
        renderResources(allResourcesContainer, resources); // Show all resources
        searchInput.value = ''; // Clear search input
    });
    subjectTagsContainer.prepend(allButton); // Add "All" button at the beginning
}

// --- Filtering and Search Functions ---

// Function to filter resources by category
function filterResourcesByCategory(category) {
    const filtered = resources.filter(res => res.category === category);
    renderResources(allResourcesContainer, filtered);
    searchInput.value = ''; // Clear search input when filtering by category
}

// Function to handle search
function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let filteredResources = resources;

    if (searchTerm) {
        filteredResources = resources.filter(resource =>
            resource.title.toLowerCase().includes(searchTerm) ||
            resource.description.toLowerCase().includes(searchTerm) ||
            resource.category.toLowerCase().includes(searchTerm) ||
            resource.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }
    renderResources(allResourcesContainer, filteredResources);
    // Remove active class from category buttons when searching
    document.querySelectorAll('.subject-tag-button').forEach(btn => btn.classList.remove('active'));
}

// --- Event Listeners ---

// Search button click
searchButton.addEventListener('click', performSearch);

// Search on Enter key press in input field
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    }
});

// --- Initial Page Load ---
document.addEventListener('DOMContentLoaded', () => {
    // Render some featured resources (e.g., the first 3)
    renderResources(featuredResourcesContainer, resources.slice(0, 3));

    // Render all resources in the main section
    renderResources(allResourcesContainer, resources);

    // Generate and display subject tags
    generateSubjectTags();
});
