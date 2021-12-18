function finderName() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('searchGuest');
  filter = input.value.toUpperCase();
  ul = document.getElementById("guestUL");
  li = ul.getElementsByTagName('li');

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByClassName("searchP")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
function finderId() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('searchGuest');
  filter = input.value;
  ul = document.getElementById("guestUL");
  li = ul.getElementsByTagName('li');

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByClassName("idP")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.indexOf(filter) > -1) {
      li[i].style.display = "block";
    } else {
      li[i].style.display = "none";
    }
  }
}