const loadAllCategories = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const categories = await response.json();
    return categories;
}

const loadSingleCategory = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const category = await response.json();
    return category;
}

const displayAllNews = newsArr => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    newsArr.forEach(news => {
        const { title, details, image_url, total_view, } = news;
        const { name: author_name, img: author_image, published_date: date } = news.author;
        const singleNewsDiv = document.createElement('div');
        singleNewsDiv.innerHTML = `
        <div class="card lg:card-side bg-base-100 shadow-xl px-4 py-3 my-7">
            <figure>
                <img class="w-72 h-80" src="${image_url}" alt="blog">
            </figure>
            <div class="card-body">
                <h2 class="card-title text-3xl mb-3">${title}</h2>
                <p class="text-normal text-gray-400">${details.length > 520 ? details.slice(0, 520) + '...' : details}</p>                
                <div class="card-actions mt-4 flex justify-between items-center text-gray-500">
                    <div class="author flex items-center">
                        <div class="w-10 rounded-full">
                            <img class="w-full" src="${author_image}" />
                        </div>
                        <div class="author-details ml-3">
                            <p>${author_name}</p>
                            <p>Jan 10, 2022</p>
                        </div>
                    </div>
                    <div class="view flex items-center">
                        <i class="fa-regular fa-eye text-2xl"></i>
                        <p class="ml-3 text-xl font-semibold">${total_view}</p>
                    </div>
                    <div class="rating flex items-center gap-2">
                        <i class="fa-solid fa-star-half-stroke text-2xl"></i>
                        <i class="fa-regular fa-star text-2xl"></i>
                        <i class="fa-regular fa-star text-2xl"></i>
                        <i class="fa-regular fa-star text-2xl"></i>
                        <i class="fa-regular fa-star text-2xl"></i>
                    </div>
                    <label for="my-modal-5" class="fa-solid fa-arrow-right text-2xl text-primary"></label>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(singleNewsDiv);
    })
}

const displayNewsCount = (newsCount, categoryName) => {
    const newsCountContainer = document.getElementById('news-count');
    newsCountContainer.innerText = `${newsCount} items found for category ${categoryName}`;
}