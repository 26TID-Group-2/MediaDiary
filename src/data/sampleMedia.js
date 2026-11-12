//Fake test data so we have something to show on screen

//sampleMedia is an array, written with square brackets.
//Each item in the array is an Object, written with curly brackets.
//Each item furthermore describes a book, a movie or a tv-show
//The items are separated by commas

const sampleMedia = [
  {
    id: 1, //Unique number for each item

    type: "Book", //Movie, TV or Book.

    title: "Dragon Ball",

    creator: ["Akira Toriyama"], //[] cause it's always a list - even if there's only one creator.

    year: 1984,

    status: "In Progress", //"Interested", "In Progress" or "Finished"

    favourite: true, // true = filled heart. false = outlined heart.
  },

  {
    id: 2,

    type: "Movie",

    title: "The Dark Knight",

    creator: ["Christopher Nolan"],

    year: 2008,

    status: "Finished",

    favourite: false,
  },

  {
    id: 3,

    type: "TV",

    title: "Friends",

    creator: ["Marta Kauffman", "David Crane"], //Here the list contains two creators

    year: 1994,

    status: "In Progress",

    favourite: true,
  },
];

export default sampleMedia;
