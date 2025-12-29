import { data } from "@ampt/data";

async function checkData() {
  try {
    console.log("Fetching all data keys...");
    
    // Get all data
    const allData = await data.scan({});
    
    console.log(`\nFound ${allData.items.length} items in environment:`);
    
    allData.items.forEach(item => {
      console.log(`\nKey: ${item.key}`);
      console.log(`Created: ${item.created}`);
      console.log(`Modified: ${item.modified || 'N/A'}`);
      if (item.value) {
        console.log(`Value keys: ${Object.keys(item.value).join(', ')}`);
      }
    });
    
    // Check specifically for project data
    const projects = allData.items.filter(item => item.key.startsWith('project:'));
    console.log(`\n\nProjects found: ${projects.length}`);
    projects.forEach(p => console.log(`  - ${p.key}`));
    
    // Check for about data
    const about = await data.get('about:main');
    console.log(`\n\nAbout data exists: ${about ? 'YES' : 'NO'}`);
    if (about) {
      console.log(`About keys: ${Object.keys(about).join(', ')}`);
    }
    
  } catch (error) {
    console.error("Error checking data:", error);
  }
}

checkData();

