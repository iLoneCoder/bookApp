# This app

Here user can add books, edit them and filter.

# Prerequisites

To run this app user should have installed docker, docker-compose and node.

# Usage

- This command installs needed packages
```npm install```

- This command runs postgres container
```docker compose up pg```

- This command needs to be run only when app is started first. It creates database
```npm run dev:db_setup```

- This command needs to be run only when app is started first(If run second time previouse data will be deleted). It create all tables
```npm run update_db_force```

- Starts the app
```npm run dev```