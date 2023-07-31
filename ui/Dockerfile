FROM node:18.0.0 as build
WORKDIR /build
ENV PATH /build/node_modules/.bin:$PATH
COPY .. ./
RUN npm install
RUN npm run build

FROM nginx:1.21.3-alpine
RUN mkdir -p /opt/web/
COPY --from=build /build/dist /opt/web/
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/
COPY nginx/conf.d /etc/nginx/conf.d/
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
