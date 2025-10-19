

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
        .then((res) => res.json()) // promise of json data
        .then(json => displayLessons(json.data));
}




const loadLevelWord = (id) => {

    let url = `https://openapi.programming-hero.com/api/level/${id}`
    // console.log(url)
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayWordsByLevel(data.data))

}


const displayWordsByLevel = (words) => {

    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = '';

    words.forEach(word => {

        console.log(word);

        const card = document.createElement('div');
        card.innerHTML = `  <div class="bg-white min-h-40 m-4 p-10 space-y-4 text-center rounded-2xl">
        <h1 class="font-bold text-3xl">${word.word}</h1>
        <p class="font-semiboldl">Meaning /Pronounciation</p>
        <p class="font-medium font-bangla text-2xl">"${word.meaning} / ${word.pronunciation}"</p>

        <div class="flex justify-between items-center">
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90]">
            <i class="fa-solid text-2xl fa-circle-info"></i>
          </button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90]">
            <i class="fa-solid text-2xl fa-volume-high"></i>
          </button>
        </div>

      </div> `
        wordContainer.append(card)

    });


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
          </button> `

        // append into container
        lessonConatiner.appendChild(btnDiv)

    }


}

loadLessons();