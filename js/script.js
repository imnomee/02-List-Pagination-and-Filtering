/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

const studentList = document.querySelectorAll('ul li');
const resultsPerPage = 10; //results per page, we can change it any time to display different results
const totalStudents = studentList.length; // total students
const numOfPages = Math.ceil(totalStudents / resultsPerPage); //total number of pages it will generate

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
         const allActive = document.getElementsByClassName('active');
         for (let i = 0; i < allActive.length; i++) {
            allActive[i].className = '';
         }
         showPage(studentList, page);
         e.target.className = 'active';
      });
   }

   //Getting all the generated List > a items and setting first link class to 'active'
   const listItems = paginationUl.querySelectorAll('li a')[0];
   listItems.className = 'active';
}

//Running showpage function with page number one by default. So it starts always with page 1
showPage(studentList, 1);

appendPageLinks(studentList);

