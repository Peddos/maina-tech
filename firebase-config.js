// Package links configuration
const packageLinks = {
  geography: {
    'lesson-plans': 'YOUR_GOOGLE_DRIVE_LINK_FOR_GEOGRAPHY_LESSONS',
    'teaching-aids': 'YOUR_GOOGLE_DRIVE_LINK_FOR_GEOGRAPHY_AIDS',
    'assessments': 'YOUR_GOOGLE_DRIVE_LINK_FOR_GEOGRAPHY_ASSESSMENTS'
  },
  mathematics: {
    'lesson-plans': 'YOUR_GOOGLE_DRIVE_LINK_FOR_MATH_LESSONS',
    'teaching-aids': 'YOUR_GOOGLE_DRIVE_LINK_FOR_MATH_AIDS',
    'assessments': 'YOUR_GOOGLE_DRIVE_LINK_FOR_MATH_ASSESSMENTS'
  },
  science: {
    'lesson-plans': 'YOUR_GOOGLE_DRIVE_LINK_FOR_SCIENCE_LESSONS',
    'teaching-aids': 'YOUR_GOOGLE_DRIVE_LINK_FOR_SCIENCE_AIDS',
    'assessments': 'YOUR_GOOGLE_DRIVE_LINK_FOR_SCIENCE_ASSESSMENTS'
  },
  language: {
    'lesson-plans': 'YOUR_GOOGLE_DRIVE_LINK_FOR_LANGUAGE_LESSONS',
    'teaching-aids': 'YOUR_GOOGLE_DRIVE_LINK_FOR_LANGUAGE_AIDS',
    'assessments': 'YOUR_GOOGLE_DRIVE_LINK_FOR_LANGUAGE_ASSESSMENTS'
  }
};

// Function to check if user has access to a package
function checkPackageAccess(userId, packageName) {
  // Get access info from localStorage
  const accessData = JSON.parse(localStorage.getItem('packageAccess') || '{}');
  const packageAccess = accessData[packageName];
  
  if (!packageAccess) return false;
  
  // Check if access has expired
  const expiryDate = new Date(packageAccess.expiryDate);
  const now = new Date();
  
  return now < expiryDate;
}

// Function to get download URL for a file
function getDownloadUrl(packageName, fileType) {
  if (!packageLinks[packageName] || !packageLinks[packageName][fileType]) {
    console.error('Link not found for:', packageName, fileType);
    return null;
  }
  return packageLinks[packageName][fileType];
}

// Function to handle package purchase
function handlePackagePurchase(userId, packageName) {
  try {
    // Set access data in localStorage
    const accessData = JSON.parse(localStorage.getItem('packageAccess') || '{}');
    
    // Set 30 days access
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);
    
    accessData[packageName] = {
      active: true,
      purchaseDate: new Date().toISOString(),
      expiryDate: expiryDate.toISOString()
    };
    
    localStorage.setItem('packageAccess', JSON.stringify(accessData));
    return true;
  } catch (error) {
    console.error('Error handling purchase:', error);
    return false;
  }
} 