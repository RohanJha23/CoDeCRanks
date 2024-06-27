const handles = ["RohanJha23", "namananand2003", "smfaizalam786"]; // Replace with actual handles
const baseUrl = "https://codeforces.com/api/user.info?handles=";
const handlesString = handles.join(";"); // Join handles with a semicolon

const url = `${baseUrl}${handlesString}`;

const fetchDataAndSort = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Extract ratings and sort by them
    const sortedData = data.result.sort((a, b) => {
      const ratingA = a.rating || 0; // Handle users with no rating
      const ratingB = b.rating || 0;
      return ratingB - ratingA; // Sort descending by rating
    });

    // Display sorted data on website
    displaySortedData(sortedData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const displaySortedData = (sortedData) => {
  const userListElement = document.getElementById('user-list'); // Replace with actual HTML element ID
  userListElement.innerHTML = ''; // Clear previous data

  sortedData.forEach(user => {
    const listItem = document.createElement('li');
    const profileLink = `<a href="https://codeforces.com/profile/${user.handle}" target="_blank">${user.handle}</a>`;
    listItem.innerHTML = `${profileLink}: ${user.rating || 'Unrated'}`; // Display handle and rating with link
    userListElement.appendChild(listItem);
  });
};

fetchDataAndSort();
