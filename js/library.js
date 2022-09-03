const loadAllCategories = async () => {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const categories = await response.json();
        return categories;
    }
    catch (err) {
        displayCatchError();
    }
}

const loadSingleCategory = async (categoryId) => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
        const category = await response.json();
        return category;
    }
    catch (err) {
        displayCatchError();
    }
}

const loadSingleNewsDetails = async (newsId) => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);
        const news = await response.json();
        return news;
    }
    catch (err) {
        displayCatchError();
    }
}

const displayCatchError = () => {
    const newsCountContainer = document.getElementById('news-count');
    newsCountContainer.innerText = `${err}`;
    newsCountContainer.classList.add('text-red-700', 'font-semibold');
}

const displayAllNews = newsArr => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    if (newsArr.length < 1) {
        newsContainer.innerHTML = `<h1 class="text-5xl text-red-700 text-center font-semibold py-12">No News Found, Please Click another Category Menu..</h1>`;
    }
    newsArr.forEach(news => {
        const { title, details, image_url, total_view, _id: id } = news;
        const { name: author_name, img: author_image, published_date: dateStr } = news.author;
        const date = new Date(dateStr);
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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
                            <p>${author_name ? author_name : 'Not Available'}</p>
                            <p>${month[date.getMonth()].slice(0, 3)} ${date.getDate()}, ${date.getFullYear()}</p>
                        </div>
                    </div>
                    <div class="view flex items-center">
                        <i class="fa-regular fa-eye text-2xl"></i>
                        <p class="ml-3 text-xl font-semibold">${total_view ? total_view : 'Not Available'}</p>
                    </div>
                    <div class="rating flex items-center gap-2">
                        <i class="fa-solid fa-star-half-stroke text-2xl"></i>
                        <i class="fa-regular fa-star text-2xl"></i>
                        <i class="fa-regular fa-star text-2xl"></i>
                        <i class="fa-regular fa-star text-2xl"></i>
                        <i class="fa-regular fa-star text-2xl"></i>
                    </div>
                    <label for="my-modal-5" class="fa-solid fa-arrow-right text-2xl text-primary" onclick="displayDetails('${id}')"></label>
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
    newsCountContainer.classList.add('text-primary');
}

const displayDetails = async id => {
    const newsModal = document.getElementById('news-modal');
    newsModal.textContent = '';
    const loadNews = await loadSingleNewsDetails(id);
    const news = loadNews.data[0];
    const { title, details, image_url, total_view } = news;
    const { name: author_name, img: author_image, published_date: dateStr } = news.author;
    const date = new Date(dateStr);
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    newsModal.innerHTML = `
    <img src="${image_url}" alt="">
    <h3 class="font-bold text-lg pt-4">${title}</h3>
    <p class="py-4">${details}</p>
    <div class="modal-action">
        <label for="my-modal-5" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    </div>
    <div class="card-actions mt-4 flex justify-between items-center text-gray-500">
        <div class="author flex items-center">
            <div class="w-10 rounded-full">
                <img class="w-full" src="${author_image}" />
            </div>
            <div class="author-details ml-3">
                <p>${author_name ? author_name : 'Not Available'}</p>
                <p>${month[date.getMonth()].slice(0, 3)} ${date.getDate()}, ${date.getFullYear()}</p>
            </div >
        </div >
        <div class="view flex items-center">
            <i class="fa-regular fa-eye text-2xl"></i>
            <p class="ml-3 text-xl font-semibold">${total_view ? total_view : 'Not Available'}</p>
        </div>
        <div class="rating flex items-center gap-2">
            <i class="fa-solid fa-star-half-stroke text-2xl"></i>
            <i class="fa-regular fa-star text-2xl"></i>
            <i class="fa-regular fa-star text-2xl"></i>
            <i class="fa-regular fa-star text-2xl"></i>
            <i class="fa-regular fa-star text-2xl"></i>
        </div>
    </div >
    `;
}