const categoriesContainer = document.getElementById('category-menu');
categoriesContainer.addEventListener('click', async (event) => {
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
    displayAllNews(newsArray);
})