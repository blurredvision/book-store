var bookDocument = [
    {
        title: "Harry Potter",
        description: "Harry is a wizard",
        price: "4.99",
        author: "Niche",
        releaseYear: "2021",
        createdBy: "6228963df4339d7595be542b",
        allocatedTo: "null",
        bookStatus: "Waiting",
        createdAt: ISODate("2022-03-10T04:53:39.869+00:00"),
        updatedAt: ISODate("2022-03-10T04:53:39.869+00:00")
    },
    {
        title: "Diary of the Wimpy Kid",
        description: "Kid always gets in trouble",
        price: "7.99",
        author: "Marcus",
        releaseYear: "2021",
        createdBy: "6228963df4339d7595be542b",
        allocatedTo: "null",
        bookStatus: "Waiting",
        createdAt: ISODate("2022-03-10T04:53:39.869+00:00"),
        updatedAt: ISODate("2022-03-10T04:53:39.869+00:00")
    },
    {
        title: "Skylanders",
        description: "Spyro where you at",
        price: "2.99",
        author: "Emran",
        releaseYear: "2021",
        createdBy: "6228963df4339d7595be542b",
        allocatedTo: "null",
        bookStatus: "Waiting",
        createdAt: ISODate("2022-03-10T04:53:39.869+00:00"),
        updatedAt: ISODate("2022-03-10T04:53:39.869+00:00")
    },
    ]
    
    var userDocument = [
        {
            _id: ObjectId("6228963df4339d7595be542b"),
            name: "Sam",
            email: "Client@gmail.com",
            password: "$2b$15$svOst6phfylatdcp4U2kjO5tN9SjuSx/tJ2EvsxMbeaJmTmT8YXdK",
            roles: "client",
            credits: "50",
            createdAt: ISODate("2022-03-10T04:53:39.869+00:00"),
            updatedAt: ISODate("2022-03-10T04:53:39.869+00:00")
        },
        {
            name: "Alex",
            email: "Alex@gmail.com",
            password: "$2b$15$svOst6phfylatdcp4U2kjO5tN9SjuSx/tJ2EvsxMbeaJmTmT8YXdK",
            roles: "client",
            credits: "50",
            createdAt: ISODate("2022-03-10T04:53:39.869+00:00"),
            updatedAt: ISODate("2022-03-10T04:53:39.869+00:00")
        },
        {
            name: "Jeremy",
            email: "Employee@gmail.com",
            password: "$2b$15$svOst6phfylatdcp4U2kjO5tN9SjuSx/tJ2EvsxMbeaJmTmT8YXdK",
            roles: "employee",
            credits: "50",
            createdAt: ISODate("2022-03-10T04:53:39.869+00:00"),
            updatedAt: ISODate("2022-03-10T04:53:39.869+00:00")
        },
        {
            name: "Max",
            email: "Admin@gmail.com",
            password: "$2b$15$svOst6phfylatdcp4U2kjO5tN9SjuSx/tJ2EvsxMbeaJmTmT8YXdK",
            roles: "admin",
            credits: "50",
            createdAt: ISODate("2022-03-10T04:53:39.869+00:00"),
            updatedAt: ISODate("2022-03-10T04:53:39.869+00:00")
        }
    ]
    
    db.books.insert(bookDocument)
    db.users.insert(userDocument)