/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

const studentList = document.querySelectorAll('ul li');
const resultsPerPage = 10;
const totalStudents = studentList.length;
const numOfPages = Math.ceil(totalStudents / resultsPerPage);



/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
function showPage(list, page) {
   let currentPage = (page * resultsPerPage);
   for (let i = 0; i < list.length; i++) {
      if (i >= currentPage - resultsPerPage && i < currentPage) {
         list[i].style.backgroundColor = 'skyblue';
         list[i].style.display = '';
      } else {
         list[i].style.backgroundColor = 'yellow';
         list[i].style.display = 'none';
      }
   }

}

showPage(studentList, 6);


/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/

function appendPageLinks(studentList) {
   const page = document.querySelector('.page');
   const paginationDiv = document.createElement('div');
   paginationDiv.className = 'pagination';
   page.appendChild(paginationDiv);

   const paginationUl = document.createElement('ul');
   paginationDiv.appendChild(paginationUl);

   for (let i = 1; i <= numOfPages; i++) {
      const list = document.createElement('li');
      const listLink = document.createElement('a');

      listLink.href = '#';
      listLink.textContent = i;
      list.appendChild(listLink);
      paginationUl.appendChild(list);
      listLink.addEventListener('click', (e) => {
         const page = e.target.textContent;
         // console.log('clicked the button ' + listLink.textContent);
         // listLink.className = 'active';
         for (let i = 0; i < numOfPages; i++) {
            showPage(studentList, page);
            e.target.className = 'active';
         }


      });

   }
}
appendPageLinks(studentList);









// Remember to delete the comments that came with this file, and replace them with your own code comments.