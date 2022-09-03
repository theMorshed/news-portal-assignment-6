// get category container and progress bar container using dom
const categoriesContainer = document.getElementById('category-menu');
const progressBar = document.getElementById('progress-bar');

// load home page by default
const loadHomepageNews = async () => {
    // loader add
    progressBar.classList.remove('hidden');
    const categoryNews = await loadSingleCategory('05');
    const newsArray = categoryNews.data;
    // sort news array descending order according to view count
    newsArray.sort((a, b) => {
        return b.total_view - a.total_view;
    });
    // display all news in UI
    displayAllNews(newsArray);
    displayNewsCount(newsArray.length, "Entertainment");

    // loader remove
    progressBar.classList.add('hidden');
}

loadHomepageNews();

// add event listener in the all category menu
categoriesContainer.addEventListener('click', async (event) => {
    // loader added
    progressBar.classList.remove('hidden');
    // get all categories
    const allCategories = await loadAllCategories();
    const categoriesArray = allCategories.data.news_category;
    // get category value from UI
    const categoryValue = event.target.innerText;
    let categoryId;
    // loop throug all categories of api and compare with UI after click
    categoriesArray.forEach(category => {
        if (category.category_name.toLowerCase() === categoryValue.toLowerCase()) {
            categoryId = category.category_id;
        }
    });
    // get all category news by their id
    const categoryNews = await loadSingleCategory(categoryId);
    const newsArray = categoryNews.data;
    // sort all news descending order according to view count
    newsArray.sort((a, b) => {
        return b.total_view - a.total_view;
    });
    // display all matched news and their count in UI
    displayAllNews(newsArray);
    displayNewsCount(newsArray.length, categoryValue);
    
    // loader remove
    progressBar.classList.add('hidden');
})