FROM mhart/alpine-node:10.19 AS builder

WORKDIR /srv

COPY . .
RUN apk add libc6-compat gnuplot
RUN yarn
RUN yarn build 

# use lighter image
FROM mhart/alpine-node:slim-10.19
RUN apk add libc6-compat gnuplot
COPY --from=builder /srv .
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["node", "dist/server/index.js"]