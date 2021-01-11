function loadDates() {
    let str = document.getElementById("fullYear").innerHTML;
    let d = new Date();
    document.getElementById("fullYear").innerHTML = "&copy; " + d.getFullYear() + str;
    document.getElementById("lastModified").innerHTML = "Last Updated: " + document.lastModified;
}
