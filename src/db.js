const imgPath = (image) => {
  return `${window.location.origin}/assets/${image}`
}

export const heroVideoPathMp4 = imgPath("Aerialviewofsandbeach.mp4")
export const heroVideoPathWebP = imgPath("Aerialviewofsandbeach.webp")

export const projects = [
  {
    id: 1,
    href: "https://teams-90ee7.web.app/",
    images: [
      {
        src: {
          large: imgPath("mp-1.webp"),
          medium: imgPath("mp-1.webp"),
          small: imgPath("mp-1.webp"),
          preview: imgPath("mp-1.webp"),
        },
        type: "contain",
      },
      {
        src: {
          large: imgPath("mp-2.webp"),
          medium: imgPath("mp-2.webp"),
          small: imgPath("mp-2.webp"),
          preview: imgPath("mp-2.webp"),
        },
        type: "contain",
      },
      {
        src: {
          large: imgPath("mp-3.webp"),
          medium: imgPath("mp-3.webp"),
          small: imgPath("mp-3.webp"),
          preview: imgPath("mp-3.webp"),
        },
        type: "contain",
      },
      {
        src: {
          large: imgPath("mp-4.webp"),
          medium: imgPath("mp-4.webp"),
          small: imgPath("mp-4.webp"),
          preview: imgPath("mp-4.webp"),
        },
        type: "contain",
      },
      {
        src: {
          large: imgPath("mp-5.webp"),
          medium: imgPath("mp-5.webp"),
          small: imgPath("mp-5.webp"),
          preview: imgPath("mp-5.webp"),
        },
        type: "contain",
      },
      {
        src: {
          large: imgPath("mp-6.webp"),
          medium: imgPath("mp-6.webp"),
          small: imgPath("mp-6.webp"),
          preview: imgPath("mp-6.webp"),
        },
        type: "contain",
      },
    ],
    heading: {
      text: "Team Management System",
      color: "blue",
    },
    textFields: [
      {
        type: "p",
        text: "A website for managing team projects. You can add any member, add them assignments or let them add their own. Members can write their notes/instructions to each of their assignments, which can only be accessed by them and the project owner.",
      },
      {
        type: "p",
        text: "The team project keeps track of the completed assignments, giving an average completion rate in percentage form(%).",
      },
      {
        type: "p",
        text: "You can create an account either by filling a form with your personal details or through a quick one-click-sign-in, through facebook.",
      },
      {
        type: "p",
        text: `Thanks to firebases great feature of "listening" live to changes made in the database documents, you can see in real time which members are online the moment they log in, so no slackers allowed! (Although, they can turn their active status off, so...camouflaged slackers are allowed.)`,
      },
      {
        type: "h2",
        text: `Technologies used:`,
      },
      {
        type: "tags",
        header: "Frontend",
        listItems: ["React"],
      },
      {
        type: "tags",
        header: "Databases",
        listItems: ["firebase", "firestore"],
      },
      {
        type: "tags",
        header: "Backend",
        listItems: ["BaaS (Backend as a service, firebase)"],
      },
      {
        type: "h2",
        text: `Notes:`,
      },
      {
        type: "p",
        text: `This project is incomplete as it lacks certain key functionalities such as searching, members accepting the invitation before they join, the ability to dump inactive members from a project, ability to resign voluntarily etc.`,
      },
      {
        type: "a",
        text: `Visit website`,
        href: "https://teams-90ee7.web.app/",
      },
    ],
  },
  {
    id: 2,
    href: "https://hopin.herokuapp.com/",
    images: [
      {
        src: {
          large: imgPath("tc-1.webp"),
          medium: imgPath("tc-1.webp"),
          small: imgPath("tc-1.webp"),
          preview: imgPath("tc-1.webp"),
        },
        type: "contain",
      },
      {
        src: {
          large: imgPath("tc-8.webp"),
          medium: imgPath("tc-8.webp"),
          small: imgPath("tc-8.webp"),
          preview: imgPath("tc-8.webp"),
        },
        type: "contain",
      },
      {
        src: {
          large: imgPath("tc-2.webp"),
          medium: imgPath("tc-2.webp"),
          small: imgPath("tc-2.webp"),
          preview: imgPath("tc-2.webp"),
        },
        type: "contain",
      },
      {
        src: {
          large: imgPath("tc-3.webp"),
          medium: imgPath("tc-3.webp"),
          small: imgPath("tc-3.webp"),
          preview: imgPath("tc-3.webp"),
        },
        type: "contain",
      },
      {
        src: {
          large: imgPath("tc-4.webp"),
          medium: imgPath("tc-4.webp"),
          small: imgPath("tc-4.webp"),
          preview: imgPath("tc-4.webp"),
        },
        type: "contain",
      },
      {
        src: {
          large: imgPath("tc-5.webp"),
          medium: imgPath("tc-5.webp"),
          small: imgPath("tc-5.webp"),
          preview: imgPath("tc-5.webp"),
        },
        type: "contain",
      },
      {
        src: {
          large: imgPath("tc-6.webp"),
          medium: imgPath("tc-6.webp"),
          small: imgPath("tc-6.webp"),
          preview: imgPath("tc-6.webp"),
        },
        type: "contain",
      },
      {
        src: {
          large: imgPath("tc-7.webp"),
          medium: imgPath("tc-7.webp"),
          small: imgPath("tc-7.webp"),
          preview: imgPath("tc-7.webp"),
        },
        type: "contain",
      },
    ],
    heading: {
      text: "Twitter Clone",
      color: "violet",
    },
    textFields: [
      {
        type: "p",
        text: "A posting website as we all probably know, my poor attempt to remake it. You can post, reply, share, like and follow people. Notification system is included.",
      },
      {
        type: "p",
        text: "You can upload up to 4 images, 1 video or one GIF using the giphy API for each post. Images can be cropped and videos can take subs.",
      },
      {
        type: "h2",
        text: `Technologies used:`,
      },
      {
        type: "tags",
        header: "Frontend",
        listItems: ["Pug template engine"],
      },
      {
        type: "tags",
        header: "Databases",
        listItems: ["MongoDB"],
      },
      {
        type: "tags",
        header: "Backend",
        listItems: ["Node.js", "express"],
      },
      {
        type: "h2",
        text: `Notes:`,
      },
      {
        type: "p",
        text: "If you're using Chrome or Mozilla and want to take a peak, an already registered account is pre-populated in the login form.",
      },
      {
        type: "a",
        text: `Visit Website`,
        href: "https://hopin.herokuapp.com/",
      },
    ],
  },
  {
    id: 3,
    href: "https://hopin.herokuapp.com/messages",
    images: [
      {
        src: {
          large: imgPath("msg-1.webp"),
          medium: imgPath("msg-1.webp"),
          small: imgPath("msg-1.webp"),
          preview: imgPath("msg-1.webp"),
        },
        type: "contain",
      },
      {
        src: {
          large: imgPath("msg-7.webp"),
          medium: imgPath("msg-7.webp"),
          small: imgPath("msg-7.webp"),
          preview: imgPath("msg-7.webp"),
        },
        type: "contain",
      },
      {
        src: {
          large: imgPath("msg-2.webp"),
          medium: imgPath("msg-2.webp"),
          small: imgPath("msg-2.webp"),
          preview: imgPath("msg-2.webp"),
        },
        type: "contain",
      },
      {
        src: {
          large: imgPath("msg-3.webp"),
          medium: imgPath("msg-3.webp"),
          small: imgPath("msg-3.webp"),
          preview: imgPath("msg-3.webp"),
        },
        type: "contain",
      },
      {
        src: {
          large: imgPath("msg-4.webp"),
          medium: imgPath("msg-4.webp"),
          small: imgPath("msg-4.webp"),
          preview: imgPath("msg-4.webp"),
        },
        type: "contain",
      },
      {
        src: {
          large: imgPath("msg-5.webp"),
          medium: imgPath("msg-5.webp"),
          small: imgPath("msg-5.webp"),
          preview: imgPath("msg-5.webp"),
        },
        type: "contain",
      },
      {
        src: {
          large: imgPath("msg-6.webp"),
          medium: imgPath("msg-6.webp"),
          small: imgPath("msg-6.webp"),
          preview: imgPath("msg-6.webp"),
        },
        type: "contain",
      },
    ],
    heading: {
      text: "Messenger Clone",
      color: "orange",
    },
    textFields: [
      {
        type: "p",
        text: "A messaging system, for solo and group chats. It uses sockets for real-time communication between client and server. Any parties connected to the same socket (i.e. the chats unique identifier) will receive messages, 'seen' flags as well as typing indications without page reload. You can send images/videos/text and office files.",
      },
      {
        type: "h2",
        text: `Technologies used:`,
      },
      {
        type: "tags",
        header: "Frontend",
        listItems: ["Pug template engine"],
      },
      {
        type: "tags",
        header: "Databases",
        listItems: ["MongoDB"],
      },
      {
        type: "tags",
        header: "Backend",
        listItems: ["Node.js", "express", "Socket.Io"],
      },
      {
        type: "h2",
        text: `Notes:`,
      },
      {
        type: "p",
        text: "Although MC is part of the Twitter Clone, they've been split to two since they're different in many ways (but also identical in others).",
      },
      {
        type: "p",
        text: "If you're using Chrome or Mozilla and want to take a peak, an already registered account is pre-populated in the login form.",
      },
      {
        type: "a",
        text: `Visit Website`,
        href: "https://hopin.herokuapp.com/messages",
      },
    ],
  },
  {
    id: 4,
    images: [
      {
        src: {
          large: imgPath("1-small.webp"),
          medium: imgPath("1-small.webp"),
          small: imgPath("1-small.webp"),
          preview: imgPath("1-small.webp"),
        },
        type: "cover",
      },
      {
        src: {
          large: imgPath("2-small.webp"),
          medium: imgPath("2-small.webp"),
          small: imgPath("2-small.webp"),
          preview: imgPath("2-small.webp"),
        },
        type: "cover",
      },
      {
        src: {
          large: imgPath("3-small.webp"),
          medium: imgPath("3-small.webp"),
          small: imgPath("3-small.webp"),
          preview: imgPath("3-small.webp"),
        },
        type: "cover",
      },
      {
        src: {
          large: imgPath("4-small.webp"),
          medium: imgPath("4-small.webp"),
          small: imgPath("4-small.webp"),
          preview: imgPath("4-small.webp"),
        },
        type: "cover",
      },
      {
        src: {
          large: imgPath("5-small.webp"),
          medium: imgPath("5-small.webp"),
          small: imgPath("5-small.webp"),
          preview: imgPath("5-small.webp"),
        },
        type: "cover",
      },
      {
        src: {
          large: imgPath("6-small.webp"),
          medium: imgPath("6-small.webp"),
          small: imgPath("6-small.webp"),
          preview: imgPath("6-small.webp"),
        },
        type: "cover",
      },
      {
        src: {
          large: imgPath("7-small.webp"),
          medium: imgPath("7-small.webp"),
          small: imgPath("7-small.webp"),
          preview: imgPath("7-small.webp"),
        },
        type: "cover",
      },
    ],
    heading: {
      text: "4",
      color: "green",
    },
    textFields: [
      {
        type: "p",
        text: "Random item (no need to open)",
      },
      {
        type: "p",
        text: "Modal scaling may struggle with big quality photos.",
      },
    ],
  },
  {
    id: 5,
    images: [
      {
        src: {
          large: imgPath("2-small.webp"),
          medium: imgPath("2-small.webp"),
          small: imgPath("2-small.webp"),
          preview: imgPath("2-small.webp"),
        },
        type: "cover",
      },
      {
        src: {
          large: imgPath("msg-1.webp"),
          medium: imgPath("msg-1.webp"),
          small: imgPath("msg-1.webp"),
          preview: imgPath("msg-1.webp"),
        },
        type: "cover",
      },
      {
        src: {
          large: imgPath("3-small.webp"),
          medium: imgPath("3-small.webp"),
          small: imgPath("3-small.webp"),
          preview: imgPath("3-small.webp"),
        },
        type: "cover",
      },
      {
        src: {
          large: imgPath("4-small.webp"),
          medium: imgPath("4-small.webp"),
          small: imgPath("4-small.webp"),
          preview: imgPath("4-small.webp"),
        },
        type: "cover",
      },
      {
        src: {
          large: imgPath("5-small.webp"),
          medium: imgPath("5-small.webp"),
          small: imgPath("5-small.webp"),
          preview: imgPath("5-small.webp"),
        },
        type: "cover",
      },
      {
        src: {
          large: imgPath("6-small.webp"),
          medium: imgPath("6-small.webp"),
          small: imgPath("6-small.webp"),
          preview: imgPath("6-small.webp"),
        },
        type: "cover",
      },
      {
        src: {
          large: imgPath("7-small.webp"),
          medium: imgPath("7-small.webp"),
          small: imgPath("7-small.webp"),
          preview: imgPath("7-small.webp"),
        },
        type: "cover",
      },
    ],
    heading: {
      text: "5",
      color: "blue",
    },
    textFields: [
      {
        type: "p",
        text: "Vite > create react app",
      },
    ],
  },
  {
    id: 6,
    images: [
      {
        src: {
          large: imgPath("3-small.webp"),
          medium: imgPath("3-small.webp"),
          small: imgPath("3-small.webp"),
          preview: imgPath("3-small.webp"),
        },
        type: "cover",
      },
      {
        src: {
          large: imgPath("1-small.webp"),
          medium: imgPath("1-small.webp"),
          small: imgPath("1-small.webp"),
          preview: imgPath("1-small.webp"),
        },
        type: "cover",
      },
      {
        src: {
          large: imgPath("2-small.webp"),
          medium: imgPath("2-small.webp"),
          small: imgPath("2-small.webp"),
          preview: imgPath("2-small.webp"),
        },
        type: "cover",
      },
      {
        src: {
          large: imgPath("4-small.webp"),
          medium: imgPath("4-small.webp"),
          small: imgPath("4-small.webp"),
          preview: imgPath("4-small.webp"),
        },
        type: "cover",
      },
      {
        src: {
          large: imgPath("5-small.webp"),
          medium: imgPath("5-small.webp"),
          small: imgPath("5-small.webp"),
          preview: imgPath("5-small.webp"),
        },
        type: "cover",
      },
      {
        src: {
          large: imgPath("6-small.webp"),
          medium: imgPath("6-small.webp"),
          small: imgPath("6-small.webp"),
          preview: imgPath("6-small.webp"),
        },
        type: "cover",
      },
      {
        src: {
          large: imgPath("7-small.webp"),
          medium: imgPath("7-small.webp"),
          small: imgPath("7-small.webp"),
          preview: imgPath("7-small.webp"),
        },
        type: "cover",
      },
    ],
    heading: {
      text: "6",
      color: "violet",
    },
    textFields: [
      {
        type: "p",
        text: "There's a hotel under the sea.",
      },
    ],
  },
  {
    id: 7,
    images: [
      {
        src: {
          large: imgPath("4-small.webp"),
          medium: imgPath("4-small.webp"),
          small: imgPath("4-small.webp"),
          preview: imgPath("4-small.webp"),
        },
        type: "cover",
      },
      {
        src: {
          large: imgPath("1-small.webp"),
          medium: imgPath("1-small.webp"),
          small: imgPath("1-small.webp"),
          preview: imgPath("1-small.webp"),
        },
        type: "cover",
      },
      {
        src: {
          large: imgPath("2-small.webp"),
          medium: imgPath("2-small.webp"),
          small: imgPath("2-small.webp"),
          preview: imgPath("2-small.webp"),
        },
        type: "cover",
      },
      {
        src: {
          large: imgPath("3-small.webp"),
          medium: imgPath("3-small.webp"),
          small: imgPath("3-small.webp"),
          preview: imgPath("3-small.webp"),
        },
        type: "cover",
      },
      {
        src: {
          large: imgPath("5-small.webp"),
          medium: imgPath("5-small.webp"),
          small: imgPath("5-small.webp"),
          preview: imgPath("5-small.webp"),
        },
        type: "cover",
      },
      {
        src: {
          large: imgPath("6-small.webp"),
          medium: imgPath("6-small.webp"),
          small: imgPath("6-small.webp"),
          preview: imgPath("6-small.webp"),
        },
        type: "cover",
      },
      {
        src: {
          large: imgPath("7-small.webp"),
          medium: imgPath("7-small.webp"),
          small: imgPath("7-small.webp"),
          preview: imgPath("7-small.webp"),
        },
        type: "cover",
      },
    ],
    heading: {
      text: "7",
      color: "orange",
    },
    textFields: [
      {
        type: "p",
        text: "Modal scaling may struggle with big images.",
      },
    ],
  },
]
