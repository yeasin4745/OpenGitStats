
let image = document.getElementById('image')
let error = document.getElementById('error')
let name = document.getElementById('name')
let bio = document.getElementById('bio')
let list = document.getElementById('list');
let details = document.getElementById('details')

// Function to fetch user data from GitHub API
async function loadData(username) {
 try {
  let data = await fetch(`https://api.github.com/users/${username}`)
  if (!data.ok) {
   throw new Error('User not found or network error')
  }
  let response = await data.json()
  return response;
 } catch (e) {
  error.innerHTML = e?.message;
  return null;
 }
}

// Setting up event listeners for the search button
let sendButton = document.getElementById('button');
sendButton.addEventListener('click', getData)

// Adding keyboard support for better accessibility
document.getElementById('username').addEventListener('keypress', (e) => {
 if (e.key === 'Enter') {
  getData()
 }
})

// Main function to get and display user data
async function getData() {
 let username = document.querySelector('#username').value.trim()
 
 if (!username) {
  error.style.display = 'block'
  error.innerHTML = 'Please enter a username'
  return;
 }
 
 // Show loading state
 error.style.display = 'block'
 error.innerHTML = ''
 
 let response = await loadData(username);
 
 // Hide loading and handle response
 error.style.display = 'none'
 
 if (!response) {
  error.style.display = 'block'
  return;
 }
 
 // Display user information with better data handling
 image.style.display = 'block'
 details.style.display = 'block'
 
 image.src = response?.avatar_url || '';
 name.innerHTML = response?.name || response?.login || 'Name not available';
 bio.innerHTML = response?.bio || 'No bio available';
 
 // Populate detailed information with proper formatting
 list.querySelector('#id').innerHTML = `User ID: ${response?.id || 'N/A'}`
 list.querySelector('#location').innerHTML = `Location: ${response?.location || 'Not specified'}`;
 list.querySelector('#followers').innerHTML = `Followers: ${response?.followers || 0}`;
 list.querySelector('#following').innerHTML = `Following: ${response?.following || 0}`
 list.querySelector('#repo').innerHTML = `Public Repositories: ${response?.public_repos || 0}`
 
 // Format the creation date for better readability
 let createdDate = response?.created_at ? new Date(response.created_at).toLocaleDateString() : 'Unknown'
 list.querySelector('#create').innerHTML = `Profile Created: ${createdDate}`
}

// Function to load user repositories
async function loadRepository() {
 let username = document.querySelector('#username').value.trim();
 
 try {
  let data = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
  if (!data.ok) {
   throw new Error('Could not fetch repositories')
  }
  let response = await data.json();
  return response;
 } catch (e) {
  console.error('Error loading repositories:', e)
  return [];
 }
}

// Function to load and display additional repository data
async function loadMoreData() {
 console.log('Loading repositories...');
 
 let section = document.getElementById('repository')
 
 // Clear existing repository data to prevent duplication
 section.innerHTML = '';
 
 let repository = await loadRepository();
 let fragment = document.createDocumentFragment();
 
 if (repository.length !== 0) {
  repository.forEach((repo) => {
   console.log(repo)
   let div = document.createElement('div')
   let h3 = document.createElement('h3')
   let p = document.createElement('p')
   
   div.setAttribute('class', 'repo')
   
   h3.innerHTML = repo.name || 'Unnamed Repository';
   p.innerHTML = repo?.description || 'No description available';
    
   div.appendChild(h3) 
   div.appendChild(p)
   fragment.appendChild(div)
  })
 } else {
  let div = document.createElement('div')
  div.className = 'repo'
  div.innerHTML = '<h3>No Repositories Found</h3><p>This user has no public repositories.</p>'
  fragment.appendChild(div)
 }
 
 section.appendChild(fragment);
}
