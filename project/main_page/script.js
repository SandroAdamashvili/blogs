let chosenCategories = [];
let filters = [];
let blogs = [];
let blogCategories = [];
let blog = [];
var categories = document.querySelector('.categories');
var logInBtn = document.getElementById('log-in-btn');
var logInForm = document.querySelector('.log-in-form');
var closeBtn = document.getElementById('add');
var mailInput = document.getElementById('mail');
var categoryBtn = document.querySelector('.categories button');
var submitBtn = document.querySelector('.mail-input button');
var logInSuccess = document.querySelector('.log-in-success')
var logInInput = document.querySelector('.log-in-input')
var submitSuccessBtn = document.querySelector('.log-in-success button');
var errorText = document.querySelector('.error');
var logInBg = document.querySelector('.log-in-form-bg');
var newBlog = document.getElementById('create-blog');
var blogsContainer = document.querySelector('.blogs');
// var chooseBlog = document.querySelectorAll('.blogLink');
let chosenFilters = localStorage.getItem('chosenCategory');
var main = document.getElementById('main-page');
var blogPage = document.getElementById('blog-page');
var chosenBlog = document.getElementById('chosen-blog');
var splideList = document.querySelector(".splide__list");

let blogValue = localStorage.getItem('itemValue');

if (chosenFilters && chosenFilters !== ''){
    chosenCategories = chosenFilters.split(',').map(str => +str)
}

var date = new Date();
// var formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
// var liveDate = new Date(formattedDate); 
console.log(date);

fetch('https://api.blog.redberryinternship.ge/api/blogs', {
    method: 'GET',
    headers: {
        'accept': 'application/json',
        'Authorization': "Bearer 8f44816def3fea4a32456945a277e5f7e7044586f85d6aa2acb40edcad174894"
    }})
    .then(res => res.json())
    .then(data => {
        blogs = data.data;
        console.log(blogs);

        for (let i = 0; i < blogs.length; i++){
            var blog_date = new Date(blogs[i].publish_date);
            // console.log(blog_date);
            if (blog_date <= date){
                let blog = document.createElement('div');
                blog.id = blogs[i].id;
                blogsContainer.appendChild(blog);
                let blogImage = document.createElement('img');
                blogImage.src = blogs[i].image;
                let blogAuthor = document.createElement('h5');
                blogAuthor.innerText = blogs[i].author;
                let blogDate = document.createElement('span');
                blogDate.innerText = blogs[i].publish_date;
                let blogTitle = document.createElement('h3');
                blogTitle.innerText = blogs[i].title;
                blog.appendChild(blogImage);
                blog.appendChild(blogAuthor);
                blog.appendChild(blogDate);
                blog.appendChild(blogTitle);
                let blogFilterDiv = document.createElement('div');
                blog.appendChild(blogFilterDiv);
                let blogFilters = [];
                for (let index = 0; index < blogs[i].categories.length; index++){
                    blogFilters.push(blogs[i].categories[index].id)
                    let blogCategory = document.createElement('button')
                    blogCategory.innerText = blogs[i].categories[index].title;
                    blogCategory.value = blogs[i].categories[index].id;
                    blogCategory.style.backgroundColor = blogs[i].categories[index].background_color;
                    blogCategory.style.color = blogs[i].categories[index].text_color;
                    blogFilterDiv.appendChild(blogCategory);
                }
                for (let a = 0; a < chosenCategories.length; a++){
                    if (blogFilters.includes(chosenCategories[a])){
                        blog.removeAttribute('style');
                        break
                    } else {
                        blog.setAttribute('style', 'display: none')
                    }
                }
                let blogDescription = document.createElement('p');
                blogDescription.innerText = blogs[i].description;
                blog.appendChild(blogDescription);
                let blogLink = document.createElement('a');
                blogLink.className = 'blogLink';
                blogLink.href = `../blog_page/index.html?id=${blogs[i].id}`;
                blogLink.innerHTML = 'სრულად ნახვა  <img src="../images/link-arrow.svg">';
                blogLink.value = blogs[i].id;
                blog.appendChild(blogLink);
                blogCategories.push(blogFilters)
                // console.log('blog: ', blogs[i])
                // console.log('blog filters: ', blogFilters)
                // if (chosenCategories.includes())
                // blogLink.addEventListener('click', () => {
                //     console.log(blogLink.value + '-ს დაეჭირა');
                    
                // })
            }
        }
        let chooseBlog = document.querySelectorAll('.blogLink');
        chooseBlog.forEach((item) => {
            item.addEventListener('click', () => {
                console.log(item.value + " daewira");
                // main.setAttribute('style', 'display: none');
                // blogPage.removeAttribute('style');
                localStorage.setItem('itemValue', item.value);
                // console.log('https://api.blog.redberryinternship.ge/api/blogs/' + item.value)
                // fetch('https://api.blog.redberryinternship.ge/api/blogs/' + item.value, {
                //     method: 'GET',
                //     headers: {
                //         'accept': 'application/json',
                //         'Authorization': "Bearer 8f44816def3fea4a32456945a277e5f7e7044586f85d6aa2acb40edcad174894"
                //     }
                // })
                // .then(res => res.json())
                // .then(data => {
                //     blog = data;
                //     console.log(blog);

                //     let chosenBlogImage = document.createElement('img');
                //     chosenBlogImage.src = blog.image;
                //     chosenBlog.appendChild(chosenBlogImage);
                //     let chosenBlogInfo = document.createElement('div');
                //     chosenBlog.appendChild(chosenBlogInfo);
                //     let chosenBlogAuthor = document.createElement('h4');
                //     chosenBlogAuthor.innerText = blog.author;
                //     chosenBlogInfo.appendChild(chosenBlogAuthor);
                //     let dashToDot = blog.publish_date.split('-');
                //     let chosenBlogDate = dashToDot.reverse().join('.');
                //     let chosenBlogMail = blog.email;
                //     let dateAndMail = document.createElement('span');
                //     dateAndMail.innerHTML = chosenBlogDate + ' • ' + chosenBlogMail;
                //     chosenBlogInfo.appendChild(dateAndMail);
                //     let chosenBlogTitle = document.createElement('h2');
                //     chosenBlogTitle.innerText = blog.title;
                //     chosenBlogInfo.appendChild(chosenBlogTitle);
                //     let chosenBlogFilters = document.createElement('div');
                //     chosenBlogInfo.appendChild(chosenBlogFilters);
                //     let chosenBlogCategories = [];
                //     for (let i=0; i<blog.categories.length; i++){
                //         chosenBlogCategories.push(blog.categories[i].id);
                //         let chosenBlogFilter = document.createElement('button');
                //         chosenBlogFilter.innerText = blog.categories[i].title;
                //         chosenBlogFilter.style.backgroundColor = blog.categories[i].background_color;
                //         chosenBlogFilter.style.color = blog.categories[i].text_color;
                //         chosenBlogFilters.appendChild(chosenBlogFilter);
                //     }
                //     let chosenBlogDesc = document.createElement('p');
                //     chosenBlogDesc.innerText = blog.description;
                //     chosenBlogInfo.appendChild(chosenBlogDesc);


                //     blogs.forEach((item) => {
                        
                //         for (let i=0; i<item.categories.length; i++){
                //             if (chosenBlogCategories.includes(item.categories[i].id) && item.id !== blog.id){
                //                 let splideSlide = document.createElement('div')
                //                 splideSlide.className = 'splide__slide';
                //                 splideSlide.role = 'tabpanel';
                //                 splideSlide.ariaRoleDescription = 'slide';
                //                 splideList.appendChild(splideSlide);
                //                 let similarBlog = document.createElement('div')
                //                 similarBlog.className = 'similar-blog';
                //                 splideSlide.appendChild(similarBlog);
                //                 let similarBlogImage = document.createElement('img');
                //                 similarBlogImage.src = item.image;
                //                 similarBlog.appendChild(similarBlogImage);
                //                 let similarBlogAuthor = document.createElement('h5');
                //                 similarBlogAuthor.innerText = item.author;
                //                 similarBlog.appendChild(similarBlogAuthor);
                //                 let similarBlogDate = document.createElement('span');
                //                 similarBlogDate.innerText = item.publish_date.split('-').reverse().join('.');
                //                 similarBlog.appendChild(similarBlogDate);
                //                 let similarBlogTitle = document.createElement('h3');
                //                 similarBlogTitle.innerText = item.title;
                //                 similarBlog.appendChild(similarBlogTitle);
                //                 let similarBlogCategories = document.createElement('div');
                //                 similarBlogCategories.className = 'similar-blog-categories';
                //                 similarBlog.appendChild(similarBlogCategories);
                //                 let similarCategories = [];
                //                 for (let index=0; index<item.categories.length; index++){
                //                     similarCategories.push(item.categories[index].id);
                //                     let similarBlogFilter = document.createElement('button');
                //                     similarBlogFilter.innerText = item.categories[index].title;
                //                     similarBlogFilter.style.backgroundColor = item.categories[index].background_color;
                //                     similarBlogFilter.style.color = item.categories[index].text_color;
                //                     similarBlogCategories.appendChild(similarBlogFilter);
                //                 }
                //                 let similarBlogDesc = document.createElement('p');
                //                 similarBlogDesc.innerText = item.description;
                //                 similarBlog.appendChild(similarBlogDesc);
                //                 let similarBlogLink = document.createElement('button');
                //                 similarBlogLink.className = 'blogLink';
                //                 similarBlogLink.innerHTML = 'სრულად ნახვა  <img src="../images/link-arrow.svg">';
                //                 // blogLink.value = blogs[i].id;
                //                 similarBlog.appendChild(similarBlogLink);
                //                 break;
                //             }
                //         }
                //         // item.categories.forEach((category) => {
                //         //     // similarBlogs.push(category.id);
                //         //     if (chosenBlogCategories.includes(category.id)){
                //         //         let splideSlide = document.createElement('div')
                //         //         splideSlide.className = 'splide__slide is-active is-visible';
                //         //         splideList.appendChild(splideSlide);
                //         //         let similarBlog = document.createElement('div')
                //         //         similarBlog.className = 'similar-blog';
                //         //         splideSlide.appendChild(similarBlog);
                //         //         let similarBlogImage = document.createElement('img');
                //         //         similarBlogImage.src = item.image;
                //         //         similarBlog.appendChild(similarBlogImage);
                //         //         // break;
                //         //     }
                //         // })

                //     })
                // })
                // .then(() => {
                //     var splide = new Splide( '.splide', {
                //         perPage: 3,
                //         // gap    : '32px',
                //         focus  : 0,
                //         // breakpoints: {
                //         //   640: {
                //         //     perPage: 2,
                //         //     gap    : '.7rem',
                //         //     height : '6rem',
                //         //   },
                //         //   480: {
                //         //     perPage: 1,
                //         //     gap    : '.7rem',
                //         //     height : '6rem',
                //         //   },
                //         // },
                //       } );
                    
                //         splide.mount();
                // })
            })
            // if (blogValue == item.value){
            //     main.style.display = 'none';
            //     blogPage.removeAttribute('style');
            // }
            
        })
    })
    .catch(error => console.error('Error fetching data:', error));

fetch('https://api.blog.redberryinternship.ge/api/categories')
    .then(res => res.json())
    .then(data => {
        filters = data.data;

        console.log(filters);
        for (let index = 0; index < filters.length; index++) {
            // console.log(filters[index].title);
            let option = document.createElement("button");
            option.innerText = filters[index].title;
            option.value = filters[index].id;
            option.style.backgroundColor = filters[index].background_color;
            option.style.color = filters[index].text_color;
            categories.appendChild(option);
            // console.log("filter: ", filters[index]);
            if (chosenCategories.includes(filters[index].id)){
                option.style.border = '1px solid #000'
            }
            option.addEventListener('click', (e) => {
                e.preventDefault;
                if (chosenCategories.includes(filters[index].id)){
                    console.log(option.innerText + " clicked twice");
                    let optionIndex = chosenCategories.indexOf(filters[index].id);
                    chosenCategories.splice(optionIndex, 1);
                    console.log(chosenCategories);
                    option.style.border = 'none';
                } else {
                    console.log(option.innerText + " clicked");
                    chosenCategories.push(filters[index].id);
                    console.log(chosenCategories);
                    option.style.border = '1px solid #000'
                }
                localStorage.setItem('chosenCategory', chosenCategories);
                // console.log(localStorage.getItem('chosenCategory').split(",").map(str => {
                //     return parseInt(str, 10);
                // }));
                for (let i=0; i<blogCategories.length; i++){
                    let contains = blogCategories[i].some(element => {
                        return chosenCategories.includes(element)
                    })
                    // console.log(contains);
                    var blog_date = new Date(blogs[i].publish_date);
                    let blogID = document.getElementById(blogs[i].id)
                    if (contains || chosenCategories.length === 0 && blog_date <= date){
                        // console.log(blogCategories[i] + " includes " + chosenCategories);
                        blogID.removeAttribute('style');
                    } else {
                        // console.log(blogCategories[i] + " doesn't include " + chosenCategories);
                        console.log(blogs[i].id)
                        // console.log(blogs[i].id)
                        blogID.setAttribute('style', 'display: none')
                    }
                }         
            })
        }
    })
    .catch(error => console.error('Error fetching data:', error));

console.log(blogCategories);

logInBtn.addEventListener('click', () => {
    logInForm.removeAttribute('style');
    logInBg.removeAttribute('style');
})

closeBtn.addEventListener('click', () => {
    logInForm.setAttribute('style', 'display: none')
    logInBg.setAttribute('style', 'display: none')
})

submitSuccessBtn.addEventListener('click', () => {
    logInForm.setAttribute('style', 'display: none')
    logInBg.setAttribute('style', 'display: none')
})

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(mailInput.value)
    let formData = new FormData();
    formData.append('email', mailInput.value)

    fetch('https://api.blog.redberryinternship.ge/api/login', {
    method: "POST",
    headers: {
        'accept': 'application/json',
    },
    body: formData
    }).then(res => {
        if (res.status == 204) {
            logInSuccess.removeAttribute('style');
            logInInput.setAttribute('style', 'display: none');
            logInBtn.setAttribute('style', 'display: none');
            newBlog.removeAttribute('style');
            // localStorage.setItem('isLoggedIn', true)
        } else {
            errorText.removeAttribute('style');
            submitBtn.removeAttribute('style');
        }
        return res.status;
        })
        .then(data => {
            console.log(data);
            if (data == 204) {
                localStorage.setItem('isLoggedIn', true)
            }
        })
        .catch(error => console.error('Error:', error));
})

// console.log(chooseBlog);

// chooseBlog.forEach((item) => {
//     item.addEventListener('click', () => {
//         console.log(item.value + " daewira")
//     })
// })

// var swiper = new Swiper(".mySwiper", {
//     slidesPerView: 3,
//     centeredSlides: true,
//     spaceBetween: 30,
//     pagination: {
//       el: ".swiper-pagination",
//       type: "fraction",
//     },
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },
//   });

//   var appendNumber = 4;
//   var prependNumber = 1;
//   document
//     .querySelector(".prepend-2-slides")
//     .addEventListener("click", function (e) {
//       e.preventDefault();
//       swiper.prependSlide([
//         '<div class="swiper-slide">Slide ' + --prependNumber + "</div>",
//         '<div class="swiper-slide">Slide ' + --prependNumber + "</div>",
//       ]);
//     });
//   document
//     .querySelector(".prepend-slide")
//     .addEventListener("click", function (e) {
//       e.preventDefault();
//       swiper.prependSlide(
//         '<div class="swiper-slide">Slide ' + --prependNumber + "</div>"
//       );
//     });
//   document
//     .querySelector(".append-slide")
//     .addEventListener("click", function (e) {
//       e.preventDefault();
//       swiper.appendSlide(
//         '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>"
//       );
//     });
//   document
//     .querySelector(".append-2-slides")
//     .addEventListener("click", function (e) {
//       e.preventDefault();
//       swiper.appendSlide([
//         '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>",
//         '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>",
//       ]);
//     });

// var splide = new Splide( '.splide', {
//     perPage: 3,
//     // gap    : '32px',
//     focus  : 0,
//     // breakpoints: {
//     //   640: {
//     //     perPage: 2,
//     //     gap    : '.7rem',
//     //     height : '6rem',
//     //   },
//     //   480: {
//     //     perPage: 1,
//     //     gap    : '.7rem',
//     //     height : '6rem',
//     //   },
//     // },
//   } );

//     splide.mount();