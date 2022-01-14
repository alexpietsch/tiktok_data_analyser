function showDataUploader(){
    document.getElementById("uploadDiv").style.visibility="visible";
}

function helpData(){
    window.open("https://support.tiktok.com/en/account-and-privacy/personalized-ads-and-data/requesting-your-data")
}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");

    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
} 