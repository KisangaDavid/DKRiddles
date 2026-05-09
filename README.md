# The Riddle Man

The Riddle Man is a full-stack web application featuring interactive logic puzzles with stat tracking, global leaderboards, and real-time puzzle validation. Check out the live site at [www.theriddleman.com!](https://www.theriddleman.com)

## Puzzles
**The Sneaky Rat:** Concoct the perfect plan to catch a sneaky rat! (2 puzzles)
  
  <img width="1589" height="778" alt="image" src="https://github.com/user-attachments/assets/47d057ee-bb95-4f6d-aacb-da2d516697ea" />
  <br />
  <br />
  
**Horse Trifecta:** Utilize your skills of deduction to win big at the horse races!
  
  <img width="1584" height="891" alt="image" src="https://github.com/user-attachments/assets/06243cf0-8966-43f8-8c35-9ebf1b9493e4" />
  <br />
  <br />
  
**The Undefeated Rooster:** Best the undefeated rooster in a battle of intellect!
  
  <img width="1600" height="875" alt="image" src="https://github.com/user-attachments/assets/7c395f3c-2f16-43d5-93c8-b80cb4375c05" />
  <br />
  <br />
  
**Jumping Rabbits:** Reason your way through reorganizing jumping rabbits! (2 puzzles)
  
  <img width="1569" height="540" alt="image" src="https://github.com/user-attachments/assets/fd47eb00-fa71-4d8f-882d-35ef1e03a820" />
  <br />

## Features
- 6 Interactive puzzles
- User authentication & persistent user profiles
-  Global leaderboard with user rankings
- Puzzle solving history and progress tracking
- Real-time puzzle validation
- In-depth puzzle breakdowns accessible after solving each puzzle
- Password-reset emails for users who provided an email during signup

## Technical Details
- Secure JWT-based authentication
- SSL / TLS compliant
- Server-side puzzle validation
- Redis caching for high-performance lookups
- Nginx reverse proxy for SSL termination and rate limiting
- Profanity filtering for user-generated content
- Automatic restart of downed services using the systemd system manager


## Tech Stack

#### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with SSR & much more |
| **TypeScript** | Static typing for JavaScript |
| **Material-UI (MUI)** | Component library |

#### Backend
| Technology | Purpose |
|------------|---------|
| **Django 5.2** | Web framework |
| **Redis** | Caching and session management |
| **SQLite** | Database  |

#### Puzzle Logic Library
| Technology | Purpose |
|------------|---------|
| **C++** | Core puzzle logic |
| **Make** | Build automation for core puzzle logic |
| **ctypes** | Python-C++ integration |

#### Infrastructure 
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

For bug reports or feature suggestions, contact me using the email in the about page on the site.
