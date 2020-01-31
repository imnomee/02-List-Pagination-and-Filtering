/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

const studentList = document.querySelectorAll('ul li');
let searchArr = [];
const resultsPerPage = 10; //results per page, we can change it any time to display different results
const totalStudents = studentList.length; // total students
const numOfPages = Math.ceil(totalStudents / resultsPerPage); //total number of pages it will generate

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

const appendPageLinks = (studentList) => {

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
         showPage(studentList, page);

         //setting the class of the current a to active
         e.target.className = 'active';
      });
   }

   //Getting all the generated List > a items and setting first link class to 'active'
   const listItems = ul.querySelectorAll('li a')[0];
   listItems.className = 'active';
}

//Running showpage function with page number one by default. So it starts always with page 1
showPage(studentList, 1);

appendPageLinks(studentList);



/*

///// SEARCH BAR

*/

for (let n = 0; n < studentList.length; n++) {
   searchArr.push(studentList[n]);

}


const div = document.createElement('div');
const input = document.createElement('input');
input.placeholder = 'Search for students...';
const button = document.createElement('button');
button.textContent = 'Search';
div.className = 'student-search';
div.appendChild(input);
div.appendChild(button);
headDiv.appendChild(div);
button.addEventListener('click', (e) => {

   if (e.target.tagName == 'BUTTON') {
      if (e.target.textContent == 'Search') {
         console.log(input.value);
      }

   }
});