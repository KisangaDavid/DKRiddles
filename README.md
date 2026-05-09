# The Riddle Man

Full-stack web application featuring interactive logic puzzles with user authentication, stat tracking, global leaderboards, and real-time puzzle validation.

**Live Site:** [theriddleman.com](https://www.theriddleman.com)

### Puzzles
- **The Sneaky Rat** - Concoct the perfect plan to catch a sneaky rat! (2 puzzles)
- **Horse Trifecta** - Utilize your skills of deduction to win big at the horse races!
- **The Undefeated Rooster** - Best the undefeated rooster in a battle of intellect!
- **Jumping Rabbits** - Reason your way through reorganizing jumping rabbits! (2 puzzles)

### Features
- 6 Interactive puzzles
- User authentication & persistent user profiles
- Puzzle solving history and progress tracking
- Global leaderboard with user rankings
- Real-time puzzle validation
- In-depth puzzle breakdowns accessible after solving each puzzle
- Password-reset emails for users who provided an email during signup

### Technical Details
- Secure JWT-based authentication
- SSL / TLS compliant
- Server-side puzzle validation
- Redis caching for high-performance lookups
- Nginx reverse proxy for SSL termination and rate limiting
- Profanity filtering for user-generated content
- Automatic restart of downed services using the systemd system manager


## 💻 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with SSR & much more |
| **TypeScript** | Static typing for JavaScript |
| **Material-UI (MUI)** | Component library |

### Backend
| Technology | Purpose |
|------------|---------|
| **Django 5.2** | Web framework |
| **Redis** | Caching and session management |
| **SQLite** | Database  |

### Puzzle Logic Library
| Technology | Purpose |
|------------|---------|
| **C++** | Core puzzle logic |
| **Make** | Build automation for core puzzle logic |
| **ctypes** | Python-C++ integration |

### Infrastructure 
| Technology | Purpose |
|------------|---------|
| **Nginx** | Reverse proxy and static file serving |
| **Gunicorn** | Backend Django application server |
| **Redis** | Cache and session storage |
| **Cronjobs** | Periodic backup of database & other scheduled tasks |
| **AWS EC2 Linux Instance** | Hosting |
| **AWS S3 Bucket** | Storage location for database backups |
| **systemd** | Manages the Nginx, Redis, frontend, and backend services |

##  Contact

For bug reports or feature suggestions, contact me using the email in the about page on the site!
---

**Enjoy solving riddles at [The Riddle Man](https://www.theriddleman.com)!**