# node-objetion-jest
# Introduction

You will create a screen recording video of yourself completing the challenge, then send me a link to the file via Google Drive. A few things to consider:

- We ask that you complete this challenge within the timeframe agreed on in our conversation.
- **You MUST NOT edit your video, stop it and continue later, copy contents from hidden screens, or anything similar that can be considered cheating. The recording must be without stopping and no editing.**
- You can use screen recording software like Loom, QuickTime, or something similar, to create the video.
- The recording should be of the entire coding challenge, from the beginning to end, which is about 1 hour and 15 minutes.
- Please upload the video file to Google Drive and share an open link with us (we support .mp4, files smaller/with less than 4gb).
- As you complete the challenge, please explain what you are doing. Walk us through your thinking, explain your decisions, etc. Show us your UI work, if applicable.
- Here is a short clip from a recent coding challenge, as an example of what your recording should look like: [Example video](http://www.loom.com/share/85434243d487456b8ef4ae45c3fbc788). It is from a React challenge, but it is the same for any challenge.

## **Challenge**

This API manages bags and cuboids. A cuboid is a three-dimensional rectangular box. Each face of a cuboid is a rectangle and adjacent faces meet at right angles. A cube is a cuboid with equal dimensions. A cuboid has a volume that is straightforward to calculate.

A bag is a malleable container with adjustable dimensions, but a fixed volume. The bag can expand to hold any shape or combination of shapes, but the volume of the bag is limited and cannot expand. In our model a bag has many cuboids.

This app has an almost complete test suite.

The tests to update and delete a cuboid are incomplete, your task is to improve them.

The other tests are valid and you must not modify them. In other words, you need to add the missing functionalities so that these tests pass.

You should also take note of the linter and prettier. The linter is currently passing and must pass on completion of the challenge, without any modifications to the config.

**Note**: The only tests to be modified are tests to update and delete a cuboid. All other tests must remain unchanged.

## Steps

To participate in this challenge take the following steps:

1. Clone this repository.
2. Checkout a feature branch where you will make your changes.
3. Setup the app and get it running. Verify that the linter passes and the test suite fails.
4. Implement tests to update and delete a cuboid.
5. Add missing functionalities so the other tests pass. Do NOT modify these tests.
6. Commit as appropriate as you complete the challenge. (More than one commit is expected)

## Technologies

This app uses the following key technologies:

- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Objection.js](https://vincit.github.io/objection.js/)
- [Knex.js](http://knexjs.org/)
- [Jest](https://jestjs.io/)

## **Setup**

Use nvm to install the correct version of node:

```bash
nvm install
```

Copy .env.example to .env:

```bash
cp .env.example .env
```

Install packages:

```bash
npm install
```

## **Usage**

Run the app:

```bash
npm run dev
```

Run the linter:

```bash
npm run lint
```

Run the tests:

```bash
npm test
```