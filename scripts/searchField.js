// 1
const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

//
//_3__Search states.json and filter it
const searchStates = async (searchText) => {
  const res = await fetch("../data/states.json");
  const states = await res.json();

  // 4 __ check if it works
  // console.log(states);

  //   ----------------------
  //_5_   Get matches to current text input, to change everytime you type something
  let matches = states.filter((state) => {
    //   the following will make that when you type a first letter it will give you all related to that specific letter, that s why you use the caret ^.
    // the 'gi.... 'g is for global and the 'i' is for the case in sensitive flags, so that it matches wether its an uppercase or lowercase.
    const regex = new RegExp(`^${searchText}`, "gi");
    //   new regularEXpression: regex
    // ^ caret means that it has to start with
    //
    // _6_
    return state.name.match(regex) || state.abbr.match(regex);
  });

  //__8 this will prevent that when the user delete everything you see all the content of the array. the empty array for here means that if the user leaves a 0 or writes nothing, it will not show anything.
  //
  //
  if (searchText.length === 0) {
    matches = [];
  }

  //
  // __7 check if it works
  //   console.log(matches);
  //
  //__9 now show the result on the browser instead if the console by creating a function, start by calling it first.
  outputHtml(matches);
};

//__10 the function to show the results that is linked to step 9

const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) =>
          `
      <div class="card card-body mb-1">
      <img class="image" src=${match.image} alt=${match.title}>
      <h4>${match.name} (${match.abbr}) 
      <span class="text-primary">${match.capital}</span></h4>  
        <small>Lat: ${match.lat} / Long: ${match.long}</small>
       </div> 
        `
      )
      .join("");

    matchList.innerHTML = html;
  }
};

//
//
//
// _2 create the click event listener , add 2 functions : () => then add the second one like so :  searchStates(search.value))
search.addEventListener("input", () => searchStates(search.value));
// here you specify that you want to grab the value inside the input not the input box
