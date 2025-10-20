

const createSynos = (syn) => {
    const htmlEle = syn.map(el => `<span class="btn m-2" > ${el} </span>`);

    return (htmlEle.join(' '));
};





const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
        .then((res) => res.json()) // promise of json data
        .then(json => displayLessons(json.data));
};


// manage spinner effect

const manageSpinner = (spin) => {
    if (spin === true) {
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');
    }
    else {
        document.getElementById('spinner').classList.add('hidden');
        document.getElementById('word-container').classList.remove('hidden');
    }
}


const removeActive = () => {

    const removeBtn = document.querySelectorAll(".lesson-btn");

    // console.log(removeBtn);

    // removeBtn.classList.remove('active');  // Doesn't work, removes all class but addition stops there
    removeBtn.forEach(btn => btn.classList.remove('active'));

};


const loadLevelWord = (id) => {
    manageSpinner(true);
    let url = `https://openapi.programming-hero.com/api/level/${id}`

    // console.log(url)

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add('active');
            displayWordsByLevel(data.data);
        })
};



const loadWordDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;

    const res = await fetch(url);
    const details = await res.json();

    displayWordDetails(details.data)
};


const displayWordDetails = (id) => {

    const detailsBox = document.getElementById('word-details');
    detailsBox.innerHTML = ` <h3 class="text-lg font-bold mb-8">
            ${id.word} ( <i class="fa-solid fa-microphone-lines"></i> : ${id.pronunciation})
          </h3>

          <h4 class="font-semibold text-lg">Meaning</h4>
          <p class="mb-8 font-semibold font-bangla">${id.meaning}</p>

          <h4 class="font-semibold">Example</h4>
          <p class="mb-8">${id.sentence}</p>

          <h3 class="font-semibold">Synonym</h3>
          <div>
           ${createSynos(id.synonyms)}
          </div>`

    document.getElementById('my_modal_5').showModal();

};

const displayWordsByLevel = (words) => {

    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = '';


    if (words.length == 0) {
        wordContainer.innerHTML = `  <div class="w-11/12 mx-auto font-bangla rounded-3xl m-4 bg-white text-center p-16 col-span-full ">
         <img class="mx-auto" src="./assets/alert-error.png">
      <p class="mb-3">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h1 class="text-4xl font-medium">নেক্সট Lesson এ যান</h1>
    </div> `;

        manageSpinner(false);

        return;
    }

    words.forEach(word => {

        // console.log(word);

        const card = document.createElement('div');
        card.innerHTML = ` <div class="bg-white min-h-40 m-4 p-10 space-y-4 text-center rounded-2xl">
        <h1 class="font-bold text-3xl">${word.word ? word.word : ' শব্দ খুঁজে পাওয়া যায় নাই'}</h1>
        <p class="font-semiboldl">Meaning /Pronounciation</p>
        <p class="font-medium font-bangla text-2xl">${word.meaning ? word.meaning : " অর্থ খুঁজে পাওয়া যায় নাই "} / ${word.pronunciation ? word.pronunciation : "No Pronunciation Found"}</p>

        <div class="flex justify-between items-center">
          <button onclick="loadWordDetails(${word.id})"  class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90]">
            <i class="fa-solid text-2xl fa-circle-info"></i>
          </button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90]">
            <i class="fa-solid text-2xl fa-volume-high"></i>
          </button>
        </div>

      </div> `
        wordContainer.append(card)

    });
    manageSpinner(false);

};

const displayLessons = (lessons) => {

    // 1. get the container and make empty 
    const lessonConatiner = document.getElementById('lesson-container');
    lessonConatiner.innerHTML = '';

    //2. get into every lessons

    for (let lesson of lessons) {

        // create element
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = ` <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-solid fa-book-open-reader"></i> Lesson - ${lesson.level_no}
          </button> `

        //   const lessonActive = getElementById(`lesson-btn-${lesson.level_no}`);

        // append into container
        lessonConatiner.appendChild(btnDiv)

    }


}

loadLessons();


document.getElementById('btn-search').addEventListener('click', () => {
    removeActive();
    const inputValue = document.getElementById('input-search');
    const searchValue = inputValue.value.trim().toLowerCase();
    console.log(searchValue);

    fetch(`https://openapi.programming-hero.com/api/words/all`)
    .then(res => res.json())
    .then(data => {
        const allWords = data.data;

        // console.log(allWords);
        
        const matchWords = allWords.filter( filt => filt.word.toLowerCase().includes(searchValue));
        displayWordsByLevel(matchWords);
    });

});