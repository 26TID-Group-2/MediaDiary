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

    releaseYear: 1984,

    status: "In Progress", //"Interested", "In Progress" or "Finished"

    liked: true, // true = filled heart. false = outlined heart.

    pictureUrl:
      "https://www.daizex.com/multimedia/images/covers/tankoubon/japanese_03.jpg",
  },

  {
    id: 2,

    type: "Movie",

    title: "The Dark Knight",

    creator: ["Christopher Nolan"],

    releaseYear: 2008,

    status: "Finished",

    liked: false,

    pictureUrl: "https://static.posters.cz/image/1300/197743.jpg",
  },

  {
    id: 3,

    type: "TV",

    title: "Friends",

    creator: ["Marta Kauffman", "David Crane"], //Here the list contains two creators

    releaseYear: 1994,

    status: "In Progress",

    liked: true,

    pictureUrl: "https://static.posters.cz/image/1300/133041.jpg",
  },
  {
    id: 4,

    type: "Movie",

    title: "Eternal Sunshine of the Spotless Mind", //trying a long title

    creator: ["Michel Gondry"],

    releaseYear: 2004,

    status: "In Progress",

    liked: true,

    pictureUrl:
      "https://m.media-amazon.com/images/M/MV5BMTY4NzcwODg3Nl5BMl5BanBnXkFtZTcwNTEwOTMyMw@@._V1_.jpg",
  },
];

export default sampleMedia;
