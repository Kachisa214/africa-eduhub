<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Educational Resources Search</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #f5f7fa;
            color: #333;
            line-height: 1.6;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        header {
            text-align: center;
            margin-bottom: 40px;
            padding: 20px 0;
            background: linear-gradient(135deg, #4b6cb7 0%, #182848 100%);
            color: white;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        
        .search-section {
            display: flex;
            justify-content: center;
            margin-bottom: 30px;
        }
        
        .search-container {
            display: flex;
            width: 80%;
            max-width: 600px;
        }
        
        #searchInput {
            flex: 1;
            padding: 15px;
            border: 2px solid #ddd;
            border-radius: 8px 0 0 8px;
            font-size: 16px;
            outline: none;
            transition: border-color 0.3s;
        }
        
        #searchInput:focus {
            border-color: #4b6cb7;
        }
        
        #searchButton {
            padding: 15px 25px;
            background-color: #4b6cb7;
            color: white;
            border: none;
            border-radius: 0 8px 8px 0;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            transition: background-color 0.3s;
        }
        
        #searchButton:hover {
            background-color: #3a559d;
        }
        
        .subject-tags {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
            margin-bottom: 30px;
        }
        
        .subject-tag-button {
            padding: 10px 20px;
            background-color: #e9ecef;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s;
        }
        
        .subject-tag-button:hover {
            background-color: #d1d7dc;
        }
        
        .subject-tag-button.active {
            background-color: #4b6cb7;
            color: white;
        }
        
        .resources-section {
            margin-bottom: 40px;
        }
        
        .section-title {
            font-size: 1.8rem;
            margin-bottom: 20px;
            color: #2c3e50;
            border-bottom: 2px solid #4b6cb7;
            padding-bottom: 10px;
        }
        
        .resources-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 25px;
        }
        
        .resource-card {
            background-color: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .resource-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        
        .resource-card-content {
            padding: 20px;
        }
        
        .resource-card h3 {
            font-size: 1.3rem;
            margin-bottom: 10px;
            color: #2c3e50;
        }
        
        .resource-card p {
            color: #666;
            margin-bottom: 15px;
            font-size: 0.95rem;
        }
        
        .resource-card .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 15px;
        }
        
        .resource-card .tag {
            background-color: #e9ecef;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            color: #495057;
        }
        
        .resource-card a {
            display: inline-block;
            background-color: #4b6cb7;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            transition: background-color 0.3s;
        }
        
        .resource-card a:hover {
            background-color: #3a559d;
        }
        
        .no-results {
            text-align: center;
            padding: 40px;
            font-size: 1.2rem;
            color: #666;
            grid-column: 1 / -1;
        }
        
        footer {
            text-align: center;
            padding: 20px;
            margin-top: 40px;
            color: #666;
            border-top: 1px solid #ddd;
        }
        
        @media (max-width: 768px) {
            .search-container {
                width: 100%;
            }
            
            .resources-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Educational Resources</h1>
            <p>Find the best learning materials for your needs</p>
        </header>
        
        <div class="search-section">
            <div class="search-container">
                <input type="text" id="searchInput" placeholder="Search for subjects, topics, or keywords...">
                <button id="searchButton">Search</button>
            </div>
        </div>
        
        <div class="subject-tags" id="subjectTags">
            <!-- Subject tags will be generated here -->
        </div>
        
        <section class="resources-section">
            <h2 class="section-title">Featured Resources</h2>
            <div class="resources-grid" id="featuredResources">
                <!-- Featured resources will be displayed here -->
            </div>
        </section>
        
        <section class="resources-section">
            <h2 class="section-title">All Resources</h2>
            <div class="resources-grid" id="allResources">
                <!-- All resources will be displayed here -->
            </div>
        </section>
        
        <footer>
            <p>© 2023 Educational Resources Search | Designed for learning</p>
        </footer>
    </div>

    <script>
        // Sample Educational Resources Data
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

        // --- Functions to display resources ---

        // Function to create an individual resource card HTML
        function createResourceCard(resource) {
            const card = document.createElement('div');
            card.classList.add('resource-card');
            card.setAttribute('data-category', resource.category);
            card.setAttribute('data-tags', resource.tags.join(',').toLowerCase());

            const tagsHtml = resource.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

            card.innerHTML = `
                <div class="resource-card-content">
                    <h3>${resource.title}</h3>
                    <p>${resource.description}</p>
                    <div class="tags">
                        <span class="tag">${resource.category}</span>
                        <span class="tag">${resource.level}</span>
                    </div>
                    <div class="tags">${tagsHtml}</div>
                    <a href="${resource.url}" target="_blank" rel="noopener noreferrer">Access Resource</a>
                </div>
            `;
            return card;
        }

        // Function to render resources into a container
        function renderResources(container, resourceList) {
            container.innerHTML = ''; // Clear existing content
            if (resourceList.length === 0) {
                container.innerHTML = '<div class="no-results">No resources found matching your criteria.</div>';
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
                button.setAttribute('data-category', category);

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
            allButton.classList.add('subject-tag-button', 'active');
            allButton.textContent = 'All';
            allButton.addEventListener('click', () => {
                document.querySelectorAll('.subject-tag-button').forEach(btn => btn.classList.remove('active'));
                allButton.classList.add('active');
                renderResources(allResourcesContainer, resources);
                searchInput.value = '';
            });
            subjectTagsContainer.prepend(allButton);
        }

        // --- Filtering and Search Functions ---

        // Function to filter resources by category
        function filterResourcesByCategory(category) {
            const filtered = resources.filter(res => res.category === category);
            renderResources(allResourcesContainer, filtered);
            searchInput.value = '';
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
    </script>
</body>
</html>
