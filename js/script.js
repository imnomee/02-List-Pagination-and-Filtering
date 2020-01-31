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
         // list[i].style.backgroundColor = 'skyblue';
         list[i].style.display = '';
      } else {
         // list[i].style.backgroundColor = 'yellow';
         list[i].style.display = 'none';
      }
   }
}

function appendPageLinks(studentList) {
   const page = document.querySelector('.page');
   const div = document.createElement('div');
   div.className = 'pagination';
   page.appendChild(div);
   const ul = document.createElement('ul');
   div.appendChild(ul);

   for (let i = 1; i <= numOfPages; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = i;
      li.appendChild(a);
      ul.appendChild(li);

      a.addEventListener('click', (e) => {
         const page = e.target.textContent;
         const allActive = document.getElementsByClassName('active');
         for (let i = 0; i < allActive.length; i++) {
            allActive[i].className = '';
         }
         showPage(studentList, page);
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

