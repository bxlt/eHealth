# CSC302 - eHealth Project

## Workflow & Contributing

- **Never push to to `master` directly**. All work is done off of the `dev` branch.
- Create an issue that you want to work on. Please be specific about the use case you would like to complete. For example, a good issue would be "as a Clinician, I would like to do ..."
- Create your own issue called `eHealth-#` where `#` is the issue you filed on GitHub
- Branch your issue off of `dev` with the same name (e.g. `git checkout dev` then `git checkout -b eHealth-#`)
- When submitting a PR, follow the title formatting `[Phase 1][eHealth-#] Your issue here`
- Assign someone to review your PR (if possible) and then have them merge into `dev`
- Remember to update your issue on the Kaban board
- Delete your branch once your issue is merged into `dev`

## Getting Started

The easiest way to get started with the project is using Docker and Docker Compose.

### Docker

After installing [Docker](https://docker.com) from the main project directory:

```
docker-compose build
docker-compose up
```
Once the container is running, open another terminal window and do the following:

```
docker-compose exec api rails db:migrate
```

### Locally

You will need to install Ruby, PostgreSQL, Redis, node, and npm (or yarn).

#### Setup Rails

```
$ git clone git@github.com:csc302-fall-2019/proj-Team6.git
$ cd proj-Team6
$ cd eHealth/backend
$ bundle install --jobs 4
$ # Update config/database.yml to values that match postgres, eg. username: postgres, password: <blank>
$ rails db:create db:migrate
```

#### Setup React

```
$ cd ../frontend
$ yarn # or npm install
```
