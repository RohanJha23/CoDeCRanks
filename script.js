const handles = ["RohanJha23", "namananand2003", "smfaizalam786","ashish_1203","yashsharda","shivi1104"]; // Replace with actual handles
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
    const row = document.createElement('tr');
    let userRank = user.rank;

// Function to get CSS class based on rank
const getRankClass = (rank) => {
    if (!rank) return ''; // Handle cases where rank is not available

    rank = rank.toLowerCase(); // Convert rank to lowercase for easier comparison

    if (rank.includes('newbie')) {
        return 'rank-newbie'; // Example class for "Newbie"
    } else if (rank.includes('pupil')) {
        return 'rank-pupil'; // Example class for "Pupil"
    } else if (rank.includes('specialist')) {
        return 'rank-specialist'; // Example class for "Specialist"
    } else {
        return ''; // Default class or none
    }
};
const rankClass = getRankClass(userRank);

// Capitalize the first letter of rank
    userRank = userRank.charAt(0).toUpperCase() + userRank.slice(1);
    const userName = `<a href="https://codeforces.com/profile/${user.handle} target="_blank" style="color:black;">${user.handle}</a>`;
    // userRank[0].toUpperCase();
    row.innerHTML = `
        <td>${userName}</td>
        <td>${user.rating || 'Unrated'}</td>
        <td>${user.maxRating || 'N/A'}</td>
        <td>${userRank || 'N/A'}</td>
    `;
    userListElement.appendChild(row);
    row.className = rankClass;
});
};

fetchDataAndSort();
