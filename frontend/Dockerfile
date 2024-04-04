FROM node:18-alpine as build

ARG VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_CLERK_PUBLISHABLE_KEY ${VITE_CLERK_PUBLISHABLE_KEY}
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL ${VITE_BACKEND_URL}

WORKDIR /app
COPY . /app
RUN npm ci
RUN npm run build


FROM nginx:1.23.1-alpine
EXPOSE 80
COPY ./nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
