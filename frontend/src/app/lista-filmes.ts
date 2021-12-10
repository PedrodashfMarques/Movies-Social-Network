import { Movie } from "./shared/movie.model";

export const listaFilmes: Movie[] =  [
    {
        title: "Velocidade Furiosa 8",
        id: 1,
        releaseDate: 2017,
        genre: "Action",
        description: "When a mysterious woman seduces Dominic Toretto into the world of terrorism and a betrayal of those closest to him, the crew face trials that will test them as never before.",
        image: "https://i.pinimg.com/originals/b2/2a/f2/b22af2d4c5b91a89887df7dc0487d204.jpg",
        favourite: false,
        trailer: 'https://www.youtube.com/embed/t7sIk_AskXI',
        comments: [
                {
                title: 'This movie is incredible!!',
                body: 'I highly recommend it if you like the typical fast and furious !! I am telling you, it has been a while since F&F have released such an action like this.',
                profileName: "Johanna Anderson",
                profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                likesNumber: 0,
                },
                {
                    title: 'This movie is incredible!!',
                    body: 'I highly recommend it if you like the typical fast and furious !! I am telling you, it has been a while since F&F have released such an action like this. ',
                    profileName: "Lambda Smith",
                    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80",
                    likesNumber: 0,
                    },    
                ],
    },
    {
        title: "Interestellar",
        id: 2,
        releaseDate: 2014,
        genre: "Science-Fiction",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        image: "http://3.bp.blogspot.com/-tCBmjw7ti_M/VGDla6PAW_I/AAAAAAAAM8c/7vaEVkmio4g/s1600/Interestelar%2B01.jpg",
        favourite: false,
        trailer: 'https://www.youtube.com/embed/zSWdZVtXT7E',
        comments: [
            {
                title: 'This movie is incredible!!',
                body: 'I highly recommend it if you like the typical fast and furious !!',
                profileName: "Johanna Anderson",
                profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                likesNumber: 0,
            },
        ],
    },
    {
        title: "Mad Max: Fury Road",
        id: 3,
        genre: "Action",
        description: "An apocalyptic story set in the furthest reaches of our planet, in a stark desert landscape where humanity is broken, and almost everyone is crazed fighting for the necessities of life. Within this world exist two rebels on the run who just might be able to restore order.",
        image: "https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
        favourite: true,
        trailer: 'https://www.youtube.com/embed/hEJnMQG9ev8',

        releaseDate: 2015,
        comments: [
                {
                title: 'This movie is incredible!!',
                body: 'I highly recommend it if you like the typical fast and furious !!',
                profileName: "Johanna Anderson",
                profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                likesNumber: 0,
                },
        ],
    },
    {
        title: "Escape Room",
        id: 4,
        releaseDate: 2019,
        genre: "Thriller",
        description: "Six strangers find themselves in a maze of deadly mystery rooms and must use their wits to survive.",
        image: "https://images-na.ssl-images-amazon.com/images/I/91OlffXsQIL._RI_.jpg",
        favourite: false,
        trailer: 'https://www.youtube.com/embed/6dSKUoV0SNI',

        comments: [
            {
                title: 'This movie is incredible!!',
                body: 'I highly recommend it if you like the typical fast and furious !!',
                profileName: "Johanna Anderson",
                profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                likesNumber: 0,

                },
    ],
        },
    {
        title: "Crazy Stupid Love",
        id: 5,
        releaseDate: 2011,
        genre: "Comedy",
        description: "A middle-aged husband's life changes dramatically when his wife asks him for a divorce. He seeks to rediscover his manhood with the help of a newfound friend, Jacob, learning to pick up girls at bars.",
        image: "https://img.betaseries.com/ansiXGtEkzSHB28yYRCFTAxLlGY=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffilms%2Faffiches%2Foriginal%2F1463.jpg",
        favourite: false,
        trailer: 'https://www.youtube.com/embed/8iCwtxJejik',

        comments: [
            {
                title: 'This movie is incredible!!',
                body: 'I highly recommend it if you like the typical comedy movies !!',
                profileName: "Hannah Thompson",
                profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                likesNumber: 0,

                },
    ],
    },
    {
        title: "Coco",
        id: 6,
        releaseDate: 2017,
        genre: "Animation",
        description: "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
        image: "https://m.media-amazon.com/images/M/MV5BYjQ5NjM0Y2YtNjZkNC00ZDhkLWJjMWItN2QyNzFkMDE3ZjAxXkEyXkFqcGdeQXVyODIxMzk5NjA@._V1_.jpg",
        favourite: true,
        trailer: 'https://www.youtube.com/embed/Ga6RYejo6Hk',

        comments: [
            {
                title: 'This movie is incredible!!',
                body: 'I highly recommend it if you like the typical fast and furious !!',
                profileName: "Johanna Anderson",
                profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                likesNumber: 0,

                },
            ],
    },

    {
        title: "Dune",
        id: 15,
        releaseDate: 2021,
        genre: "Science-Fiction",
        description: "Feature adaptation of Frank Herbert's science fiction novel, about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
        image: "https://cdn.asiatatler.com/asiatatler/i/ph/2021/07/23134704-dune_cover_1350x2000.jpeg",
        favourite: false,
        trailer: 'https://www.youtube.com/embed/n9xhJrPXop4',
        comments: [
            {
                title: 'This movie is incredible!!',
                body: 'I highly recommend it if you like the typical Sci-Fi movie..',
                profileName: "Andersa Vikander",
                profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                likesNumber: 0,
            },
        ],
    },

    {
        title: "Black Widow",
        id: 7,
        releaseDate: 2021,
        genre: "Action",
        description: "Natasha Romanoff confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises.",
        image: "https://m.media-amazon.com/images/M/MV5BNjRmNDI5MjMtMmFhZi00YzcwLWI4ZGItMGI2MjI0N2Q3YmIwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg",
        favourite: false,
        trailer: 'https://www.youtube.com/embed/Fp9pNPdNwjI',

        comments: [
            {
                title: 'This movie is incredible!!',
                body: 'I highly recommend it if you like the typical fast and furious !!',
                profileName: "Alexa Barst",
                profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                likesNumber: 0,

                },
    ],
    },

    {
        title: "The Best of Me",
        id: 17,
        releaseDate: 2014,
        genre: "Romance",
        description: "A pair of former high school sweethearts reunite after many years when they return to visit their small hometown.",
        image: "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/9c655cd0a27ef54a97a66937aee9f4d0e820ecd4265350cd0297b7d0c187a311._RI_V_TTW_.jpg",
        favourite: false,
        trailer: 'https://www.youtube.com/embed/cQszhfoP_WI',

        comments: [
            {
                title: 'This movie is incredible!!',
                body: 'I highly recommend it if you like the typical fast and furious !!',
                profileName: "Johanna Anderson",
                profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                likesNumber: 0,

            },
        ],
    },

    {
        title: "Edge of Tomorrow",
        id: 8,
        releaseDate: 2014,
        genre: "Adventure",
        description: "A soldier fighting aliens gets to relive the same day over and over again, the day restarting every time he dies.",
        image: "https://resizing.flixster.com/-7nMH-f2F8Vya4I8yR2WfsAL0aA=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzUxNWFlMGQ0LWU0ZTUtNDkzMC04NGQ4LTk0ZWM5MzRjMzRhNy53ZWJw",
        favourite: false,
        trailer: 'https://www.youtube.com/embed/vw61gCe2oqI',

        comments: [
            {
                title: 'This movie is incredible!!',
                body: 'I highly recommend it if you like the typical fast and furious !!',
                profileName: "Johanna Anderson",
                profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                likesNumber: 0,

                },
    ],
    },
    {
        title: "A Quiet Place",
        id: 9,
        releaseDate: 2018,
        genre: "Horror",
        description: "In a post-apocalyptic world, a family is forced to live in silence while hiding from monsters with ultra-sensitive hearing.",
        image: "https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_FMjpg_UX1000_.jpg",
        favourite: true,
        trailer: 'https://www.youtube.com/embed/WR7cc5t7tv8',

        comments: [
            {
                title: 'This movie is incredible!!',
                body: 'Kinda diferent from what I was expecting and I must say that I really loved it !!',
                profileName: "Johanna Anderson",
                profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                likesNumber: 0,

                },
    ],
    },
    {
        title: "How to Train Your Dragon",
        id: 11,
        releaseDate: 2010,
        genre: "Animation",
        description: "A hapless young Viking who aspires to hunt dragons becomes the unlikely friend of a young dragon himself, and learns there may be more to the creatures than he assumed.",
        image: "https://m.media-amazon.com/images/M/MV5BMjA5NDQyMjc2NF5BMl5BanBnXkFtZTcwMjg5ODcyMw@@._V1_.jpg",
        favourite: false,
        trailer: 'https://www.youtube.com/embed/oKiYuIsPxYk',

        comments: [
            {
                title: 'This movie is incredible!!',
                body: 'I highly recommend it if you like the typical fast and furious !!',
                profileName: "Johanna Anderson",
                profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                likesNumber: 0,

                },
    ],
    },
    {
        title: " Jumanji: Welcome to the Jungle",
        id: 12,
        releaseDate: 2017,
        genre: "Adventure",
        description: "Four teenagers are sucked into a magical video game, and the only way they can escape is to work together to finish the game.",
        image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR9r58IcBHqj_2YnUsBDQU_Tl6pq_kR4u-na8kz5K1k_wvp5uu1",
        favourite: false,
        trailer: 'https://www.youtube.com/embed/2QKg5SZ_35I',

        comments: [
            {
                title: 'This movie is incredible!!',
                body: 'I highly recommend it if you like the typical fast and furious !!',
                profileName: "Johanna Anderson",
                profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                likesNumber: 0,

            },
    ],
    },

    {
        title: "The Hangover",
        id: 13,
        releaseDate: 2009,
        genre: "Comedy",
        description: "Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.",
        image: "https://flxt.tmsimg.com/assets/p192248_p_v10_ap.jpg",
        favourite: false,
        trailer: 'https://www.youtube.com/embed/tcdUhdOlz9M',

        comments: [
            {
                title: 'This movie is incredible!!',
                body: 'I highly recommend it if you like the typical fast and furious !!',
                profileName: "Johanna Anderson",
                profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                likesNumber: 0,

            },
        ],
    },

    {
        title: "A Quiet Place - Part 2",
        id: 10,
        releaseDate: 2020,
        genre: "Horror",
        description: "Following the events at home, the Abbott family now face the terrors of the outside world. Forced to venture into the unknown, they realize the creatures that hunt by sound are not the only threats lurking beyond the sand path.",
        image: "https://i2.wp.com/www.socialnews.xyz/wp-content/uploads/2021/05/05/a-quiet-place-part-II-Movie-New-HD-Poster-.jpg?quality=80&zoom=1&ssl=1",
        favourite: true,
        trailer: 'https://www.youtube.com/embed/BpdDN9d9Jio',

        comments: [
            {
                title: 'This movie is incredible!!',
                body: 'If you watched the first you will definitely love this even more !!',
                profileName: "Johanna Anderson",
                profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                likesNumber: 0,

                },
    ],
    },

    {
        title: "The Hangover - Part 2",
        id: 14,
        releaseDate: 2011,
        genre: "Comedy",
        description: "Two years after the bachelor party in Las Vegas, Phil, Stu, Alan, and Doug jet to Thailand for Stu's wedding. Stu's plan for a subdued pre-wedding brunch, however, goes seriously awry.",
        image: "https://www.suggestingmovie.com/Movies/3341-lci.jpg",
        favourite: false,
        trailer: 'https://www.youtube.com/embed/ohF5ZO_zOYU',

        comments: [
            {
                title: 'This movie is incredible!!',
                body: 'I highly recommend it if you like the typical fast and furious !!',
                profileName: "Johanna Anderson",
                profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                likesNumber: 0,

            },
        ],
    },

    {
        title: "The Notebook",
        id: 16,
        releaseDate: 2004,
        genre: "Romance",
        description: "A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.",
        image: "https://mb.web.sapo.io/9782e85cbbcdd390ee71e1ef5d6c1ff44ef4f492.jpg",
        favourite: false,
        trailer: 'https://www.youtube.com/embed/yDJIcYE32NU',

        comments: [
            {
                title: 'This movie is incredible!!',
                body: 'I highly recommend it if you like the typical fast and furious !!',
                profileName: "Johanna Anderson",
                profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                likesNumber: 0,

            },
        ],
    },

    {
        title: "Shutter Island",
        id: 18,
        releaseDate: 2010,
        genre: "Thriller",
        description: "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.",
        image: "https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
        favourite: false,
        trailer: 'https://www.youtube.com/embed/5iaYLCiq5RM',

        comments: [
            {
                title: 'This movie is incredible!!',
                body: 'I highly recommend it if you like the typical fast and furious !!',
                profileName: "Johanna Anderson",
                profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                likesNumber: 0,
            },
        ],
    },

    {
        title: "I Care a Lot",
        id: 19,
        releaseDate: 2020,
        genre: "Thriller",
        description: "A crooked legal guardian who drains the savings of her elderly wards meets her match when a woman she tries to swindle turns out to be more than she first appears.",
        image: "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/c231e5f56e0e0db8eda7d4023c73f003b5a32c04be35692eef97c4bf5227ac56._RI_V_TTW_.jpg",
        favourite: false,
        trailer: 'https://www.youtube.com/embed/D40uHmTSPew',

        comments: [
            {
                title: 'This movie is incredible!!',
                body: 'I highly recommend it if you like the typical fast and furious !!',
                profileName: "Anne Garfield",
                profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                likesNumber: 0,
            },
        ],
    },

    {
        title: "The Shawshank Redemption",
        id: 20,
        releaseDate: 1994,
        genre: "Drama",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        image: "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/9964546b0ba1f6e14a6045e34b341f8ca2a3569752c5afed95b89682fcde1a68._RI_V_TTW_.jpg",
        favourite: false,
        trailer: 'https://www.youtube.com/embed/6hB3S9bIaco',

        comments: [
            {
                title: 'This movie is incredible!!',
                body: 'I highly recommend it if you like the typical fast and furious !!',
                profileName: "Anne Garfield",
                profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                likesNumber: 0,
            },
        ],
    },
    
    {
        title: "The Woman in the Window",
        id: 21,
        releaseDate: 2021,
        genre: "Drama",
        description: "An agoraphobic woman living alone in New York begins spying on her new neighbors, only to witness a disturbing act of violence.",
        image: "https://m.media-amazon.com/images/M/MV5BYmVlNWJkZWYtYmJkMy00YTZlLTgwODMtZjVmOGMzMmM1ZTk2XkEyXkFqcGdeQXVyMTAyMjQ3NzQ1._V1_.jpg",
        favourite: false,
        trailer: 'https://www.youtube.com/embed/v_0GJg_Jnlo',

        comments: [
            {
                title: 'This movie is incredible!!',
                body: 'I highly recommend it if you like the typical fast and furious !!',
                profileName: "Anne Garfield",
                profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                likesNumber: 0,
            },
        ],
    }

]