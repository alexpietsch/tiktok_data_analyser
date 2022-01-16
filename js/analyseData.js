function countUp(){
    const counter = document.querySelectorAll(".counter");
    const speed = 200;

    counter.forEach(counter =>{
        const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = dict[target];

            var inc = target / speed;

            var newInc = count + inc;
            if (newInc < 1) {
                newInc *= 10;
            }
                
            dict[target] = newInc;

            if(count < target && newInc <= target){
                counter.innerText = Math.trunc(newInc);
                setTimeout(updateCount, 10);
            }
            
            if(newInc > target){
                counter.innerText = target;
            }
        }
        updateCount();
    });
} 


function getData(fileType, data){
    if(fileType === "txt"){
        return (data.match(/Date/g) || []).length;
    } else {

    }
}

const fileSelector = document.getElementById('file-selector');
let dict = {};

fileSelector.addEventListener('change', (event) => {
    document.getElementById("viewData").style.visibility="visible";
    const file = event.target.files[0];

    const reader = new zip.ZipReader(new zip.BlobReader(file));
    const entries = reader.getEntries();

    await entries.then(function(result){
        const userFileType = result[0].filename.slice(-3);

        const follower = result[4].getData(new zip.TextWriter()).then(
            function(data){
                let target = getData(userFileType, data);
                dict[target] = 0;
                document.getElementById("followerElem").setAttribute("data-target", target);
            }
        );
        const following = result[5].getData(new zip.TextWriter()).then(
            function(data){
                let target = getData(userFileType, data);
                dict[target] = 0
                document.getElementById("followingElem").setAttribute("data-target", target);
            }
        );
        const likes = result[7].getData(new zip.TextWriter()).then(
            function(data){
                let target = getData(userFileType, data);
                dict[target] = 0
                document.getElementById("likesElem").setAttribute("data-target", target);
            }
        );
        const searches = result[10].getData(new zip.TextWriter()).then(
            function(data){
                let target = getData(userFileType, data);
                dict[target] = 0
                document.getElementById("searchesElem").setAttribute("data-target", target);
            }
        );
        const watchedVideos = result[13].getData(new zip.TextWriter()).then(
            function(data){
                let target = getData(userFileType, data);
                dict[target] = 0
                document.getElementById("watchedVideosElem").setAttribute("data-target", target);
                countUp();
            }
        );
        const comments = result[19].getData(new zip.TextWriter()).then(
            function(data){
                let target = getData(userFileType, data);
                dict[target] = 0
                document.getElementById("commentsElem").setAttribute("data-target", target);
            }
        );
    });

    reader.close();
});