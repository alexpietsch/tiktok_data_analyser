function countUp(){
    const counter = document.querySelectorAll(".counter");
    const speed = 200;

    counter.forEach(counter =>{
        const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;

            var inc = target / speed;

            if(count < target){
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 10);
            } else {
                count.innerText = target;
            }
        }
        updateCount();
    });
}

// var displayresult = document.getElementById("displayresult");
const fileSelector = document.getElementById('file-selector');
fileSelector.addEventListener('change', (event) => {
    document.getElementById("viewData").style.visibility="visible";
    const file = event.target.files[0];
    document.getElementById("dataDate").innerText=new Intl.DateTimeFormat('en-US').format(file.lastModifiedDate);

    const reader = new zip.ZipReader(new zip.BlobReader(file));
    const entries = reader.getEntries();

    entries.then(function(result){
        const follower = result[4].getData(new zip.TextWriter());
        const following = result[5].getData(new zip.TextWriter());
        const likes = result[7].getData(new zip.TextWriter());
        const searches = result[10].getData(new zip.TextWriter());
        const watchedVideos = result[13].getData(new zip.TextWriter());
        const comments = result[19].getData(new zip.TextWriter());

        follower.then(function(data){
            document.getElementById("followerElem").setAttribute("data-target", (data.match(/Date/g) || []).length);
        })
        following.then(function(data){
            document.getElementById("followingElem").setAttribute("data-target", (data.match(/Date/g) || []).length);
        })
        likes.then(function(data){
            document.getElementById("likesElem").setAttribute("data-target", (data.match(/Date/g) || []).length);
        })
        searches.then(function(data){
            document.getElementById("searchesElem").setAttribute("data-target", (data.match(/Date/g) || []).length);
        })
        comments.then(function(data){
            document.getElementById("commentsElem").setAttribute("data-target", (data.match(/Date/g) || []).length);
        })
        watchedVideos.then(function(data){
            document.getElementById("watchedVideosElem").setAttribute("data-target", (data.match(/Date/g) || []).length);
            countUp();
        })
        

    });

    console.log(entries)

    // close the ZipReader
    reader.close();
    
});