# db

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.8. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.


FOR DB :- 
1) cd packages/db 

2) docker run -p 5432:5432 -d -e POSTGRES_PASSWORD=yourpassword postgres

3) npx prisma generate

4) npx prisma migrate dev

docker run -p 5432:5432 -d -e POSTGRES_PASSWORD=mysupersecretpassword postgres
