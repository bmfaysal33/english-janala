

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
        .then((res) => res.json()) // promise of json data
        .then(json => displayLessons(json.data));
}

const loadLevelWord = (id) => {

    const url = `https://openapi.programming-hero.com/api/level/${id}`
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data.data))

}

const displayWordsByLevel = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = '';

    for (let word of words ){
        
        console.log(word);

        // const card = document.createElement('div');
        // card.innerHTML = ` <p> Cat </p> `
        // wordContainer.append(card)
    }
   

};

const displayLessons = (lessons) => {

    // 1. get the container and make empty 
    const lessonConatiner = document.getElementById('lesson-container');
    lessonConatiner.innerHTML = '';

    //2. get into every lessons
    for (let lesson of lessons) {
        // create element


        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = ` <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open-reader"></i> Lesson - ${lesson.level_no}
          </button>
            `
        // append into container

        lessonConatiner.appendChild(btnDiv)

    }


}

loadLessons();