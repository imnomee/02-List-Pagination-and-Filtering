/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

const studentList = document.querySelectorAll('ul li'); // Main student lists from html page

const resultsPerPage = 10; //results per page, we can change it any time to display different results

const page = document.querySelector('.page');
const headDiv = page.firstElementChild;

const showPage = (list, page) => {
   let currentPage = (page * resultsPerPage);
   for (let i = 0; i < list.length; i++) {

      /*
      here if currentPage is page * results ( 5 * 10 = 50)
      so currentPage - resultsPerPage (50 -10 = 40)
      it will start from >=40 and end <50 (0 index is on new page always)
      for Example: 
      0 >= (1 * 10) - 10 && 0 < 1 * 10
      set display to empty and it will show on page.
      page 2: 
      (2 * 10) - 10 = 10 start && < 20 end
      */

      if (i >= currentPage - resultsPerPage && i < currentPage) {
         // list[i].style.backgroundColor = 'skyblue';
         list[i].style.display = '';
      } else {
         // list[i].style.backgroundColor = 'yellow';
         list[i].style.display = 'none';
      }
   }
}

const appendPageLinks = (list) => {
   const totalStudents = list.length; // total students
   const numOfPages = Math.ceil(totalStudents / resultsPerPage); //total number of pages it will generate

   const div = document.createElement('div');
   div.className = 'pagination';
   page.appendChild(div);
   const ul = document.createElement('ul');
   div.appendChild(ul);

   //Generating number of li > a equal to number of pages
   for (let i = 1; i <= numOfPages; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = i;
      li.appendChild(a);
      ul.appendChild(li);

      //Click event listener on a so it only works when the link is clicked and new page is shown
      a.addEventListener('click', (e) => {

         // page will get the number returned from the textConent and function accordingly
         const page = e.target.textContent;

         //here we will get all the active links, if there are any and we will change the class to none so they are inactive
         const allActive = document.getElementsByClassName('active');
         for (let i = 0; i < allActive.length; i++) {
            allActive[i].className = '';
         }

         //showPage function is called with orginal studentList and page number returned from li > a.target.textContent
         showPage(list, page);

         //setting the class of the current a to active
         e.target.className = 'active';
      });
   }

   //Getting all the generated List > a items and setting first link class to 'active'
   const listItems = ul.querySelectorAll('li a')[0];
   listItems.className = 'active';

}

/*
SEARCH BAR
*/

const searchButton = (list) => {

   const div = document.createElement('div');
   const input = document.createElement('input');
   input.placeholder = 'Search for students...';
   const button = document.createElement('button');
   button.textContent = 'Search';
   div.className = 'student-search';
   div.appendChild(input);
   div.appendChild(button);
   headDiv.appendChild(div);

   const pagination = document.querySelector('.pagination');
   const h1 = document.createElement('h1');
   h1.textContent = '';
   page.insertBefore(h1, pagination);

   button.addEventListener('click', (e) => {

      if (e.target.tagName == 'BUTTON') {
         /* Getting text contact of list using traversal.
         I can use the class name here for student list and student item
         but used this approach just or practice and to see if it will work
         */
         const searchInput = input.value;
         const searchArr = []; // sample second list to try on both lists
         if (searchInput.length > 0) {
            searchArr.length = 0;
            h1.textContent = '';
            pagination.style.display = 'none';

            for (let i = 0; i < list.length; i++) {
               const name = list[i].firstElementChild.firstElementChild.nextElementSibling.textContent;
               list[i].style.display = 'none';

               if (name.toLowerCase().includes(searchInput.toLowerCase())) {
                  searchArr.push(list[i]);
               }
               input.value = '';
            }
         }
         if (searchArr.length == 0) {
            h1.textContent = 'NO RECORDS FOUND, PLEASE SEARCH AGAIN OR REFRESH FOR FULL LIST.';

         } else {
            /*
            This will create a new pagination element for search results and
            we will remove it every time a search is conducted

            IF YOU COMMENT OUT THESE NEXT TWO LINES FOR " searchPagination" YOU WILL SEE THE BUG, WHICH SHOWS MORE PAGINATIONS
            ON EVERY SEARCH TERM, I WOULD APPRECIATE IF YOU CAN PLEASE GUIDE ME WITH SOME BETTER APPROACH.
            THATS THE BEST I COULD COME UP WITH. 

            */
            const searchPagination = page.lastElementChild;
            page.removeChild(searchPagination);

            //show page and append links with searchArray we received from result
            showPage(searchArr, 1);
            appendPageLinks(searchArr);
         }
      }
   });
}

showPage(studentList, 1);
appendPageLinks(studentList);
searchButton(studentList);

