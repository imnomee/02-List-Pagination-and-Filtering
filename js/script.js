
const page = document.querySelector(".page");
const studentList = document.getElementsByClassName("student-item");
console.log(studentList.length);
const studentsPerPage = 10;

function showPage(_list, _page) {
  const firstItem = _page * studentsPerPage - studentsPerPage;
  const lastItem = _page * studentsPerPage - 1;

  for (let i = 0; i < _list.length; i++) {
    const current = _list[i];
    if (i >= firstItem && i <= lastItem) {
      current.style.display = "block";
    } else {
      current.style.display = "none";
    }
  }

}

showPage(studentList, 1);

const appendPageLinks = (list) => {
  const pages = Math.ceil(studentList.length / studentsPerPage);
  console.log(pages);

  const div = document.createElement("div");
  div.className = "pagination";
  page.appendChild(div);
  const ul = document.createElement("ul");
  div.appendChild(ul);
  let pageList = "";
  for (let i = 1; i <= pages; i++) {
    pageList += `<li><a>${i}</a></li>`;
  }
  ul.innerHTML = pageList;
  ul.firstChild.firstChild.className = 'active'
  div.addEventListener('click', (e) =>{
   const activeButton = document.querySelector('.active');
   if (e.target.tagName === 'A') {
      activeButton.className = '';
      e.target.className = 'active'
      showPage(studentList, e.target.textContent);
   }
  })

};
appendPageLinks(studentList);

