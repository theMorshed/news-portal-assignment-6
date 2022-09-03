const categoriesContainer = document.getElementById('category-menu');
const progressBar = document.getElementById('progress-bar');

categoriesContainer.addEventListener('click', async (event) => {
    progressBar.classList.remove('hidden');
    const allCategories = await loadAllCategories();
    const categoriesArray = allCategories.data.news_category;
    const categoryValue = event.target.innerText;
    let categoryId;
    categoriesArray.forEach(category => {
        if (category.category_name.toLowerCase() === categoryValue.toLowerCase()) {
            categoryId = category.category_id;
        }
    });
    const categoryNews = await loadSingleCategory(categoryId);
    const newsArray = categoryNews.data;
    newsArray.sort((a, b) => {
        return b.total_view - a.total_view;
    });
    displayAllNews(newsArray);
    displayNewsCount(newsArray.length, categoryValue);

    progressBar.classList.add('hidden');
})